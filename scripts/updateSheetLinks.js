require('dotenv').config();
const { drive, sheets } = require('./auth');

// Google Drive에서 특정 파일 이름의 공유 링크 가져오기
async function getShareableLinkByFilename(filename, folderId) {
    try {
        const response = await drive.files.list({
            q: `'${folderId}' in parents and name = '${filename}' and trashed = false`,
            fields: 'files(id, name)',
            spaces: 'drive'
        });
        const file = response.data.files[0];
        if (!file) {
            console.warn(`File not found in Drive: ${filename}`);
            return null;
        }

        // 파일을 공개적으로 읽을 수 있도록 설정
        await drive.permissions.create({
            fileId: file.id,
            resource: { role: 'reader', type: 'anyone' }
        });

        return `https://drive.google.com/uc?id=${file.id}&export=view`;
    } catch (error) {
        console.error(`Error retrieving shareable link for ${filename}:`, error);
        return null;
    }
}

// Google Sheets의 `Filename`을 기준으로 `Url` 업데이트
async function updateSheetLinks() {
    try {
        // Google Sheets에서 데이터 가져오기
        const sheetResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'imageList!A:D' // A:D 범위에서 데이터 가져오기 (Episode, Title, Filename, Url)
        });
        const rows = sheetResponse.data.values;

        if (!rows || rows.length === 0) {
            console.log('No data found in sheet.');
            return;
        }

        // Google Drive의 'tv-liveAlone' 폴더 ID 찾기
        const tvLiveAloneFolderId = await getSubfolderIdByName(process.env.GOOGLE_FOLDER_ID, 'tv-liveAlone');
        if (!tvLiveAloneFolderId) {
            console.error('tv-liveAlone folder not found.');
            return;
        }

        // 헤더 제외한 각 행에 대해 처리
        const updates = [];
        for (let i = 1; i < rows.length; i++) {
            const [episode, title, filename, url] = rows[i];
            if (url) {
                console.log(`Url already exists for ${filename}, skipping.`);
                continue;
            }

            const link = await getShareableLinkByFilename(filename, tvLiveAloneFolderId);
            if (link) {
                rows[i][3] = link; // Url 컬럼에 링크 추가
                updates.push({
                    range: `imageList!D${i + 1}`, // i+1을 통해 2번째 행부터 기록
                    values: [[link]]
                });
                console.log(`Updated link for ${filename}: ${link}`);
            }
        }

        // 시트에 업데이트된 데이터 기록
        await sheets.spreadsheets.values.batchUpdate({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            resource: {
                data: updates,
                valueInputOption: 'USER_ENTERED'
            }
        });
        console.log('Google Sheets updated successfully.');
    } catch (error) {
        console.error('Error updating Google Sheets:', error);
    }
}

// Google Drive의 하위 폴더 ID 가져오기
async function getSubfolderIdByName(parentFolderId, folderName) {
    const res = await drive.files.list({
        q: `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}' and trashed = false`,
        fields: 'files(id, name)',
        spaces: 'drive'
    });
    const folder = res.data.files.find(file => file.name === folderName);
    return folder ? folder.id : null;
}

updateSheetLinks();
