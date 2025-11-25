'use client'

export default function BackgroundVid() {
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
        src="https://player.vimeo.com/video/1140380584?background=1&autoplay=1&loop=1&muted=1"
        allow="autoplay; fullscreen; picture-in-picture"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "200vh", // 16:9 aspect ratio based on viewport height
          height: "200vw", // 16:9 aspect ratio based on viewport width
          transform: "translate(-50%, -50%)",
        }}
        title="Background Video"
      />
    </div>
  );
}