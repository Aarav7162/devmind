import { useEffect, useRef, useState } from "react";

interface Props {
  frames: string[];
  className?: string;
  charDelay?: number;
  framePause?: number;
}

export function TerminalTyper({ frames, className = "", charDelay = 14, framePause = 1800 }: Props) {
  const [text, setText] = useState("");
  const idx = useRef(0);
  const pos = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = frames[idx.current];
      if (pos.current < current.length) {
        pos.current += 1;
        setText(current.slice(0, pos.current));
        timer = setTimeout(tick, current[pos.current - 1] === "\n" ? charDelay * 2 : charDelay);
      } else {
        timer = setTimeout(() => {
          idx.current = (idx.current + 1) % frames.length;
          pos.current = 0;
          setText("");
          tick();
        }, framePause);
      }
    };
    tick();
    return () => clearTimeout(timer);
  }, [frames, charDelay, framePause]);

  return (
    <pre className={`font-mono whitespace-pre-wrap text-[13px] leading-relaxed ${className}`}>
      {text}
      <span className="blink text-[#7c6cfc]">▍</span>
    </pre>
  );
}
