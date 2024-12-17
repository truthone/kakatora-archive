import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { shuffleArray } from "../../../utils/shuffleArray";

let blockUntil = null;
let cachedData = null; // 캐싱된 데이터
let lastFetchTime = null;

export async function GET(request) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const { episode, limit=8, offset=0, shuffle='false' } = params;

  console.log(`params offset: ${params.offset}`)

  // 타입 변환 처리
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    return NextResponse.json(
      { error: 'Environment variables are not properly configured' },
      { status: 500 }
    );
  }

  if (blockUntil && new Date() < blockUntil) {
    return NextResponse.json(
      { error: 'API temporarily blocked due to previous error' },
      { status: 429 }
    );
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
    const sheetName = 'liveAlone_capture_images';

    const startCol = 'A';
    const endCol = 'G';
    const range = `${sheetName}!${startCol}2:${endCol}`;

    const now = Date.now();


 // 데이터 캐싱: 10분마다 새로 가져오기
    if (!cachedData || now - lastFetchTime > 10 * 60 * 1000) {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range,
      });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }

    // 데이터 변환
    cachedData = rows.map((row) => ({
      id: row[0],
      episode_id: row[1],
      title: row[2],
      filename: row[3],
      url: row[4],
      is_main: row[5] === 'true',
      is_carousel: row[6] === 'true',
    }));
    lastFetchTime = now;
    console.log('Data refreshed and cached');
  }

    // 데이터 필터링
    let filteredData = episode
    ? cachedData.filter((item) => String(item.episode_id) === String(episode))
    : cachedData;

    if (shuffle === 'true') {
      filteredData = shuffleArray(filteredData);
    }

    // 서버 측 페이징 처리
  const start = offset ? parseInt(offset, 10) : 0;
  const end = limit ? start + parseInt(limit, 10) : filteredData.length;
  const paginatedData = filteredData.slice(start, end);

  return NextResponse.json(paginatedData);
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);

    if (error.code && error.code >= 400 && error.code < 600) {
      blockUntil = new Date(new Date().getTime() + 5 * 60 * 1000);
    }

    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
