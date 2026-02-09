"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import CountdownTimer from "@/components/organisms/CountdownTimer";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import BackgroundVid from "@/components/atoms/BackgroundVid";
import LoadingScreen from "@/components/organisms/LoadingScreen";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Track individual loading states
  const videoLoadedRef = useRef(false);
  const countdownLoadedRef = useRef(false);
  const textLoadedRef = useRef(false);
  const pageMountedRef = useRef(false);
  const hasTriggeredLoadRef = useRef(false);

  const checkAllLoaded = useCallback(() => {
    if (hasTriggeredLoadRef.current) return;
    
    if (
      pageMountedRef.current &&
      videoLoadedRef.current &&
      countdownLoadedRef.current &&
      textLoadedRef.current
    ) {
      hasTriggeredLoadRef.current = true;
      // Small delay to ensure everything is fully rendered
      setTimeout(() => {
        setIsLoaded(true);
      }, 300);
    }
  }, []);

  // Mark page as mounted
  useEffect(() => {
    setIsMounted(true);
    pageMountedRef.current = true;
    checkAllLoaded();
  }, [checkAllLoaded]);

  // Track when video is loaded
  const handleVideoLoaded = () => {
    videoLoadedRef.current = true;
    checkAllLoaded();
  };

  // Track when countdown is loaded
  const handleCountdownLoaded = () => {
    countdownLoadedRef.current = true;
    checkAllLoaded();
  };

  // Track when text elements are loaded
  useEffect(() => {
    if (!isMounted) return;

    const checkTextLoaded = () => {
      if (textLoadedRef.current) return true;
      
      const header = document.querySelector('header');
      
      if (header) {
        const headerHasContent = header.textContent && header.textContent.trim().length > 0;
        // Look for footer navigation links (Instagram link)
        const allLinks = document.querySelectorAll('nav a');
        const hasFooterLinks = Array.from(allLinks).some(link => 
          link.getAttribute('href')?.includes('instagram') || link.textContent?.toLowerCase().includes('instagram')
        );
        
        // Check that header has logo/text and footer has links
        if (headerHasContent && allLinks.length > 0 && hasFooterLinks) {
          textLoadedRef.current = true;
          checkAllLoaded();
          return true;
        }
      }
      return false;
    };

    // Check after components have had time to render
    const timeout = setTimeout(() => {
      checkTextLoaded();
    }, 300);

    // Use MutationObserver to watch for content changes
    const observer = new MutationObserver(() => {
      checkTextLoaded();
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [isMounted, checkAllLoaded]);

  // Safety timeout - hide loading screen after max wait time
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      if (!isLoaded) {
        videoLoadedRef.current = true;
        countdownLoadedRef.current = true;
        textLoadedRef.current = true;
        setIsLoaded(true);
      }
    }, 8000);

    return () => clearTimeout(safetyTimeout);
  }, [isLoaded]);

  return (
    <>
      <LoadingScreen isLoaded={isLoaded} />
      {isMounted && (
        <div className="flex flex-col font-primary w-screen h-screen justify-center items-center text-center align-middle overflow-hidden">
          <Header />
          <BackgroundVid onLoaded={handleVideoLoaded} />
          <CountdownTimer targetDate="2026-02-12" onLoaded={handleCountdownLoaded} />
          <Footer />
        </div>
      )}
    </>
  );
}
