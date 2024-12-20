const { GoogleSpreadsheet } = require('google-spreadsheet');
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const sheetsCredentials = require('./credentials.json'); // 서비스 계정 JSON 파일
// const youtubeToken = require('./youtube_token.json'); // YouTube OAuth JSON 파일

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID; // Google 스프레드시트 ID
const FILMO_SHEET_NAME = 'filmo'; // 필모그래피 데이터가 있는 시트 이름
const PLAYLIST_SHEET_NAME = 'youtube_playlists'; // 결과를 저장할 시트 이름

async function processFilmography() {
    try {
        // **1. Google Sheets 인증**
        console.log('Google Sheets 인증 시작...');
        const sheetsAuth = new GoogleAuth({
            credentials: sheetsCredentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
        doc.auth = await sheetsAuth.getClient(); // 인증 클라이언트 설정
        await doc.loadInfo();

        console.log(`스프레드시트 제목: ${doc.title}`);

        // 필모그래피 데이터 시트 로드
        const filmographySheet = doc.sheetsByTitle[FILMO_SHEET_NAME];
        if (!filmographySheet) throw new Error(`시트 "${FILMO_SHEET_NAME}"를 찾을 수 없습니다.`);

        await filmographySheet.loadHeaderRow();
        const headers = filmographySheet.headerValues; // 헤더 값 배열 (["year", "category", "title", ...])

        console.log("Headers:", headers); // 헤더 확인
        const filmographyRows = await filmographySheet.getRows();
        console.log(`"${FILMO_SHEET_NAME}" 시트에서 ${filmographyRows.length}개의 행을 읽었습니다.`);

        const mappedData = filmographyRows.map((row) =>
        headers.reduce((obj, header, index) => {
          obj[header] = row._rawData[index]; // 헤더와 데이터를 매핑
          return obj;
        }, {})
      );

        // 재생목록 저장 시트 로드
        let playlistsSheet = doc.sheetsByTitle[PLAYLIST_SHEET_NAME];
        if (!playlistsSheet) {
            playlistsSheet = await doc.addSheet({ title: PLAYLIST_SHEET_NAME });
            await playlistsSheet.setHeaderRow(['fk','title', 'playlistId']);
        }

        // **2. YouTube 인증**
        console.log('YouTube API 인증 시작...');
        const oauth2Client = new google.auth.OAuth2(
        );

        const TOKEN_PATH = '../youtube_token.json';
        let tokens;
        try {
            tokens = require(TOKEN_PATH);
            oauth2Client.setCredentials(tokens);
        } catch (error) {
            console.log('YouTube 인증 토큰이 없습니다. 새로 인증을 수행하세요.');
            const authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                // prompt: 'consent', 
                scope: ['https://www.googleapis.com/auth/youtube.force-ssl'],
            });
            console.log(`다음 URL에서 인증을 완료하세요: ${authUrl}`);
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            tokens = await new Promise(resolve =>
                readline.question('인증 코드 입력: ', async code => {
                    const { tokens } = await oauth2Client.getToken(code);
                    resolve(tokens);
                    readline.close();
                })
            );
            require('fs').writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
        }
        oauth2Client.setCredentials(tokens);
        const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

        // **3. 필모그래피 데이터 처리**
        for (const row of mappedData) {
            console.log(row.title)
            const title = row.title;
            const year = row.year;
            const id = row.id;
            const videoArray = row.videoArray? JSON.parse(row.videoArray) : [];
            console.log(`"${title}" (${year}) - 비디오 ID: ${videoArray.join(', ')}`);

            let playlistId;
            try {
                // 재생목록 생성
                const response = await youtube.playlists.insert({
                    part: 'snippet,status',
                    requestBody: {
                        snippet: {
                            title: `${year}-${title}`,
                            description: `${title} 관련 영상`,
                        },
                        status: { privacyStatus: 'unlisted' }, // 일부공유
                    },
                });
                playlistId = response.data.id;
                console.log(playlistId)
                console.log(`재생목록 생성 완료: ${playlistId}`);
            } catch (error) {
                console.error(`"${title}" 재생목록 생성 실패:`, error.message);
                await playlistsSheet.addRow({
                    Title: title,
                    Year: year,
                    'Playlist ID': 'Error',
                    Status: `Error: ${error.message}`,
                });
                continue;
            }

            // 비디오 추가
            for (const videoId of videoArray) {
                try {
                    await youtube.playlistItems.insert({
                        part: 'snippet',
                        requestBody: {
                            snippet: {
                                playlistId,
                                resourceId: {
                                    kind: 'youtube#video',
                                    videoId,
                                },
                            },
                        },
                    });
                    console.log(`비디오 ${videoId} 추가 완료`);
                } catch (error) {
                    console.error(`"${title}" 비디오 ${videoId} 추가 실패:`, error.message);
                }
            }

            // 결과 저장
            await playlistsSheet.addRow({
                title: title,
                playlistId: playlistId,
                fk: id,
                Status: 'Success',
            });
        }

        console.log('모든 작업이 완료되었습니다.');
    } catch (error) {
        console.error('오류 발생:', error.message);
    }
}

processFilmography();
