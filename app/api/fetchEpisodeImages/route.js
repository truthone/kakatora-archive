import { NextResponse } from 'next/server';
import { google } from 'googleapis';

let blockUntil = null;

export async function GET(request) {
  const episode = request.nextUrl.searchParams.get('episode');
  const isMain = request.nextUrl.searchParams.get('isMain'); 

  console.log(episode)
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    return NextResponse.json({ error: 'Environment variables are not properly configured' }, { status: 500 });
  }

  if (blockUntil && new Date() < blockUntil) {
    return NextResponse.json({ error: 'API temporarily blocked due to previous error' }, { status: 429 });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'imageList!A:G', // 필요한 범위
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }

    // 첫 번째 행은 헤더이므로 제외
    let imagesData = rows.slice(1).map((row) => ({
      id: row[0],
      episode_id: row[1],
      title: row[2],
      filename: row[3],
      url: row[4],
      is_main: row[5] === 'TRUE', // Boolean 변환
      is_carousel: row[6] === 'TRUE'
    }));
    let filteredData = [];

    // episode 파라미터가 있는 경우 필터링
    if (episode) {
      filteredData = imagesData.filter((item) => String(item.episode_id) === String(episode));
    }
    else if (episode && isMain) {
      filteredData = filteredData.filter(
        (item) => item.is_main === 'TRUE' || item.is_main === true
      );
    }
    else if (!episode && isMain) {
      filteredData = imagesData.filter(
        (item) => item.is_main === 'TRUE' || item.is_main === true
      );
    }
    else if (!episode && !isMain) {
      return NextResponse.json(imagesData);
    }

    return NextResponse.json(filteredData);

  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);

    if (error.code && error.code >= 400 && error.code < 600) {
      blockUntil = new Date(new Date().getTime() + 5 * 60 * 1000);
    }

    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
