'use client';
import React, { useState, useRef } from 'react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';
import { Cross2Icon } from '@radix-ui/react-icons';
import {
  AspectRatio,
  Box,
  Text,
  Flex,
  Skeleton,
  Button,
  Card,
  Link
} from '@radix-ui/themes';
import Image from 'next/image';

const Overlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
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
  min-height: 50px;
  padding: 50px 20px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  @keyframes contentShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  cursor: pointer;
  border: none;
  background-color: transparent;
  z-index: 100;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default function GridImageItem({ url, index, title, linkToggle = false, episodeId }) {
  const [naturalWidth, setNaturalWidth] = useState(null);
  const [naturalHeight, setNaturalHeight] = useState(null);
  const containerRef = useRef(null);
  const [dialogImageLoading, setDialogImageLoading] = useState(true);
  const [gridImageLoading, setGridImageLoading] = useState(true);
  const dialogImageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleError = () => {
    setIsVisible(false); // 에러 발생 시 이미지 숨기기
  };

  function handleDialogImageLoad() {
    if (dialogImageRef.current) {
      const { naturalWidth, naturalHeight } = dialogImageRef.current;
      setNaturalWidth(naturalWidth);
      setNaturalHeight(naturalHeight);
      setDialogImageLoading(false); // 로드가 완료되면 loading을 false로 설정
    }
  }

  function handleGridImageLoad() {
    setGridImageLoading(false); // 그리드 이미지 로드 완료 시 loading을 false로 설정
  }

  if (!isVisible) return null;
  
  return (
    <Dialog.Root onContextMenu={(e) => e.stopPropagation()}>
      <Dialog.Trigger asChild>
        <Card
          display="flex"
          direction="column"
          align="center"
          width="50vw"
          maxwidth="fit-content"
          style={{
            cursor: 'pointer',
            justifyContent: 'space-around',
            height: 'fit-content',
          }}
          className="item"
          variant="surface"
        >
          <Skeleton loading={gridImageLoading}>
            <AspectRatio ratio={1 / 1}>
              <Image
                src={url}
                alt={`Episode ${episodeId} - Image ${index + 1}`}
                style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
                fill
                sizes={'(max-width: 768px) 100vw, 50vw'}
                quality={100}
                onError={handleError}
                onLoad={handleGridImageLoad} // 이미지 로드 완료 시 호출
              />
            </AspectRatio>
          </Skeleton>
          <Flex
            m="2"
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Text
              as="div"
              size={{ initial: '1', lg: '3' }}
              align="center"
              style={{
                wordBreak: 'keep-all',
                wordWrap: 'break-word',
                paddingTop: '10px',
              }}
            >
              {title}
            </Text>
          </Flex>
        </Card>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content ref={containerRef} aria-describedby={'이미지 전체크기'}>
          <Dialog.Description asChild>
            <VisuallyHidden.Root>''</VisuallyHidden.Root>
          </Dialog.Description>
          <VisuallyHidden.Root asChild>
            <Dialog.Title></Dialog.Title>
          </VisuallyHidden.Root>
          <Dialog.Close asChild>
            <CloseButton aria-label="Close">
              <Cross2Icon width="100%" height="100%" />
            </CloseButton>
          </Dialog.Close>
          <Skeleton
            loading={dialogImageLoading}
            width={{ xl: '70vw', initial: '50vw' }}
            height="30vh"
            maxWidth="1200px"
            maxHeight="500px"
          >
            <Box
              style={{
                position: 'relative',
                width: `${naturalWidth}px`,
                height: `${naturalHeight}px`,
                maxWidth: '70vw',
                maxHeight: '70vh',
                margin: '20px auto',
              }}
            >
              <Image
                ref={dialogImageRef}
                src={url}
                alt={`Episode ${episodeId} - Image ${index + 1}`}
                style={{
                  objectFit: 'contain',
                }}
                fill
                quality={100}
                sizes={'(max-width:768px) 70vw, 100vw'}
                onError={handleError}
                onLoad={handleDialogImageLoad} // 이미지 로드 완료 시 호출
                onContextMenu={(e) => {
                  e.stopPropagation();
                  return true;
                }}
              />
            </Box>
          </Skeleton>
          {
            linkToggle ? <Link  href={`/liveAlone/${episodeId}`} underline="hover" style={{width:'100%', display:'inline-block',textAlign:'center'}}>
              <Text color="gray" weight="light" style={{fontSize: '0.8rem', fontStyle: "italic"}}>나 혼자 산다 {episodeId}회</Text></Link>:null
          }
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
