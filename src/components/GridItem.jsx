import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';
import { Cross2Icon } from '@radix-ui/react-icons';
import { AspectRatio, Box, Text, Flex, Skeleton, Button } from '@radix-ui/themes';

const Overlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes overlayShow {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Content = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 200px;
  max-width: 1500px;
  height: auto;
  padding: 10px 15px 60px 15px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes contentShow {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const CloseButton = styled(Button)`
  width: 24px;
  height: 24px;
  padding-bottom: 10px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  cursor: pointer;
  border: none;
  background-color: transparent;
  
  &:hover { 
    background-color: rgba(0, 0, 0, 0.1); 
  }

  @media (min-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const GridItem = ({ image, episode, index, formatImageTitle }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Flex direction="column" p="2" align="center" style={{cursor: 'pointer', border: "solid 0.5px #808080", borderRadius: "5px", justifyContent: "space-around"}}>
        <AspectRatio ratio={1 / 1}>
        <Skeleton loading="true" width="200" height="200">
          <img
            src={`${process.env.PUBLIC_URL}/images/filmo_liveAlone/${episode.ep}/${image}`}
            alt={`Episode ${episode.ep} - Image ${index + 1}`}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            loading="lazy"
          />
        </Skeleton>
        </AspectRatio>
        <Flex m="2" style={{justifyContent:"center", alignItems: "center"}}>
          <Text as="div" size={{initial: '1', lg: '3'}} align="center" style={{wordBreak:"keep-all", wordWrap: "break-word"}}>
            {formatImageTitle(image)}
          </Text>
        </Flex>
      </Flex>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Close asChild>
          <Flex style={{justifyContent: "flex-end"}}>
            <CloseButton aria-label="Close">
              <Cross2Icon width="100%" height="100%"/>
            </CloseButton>
          </Flex>
        </Dialog.Close>
        <Skeleton loading="true" width="200" height="200">
          <img
            src={`${process.env.PUBLIC_URL}/images/filmo_liveAlone/${episode.ep}/${image}`}
            alt={`Episode ${episode.ep} - Image ${index + 1}`}
            style={{ minWidth: '200px', width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain' }}
          />
        </Skeleton>
      </Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default GridItem;