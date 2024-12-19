import React, { useEffect } from 'react';
import {
  Heading,
  Section, Flex, Box, Card, Avatar, Text
} from '@radix-ui/themes';
import ArticleCard from './ArticleCard';
import SpriteAnimation from './SpriteAnimation';

const CafeArticleSection = ({ filmoId }) => {
  // const { articles, loading, error } = useFetchArticles({ filmoId });

  return (
    // articles.length >= 0 ? (
    //   <Section>
    //     <Heading size="6" mb="4">
    //       관련 카페글
    //     </Heading>
    //     {
    //       <Flex
    //         my="4"
    //         p="0"
    //         direction={{ initial: 'column' }}
    //         wrap="wrap"
    //         gap="4"
    //         width="100%"
    //         justify={{ initial: 'center' }}
    //       >
    //         {
    //           articles.map((article, index) => (
    //             <Box maxWidth="240px" key={index}>
    //               <Card>
    //                 <Flex gap="3" align="center">
    //                   <Avatar
    //                     size="3"
    //                     src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
    //                     radius="large"
    //                     fallback="이주승승장구"
    //                   />
    //                   <Box>
    //                     <Text as="div" size="2" weight="bold">
    //                       [직찍] 시사회 현장 담아왔어요!
    //                     </Text>
    //                     <Text as="div" size="2" color="gray">
    //                       24.06.12
    //                     </Text>
    //                   </Box>
    //                 </Flex>
    //               </Card>
    //             </Box>

    //           ))
    //         }
    //       </Flex>
    //     }
    //   </Section>
    // ) : null
    <Section>
        <Heading size="6" mb="4">
          관련 카페글
        </Heading>
        {
          <Flex
            my="4"
            p="0"
            direction={{ initial: 'column' }}
            wrap="wrap"
            gap="4"
            width="100%"
            justify={{ initial: 'center' }}
          >
            <Box maxWidth="640px" key={1}>
                  <Card>
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                        radius="large"
                        fallback="이주승승장구"
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          [직찍] 시사회 현장 담아왔어요!
                        </Text>
                        <Text as="div" size="2" color="gray">
                          24.06.12
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </Box>
                <Box maxWidth="640px" key={2}>
                  <Card>
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src="htps://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                        radius="large"
                        fallback=""
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          [직찍] 시사회 현장 담아왔어요!
                        </Text>
                        <Text as="div" size="2" color="gray">
                          24.06.12
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </Box>
                <Box maxWidth="640px" key={3}>
                  <Card>
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                        radius="large"
                        fallback="이주승승장구"
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          [직찍] 시사회 현장 담아왔어요!
                        </Text>
                        <Text as="div" size="2" color="gray">
                          24.06.12
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </Box>
          </Flex>
        }
      </Section>
  );
};
export default CafeArticleSection;
