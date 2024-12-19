
import { Box, Card, Inset, AspectRatio, Flex, Text, Link } from '@radix-ui/themes';
import { decode } from 'html-entities';
import ImageWithFallback from '../components/ImageWithFallback'

const ArticleCard = ({ article,key }) => {
  const { og, title, link } = article;
  return (
      <Card style={{ cursor: 'pointer' }} width={{ initial: '100%' }} key={key}
        onClick={()=> {
          window.open(
            `${link}`,
            '_blank',
            'noopener,noreferrer'
          );
        }}
      >
          <Inset clip="padding-box" side="top" pb="current">
            <AspectRatio ratio={16 / 9} style={{ padding: '0' }}>
              <ImageWithFallback
                src={og.image ? og.image : undefined }
                alt={og.title || 'Article Image'}
                fill
                sizes={'100vw'}
                style={{ objectFit: 'cover' }}
              />
            </AspectRatio>
          </Inset>
          <Flex p="2" direction="column" wrap="wrap">
            <Text weight="bold" size="4" mb="3">
              {decode(og.title || title)}
            </Text>
            <Text
              weight="light"
              size="2"
              style={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
              }}
            >
              {decode(og.description)}
            </Text>
          </Flex>
      </Card>
  );
};

export default ArticleCard;
