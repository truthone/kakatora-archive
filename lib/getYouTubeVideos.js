// lib/getYouTubeVideos.js
export async function getYouTubeVideos(playlistId) {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    if (!API_KEY) {
      console.error('YouTube API key is not set');
      return []; // 빈 배열 반환
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return []; // 오류 발생 시 빈 배열 반환
  }
}