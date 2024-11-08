// 404 오류가 발생한 playlistId를 캐싱하는 객체
const failedRequestsCache = new Set();

export async function getYouTubeVideos(playlistId) {
  // 캐시 확인: 404 오류로 저장된 playlistId는 요청하지 않고 빈 배열 반환
  if (failedRequestsCache.has(playlistId)) {
    console.warn(`Playlist ID "${playlistId}" previously returned 400~403. Skipping request.`);
    return []; // 빈 배열 반환
  }

  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    if (!API_KEY || !playlistId) {
      console.error('YouTube API key is not set');
      return [];
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${API_KEY}`
    );

    if (response.status === 404 || response.status === 400 || response.status === 403) {
      console.warn(`Hey Playlist ID "${playlistId}" not found. Caching and skipping future requests.`);
      failedRequestsCache.add(playlistId); // 404 오류 발생 시 캐싱
      return [];
    }

    if (!response.ok) {
      throw new Error(`YouTube API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return [];
  }
}
