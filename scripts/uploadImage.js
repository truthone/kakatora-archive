const { drive } = require('./auth');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Google Drive에서 특정 이름의 하위 폴더 ID를 검색하는 함수
async function getSubfolderIdByName(parentFolderId, folderName) {
    try {
        const res = await drive.files.list({
            q: `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}' and trashed = false`,
            fields: 'files(id, name)',
            spaces: 'drive'
        });
        const folder = res.data.files.find(file => file.name === folderName);
        if (folder) {
            console.log(`Found folder "${folderName}" with ID: ${folder.id}`);
            return folder.id;
        } else {
            throw new Error(`Folder "${folderName}" not found in parent folder.`);
        }
    } catch (error) {
        console.error('Error finding folder:', error);
    }
}

// Google Drive에 이미지 업로드 및 공유 링크 생성
async function uploadImageToDrive(filePath, fileName, folderId) {
    const fileMetadata = {
        name: fileName,
        parents: [folderId] // 자동 검색한 'tv-liveAlone' 폴더 ID
    };
    const media = {
        mimeType: 'image/jpeg', // MIME type은 자동으로 설정 가능하므로 기본 설정
        body: fs.createReadStream(filePath)
    };

    const file = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    });

    const fileId = file.data.id;

    // 파일을 공개적으로 읽을 수 있도록 설정
    await drive.permissions.create({
        fileId: fileId,
        resource: { role: 'reader', type: 'anyone' }
    });

    const link = `https://drive.google.com/uc?id=${fileId}&export=view`;
    return link;
}

// 에피소드 폴더의 이미지 파일을 순회하며 업로드
async function processEpisodeFolders() {
    const basePath = path.join(__dirname, '../public/images/tv-liveAlone');
    const episodes = fs.readdirSync(basePath); // 에피소드 폴더 리스트 가져오기

    // 'tv-liveAlone' 폴더의 ID 자동 검색
    const tvLiveAloneFolderId = await getSubfolderIdByName(process.env.GOOGLE_FOLDER_ID, 'tv-liveAlone');
    if (!tvLiveAloneFolderId) return; // 폴더가 없으면 종료

    for (let episode of episodes) {
        const episodePath = path.join(basePath, episode);

        // 에피소드 경로가 폴더인지 확인
        if (fs.lstatSync(episodePath).isDirectory()) {
            const files = fs.readdirSync(episodePath); // 에피소드 폴더의 파일 리스트 가져오기

            for (let filename of files) {
                const filePath = path.join(episodePath, filename);

                // 파일이 이미지인지 확인 (확장자 확인)
                if (/\.(jpg|jpeg|png|webp)$/i.test(filename)) {
                    try {
                        const link = await uploadImageToDrive(filePath, filename, tvLiveAloneFolderId);
                        console.log(`Image uploaded successfully: ${filename} (Link: ${link})`);
                    } catch (error) {
                        console.error(`Failed to upload ${filename}:`, error);
                    }
                }
            }
        }
    }
}

// 이미지 업로드 실행
processEpisodeFolders().catch(console.error);
