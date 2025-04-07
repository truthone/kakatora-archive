"use client";

import React, { useEffect, useState } from "react";
import {IconButton} from "@radix-ui/themes";
import {ArrowUpIcon} from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip"; // Radix Tooltip 불러오기
function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 감지 함수
  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  // 최상단으로 스크롤 이동
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
    }, []);

  return (
    <>
      {isVisible && (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
            <IconButton
                  onClick={scrollToTop}
                  style={{
                    position: "fixed",
                    bottom: "2rem",
                    right: "2rem",
                    border: "none",
                    borderRadius: "50%",
                    width: "3rem",
                    height: "3rem",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: "0.8",
                    zIndex: "1000"
                  }}
                >
                <ArrowUpIcon />
              </IconButton>
            </Tooltip.Trigger>
            <Tooltip.Content
              side="left"
              style={{
                backgroundColor: "#333",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                fontSize: "0.875rem",
              }}
            >
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </>
  );
}

export default TopButton;