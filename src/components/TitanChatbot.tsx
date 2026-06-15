import { useEffect, useState } from "react";

export function TitanChatbot() {
  const [size, setSize] = useState({ open: false, expanded: false });
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [vh, setVh] = useState(typeof window !== "undefined" ? window.innerHeight : 768);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === "titan-chat-size") {
        setSize({ open: !!e.data.open, expanded: !!e.data.expanded });
      }
    };
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    window.addEventListener("message", onMsg);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("message", onMsg);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const isMobile = vw < 640;

  let width: number;
  let height: number;
  if (!size.open) {
    width = 110;
    height = 110;
  } else if (isMobile) {
    width = vw;
    height = vh;
  } else {
    width = size.expanded ? 960 : 460;
    height = 800;
  }

  return (
    <iframe
      src="/chatbot-widget.html"
      title="Coach IA Titan"
      style={{
        position: "fixed",
        right: 0,
        bottom: 0,
        width,
        height,
        border: "none",
        background: "transparent",
        zIndex: 60,
        transition: "width 0.4s cubic-bezier(0.2,0.8,0.2,1), height 0.3s ease",
        colorScheme: "normal",
      }}
      allow="clipboard-write"
    />
  );
}
