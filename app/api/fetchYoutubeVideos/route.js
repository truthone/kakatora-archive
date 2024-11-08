import { NextResponse } from 'next/server';
import { getYouTubeVideos } from '../../../lib/getYouTubeVideos';

export async function GET(request) {
  const playlistId = request.nextUrl.searchParams.get('playlistId');

  if (!playlistId) {
    return NextResponse.json({ error: 'playlistId is missing' }, { status: 400 });
  }

  try {
    const videos = await getYouTubeVideos(playlistId);
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json({ error: 'Failed to fetch YouTube data' }, { status: 500 });
  }
}
