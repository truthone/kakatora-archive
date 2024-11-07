require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { google } = require('googleapis');

// Google 인증 설정
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY
    },
    projectId: process.env.GOOGLE_PROJECT_ID,
    scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets']
});

// Google Drive 및 Sheets 초기화
const drive = google.drive({ version: 'v3', auth });
const sheets = google.sheets({ version: 'v4', auth });

module.exports = { drive, sheets };

// Google Sheets 연결 테스트
async function testGoogleSheetsConnection() {
  try {
      const response = await sheets.spreadsheets.values.get({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'imageList!A1' // A1 셀을 읽기 위한 범위 설정
      });
      console.log('Google Sheets 연결 성공:', response.data.values);
  } catch (error) {
      console.error('Google Sheets 연결 실패:', error);
  }
}

// Google Drive 연결 테스트
async function testGoogleDriveConnection() {
  try {
      const response = await drive.files.list({
          pageSize: 5, // 최대 5개 파일 가져오기
          fields: 'files(id, name)'
      });
      console.log('Google Drive 연결 성공:', response.data.files);
  } catch (error) {
      console.error('Google Drive 연결 실패:', error);
  }
}

// 테스트 함수 호출
testGoogleSheetsConnection();
testGoogleDriveConnection();
