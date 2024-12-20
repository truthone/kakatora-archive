
import { Box, Card, Inset, AspectRatio, Flex, Text, Link } from '@radix-ui/themes';
import { decode } from 'html-entities';
import ImageWithFallback from '../components/ImageWithFallback'
import Image from 'next/image';
const ArticleCard = ({ article,key }) => {
  const { title, link, imgUrl, description } = article;
  return (
      <Card style={{ cursor: 'pointer' }} width={{ initial: '100%' }} key={key} height="fit-content"
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
              {
                imgUrl ? (
              <Image
                src={imgUrl ? imgUrl : undefined }
                alt={title || 'Article Image'}
                fill
                sizes={'100vw'}
                style={{ objectFit: 'cover' , objectPosition: '50% calc(20%)'}}
              />
                ) : <ImageWithFallback/>
              }
            </AspectRatio>
          </Inset>
          <Flex p="2" direction="column" wrap="wrap">
            <Text weight="bold" size="4" mb="3">
              {decode(title || title)}
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
              {decode(description)}
            </Text>
          </Flex>
      </Card>
  );
};

export default ArticleCard;
