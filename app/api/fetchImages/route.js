import { NextResponse } from 'next/server';
import { google } from 'googleapis';

let blockUntil = null; // 5분 차단 시간을 설정할 변수

export async function GET(request) {
  const episode = request.nextUrl.searchParams.get('episode');
  
  // 환경 변수 체크
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    return NextResponse.json({ error: 'Environment variables are not properly configured' }, { status: 500 });
  }

  // 차단 시간 설정 (현재 시간이 blockUntil보다 작으면 차단)
  if (blockUntil && new Date() < blockUntil) {
    return NextResponse.json(
      { error: 'API temporarily blocked due to previous error' },
      { status: 429 } // Too Many Requests
    );
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'imageList!A:D', // 필요한 시트와 범위
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }

    // 첫 번째 행은 헤더이므로 제외하고 데이터 매핑
    let imagesData = rows.slice(1).map((row) => ({
      episode: row[0],
      title: row[1],
      filename: row[2],
      url: row[3],
    }));

    // episode 파라미터가 있는 경우 필터링
    if (episode) {
      imagesData = imagesData.filter((item) => String(item.episode) === String(episode));
    }
    return NextResponse.json(imagesData);
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);

    // 에러 객체의 구조 확인 및 상태 코드 사용
    if (error.code && error.code >= 400 && error.code < 600) {
      blockUntil = new Date(new Date().getTime() + 5 * 60 * 1000); // 5분 동안 차단
    }

    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
