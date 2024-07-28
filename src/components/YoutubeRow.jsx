import { Box, Heading, Flex, AspectRatio, Card, Text, Container } from '@radix-ui/themes';
import useYouTubeVideos from '../hooks/useYouTubeVideos'

function YouTubeRow({ SectionTitle, playlistId }) {
  const videos = useYouTubeVideos(playlistId);

  const openYouTubeVideo = (videoId) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(youtubeUrl, '_blank');
  };

  // 유효한 비디오 데이터만 필터링
  const validVideos = videos?.filter(video => 
    video?.snippet && 
    video.snippet.resourceId?.videoId &&
    video.snippet.thumbnails?.medium?.url &&
    video.snippet.title
  ) || [];

  if (validVideos.length === 0) {
    return null; // 유효한 비디오가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <Box my="6">
      <Container>
        <Heading size="6" mb="4">{SectionTitle}</Heading>
        <Flex px="5" gap="3" style={{ overflowX: 'auto' }}>
          {validVideos.map((video) => (
            <Card 
              key={video.snippet.resourceId.videoId} 
              style={{ width: '250px', flexShrink: 0, cursor: 'pointer' }} 
              onClick={() => openYouTubeVideo(video.snippet.resourceId.videoId)}
            >
              <AspectRatio ratio={16/9}>
                <img 
                  src={video.snippet.thumbnails.medium.url} 
                  alt={video.snippet.title} 
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </AspectRatio>
              <Box p="2">
                <Text size="2" weight="bold">{video.snippet.title}</Text>
              </Box>
            </Card>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}

export default YouTubeRow;