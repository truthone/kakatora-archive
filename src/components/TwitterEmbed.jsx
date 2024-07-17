import React, { useEffect, useRef } from 'react';

const TwitterEmbed = ({ tweetId }) => {
  const tweetRef = useRef(null);

  useEffect(() => {
    // 트위터 위젯 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    // DOM 변경 감지를 위한 MutationObserver 설정
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Twitter 위젯이 로드되어 DOM이 변경되었을 때
          const tweetElement = tweetRef.current;
          if (tweetElement && tweetElement.querySelector('iframe')) {
            // DOM 조작 수행
            const firstChild = tweetElement.firstElementChild;
            if (firstChild) {
              firstChild.style.display = 'none'; // 첫 번째 자식 요소 숨기기
              // 또는 firstChild.remove(); // 첫 번째 자식 요소 제거
            }
            
            // 필요한 경우 여기에 추가적인 DOM 조작 코드를 작성하세요.

            // 관찰 중단
            observer.disconnect();
          }
        }
      });
    });

    // 트윗 컨테이너 관찰 시작
    if (tweetRef.current) {
      observer.observe(tweetRef.current, { childList: true, subtree: true });
    }

    return () => {
      // 컴포넌트 언마운트 시 정리
      document.body.removeChild(script);
      observer.disconnect();
    };
  }, [tweetId]);

  return (
    <div ref={tweetRef}>
      <blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><p lang="ko" dir="ltr">240707 <a href="https://twitter.com/hashtag/%EB%8B%A4%EC%9A%B0%EB%A0%8C%EC%9D%98%EA%B2%B0%ED%98%BC?src=hash&amp;ref_src=twsrc%5Etfw">#다우렌의결혼</a> gv 부산 <a href="https://twitter.com/hashtag/%EC%9D%B4%EC%A3%BC%EC%8A%B9?src=hash&amp;ref_src=twsrc%5Etfw">#이주승</a> <a href="https://t.co/vTWdUzQl8a">pic.twitter.com/vTWdUzQl8a</a></p>&mdash; 주르딩딩 (@ju___h_i__) <a href="https://twitter.com/ju___h_i__/status/1809950949714391317?ref_src=twsrc%5Etfw">July 7, 2024</a></blockquote>
    </div>
  );
};

export default TwitterEmbed;