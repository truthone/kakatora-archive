// /app/api/og-parser/route.js
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url) {
    return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const metadata = {
      title: $('meta[property="og:title"]').attr('content') || $('title').text() || 'No Title',
      description: $('meta[property="og:description"]').attr('content') || '',
      image: $('meta[property="og:image"]').attr('content') || '',
    };

    return new Response(JSON.stringify(metadata), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch metadata' }), { status: 500 });
  }
}
