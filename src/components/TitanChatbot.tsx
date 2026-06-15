import { useEffect, useState } from "react";

export function TitanChatbot() {
  const [size, setSize] = useState({ open: false, expanded: false });

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === "titan-chat-size") {
        setSize({ open: !!e.data.open, expanded: !!e.data.expanded });
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // FAB always 84x84 area; when open, bigger panel
  const width = size.open ? (size.expanded ? 960 : 460) : 110;
  const height = size.open ? 800 : 110;

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
