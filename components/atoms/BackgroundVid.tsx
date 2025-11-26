'use client'

import { useEffect, useRef } from 'react';

interface BackgroundVidProps {
  onLoaded?: () => void;
}

export default function BackgroundVid({ onLoaded }: BackgroundVidProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || hasNotifiedRef.current) return;

    // Wait for iframe to load
    const handleLoad = () => {
      // Give the video a moment to start playing
      setTimeout(() => {
        if (!hasNotifiedRef.current && onLoaded) {
          hasNotifiedRef.current = true;
          onLoaded();
        }
      }, 500);
    };

    iframe.addEventListener('load', handleLoad);

    // Safety timeout (cross-origin iframes can't access contentDocument)
    const timeout = setTimeout(() => {
      if (!hasNotifiedRef.current && onLoaded) {
        hasNotifiedRef.current = true;
        onLoaded();
      }
    }, 3000);

    return () => {
      iframe.removeEventListener('load', handleLoad);
      clearTimeout(timeout);
    };
  }, [onLoaded]);

  return (
    <div 
      style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: -10
      }}
    >
      <iframe
        ref={iframeRef}
        src="https://player.vimeo.com/video/1140380584?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&playsinline=1"
        allow="autoplay; fullscreen; picture-in-picture"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "200vw", // 16:9 aspect ratio based on viewport height
          height: "200vw", // 16:9 aspect ratio based on viewport width
          transform: "translate(-50%, -50%)",
        }}
        title="Background Video"
      />
    </div>
  );
}