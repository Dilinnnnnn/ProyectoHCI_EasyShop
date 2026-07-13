import { useState, useRef, useCallback } from "react";
import { Mic } from "lucide-react";

interface FloatingMicButtonProps {
  onClick: () => void;
  active: boolean;
}

export const FloatingMicButton = ({ onClick, active }: FloatingMicButtonProps) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const dragRef = useRef({ startX: 0, startY: 0, elOffsetX: 0, elOffsetY: 0, moved: false });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      elOffsetX: dragOffset.x,
      elOffsetY: dragOffset.y,
      moved: false,
    };
    draggingRef.current = true;
    buttonRef.current?.setPointerCapture(e.pointerId);
  }, [dragOffset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current || e.buttons !== 1) return;
    const dr = dragRef.current;
    const dx = e.clientX - dr.startX;
    const dy = e.clientY - dr.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dr.moved = true;
    if (dr.moved) setDragOffset({ x: dr.elOffsetX + dx, y: dr.elOffsetY + dy });
  }, []);

  const handlePointerUp = useCallback(() => {
    const wasMoved = dragRef.current.moved;
    draggingRef.current = false;
    dragRef.current.moved = false;
    if (!wasMoved) onClick();
  }, [onClick]);

  return (
    <button
      ref={buttonRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { draggingRef.current = false; dragRef.current.moved = false; }}
      className="z-50 flex items-center gap-2 px-5 py-4 rounded-2xl shadow-xl ripple-btn touch-none select-none
        bg-voice text-voice-foreground hover:bg-voice/90 active:scale-95 transition-all max-w-[90vw]"
      style={{
        position: "absolute",
        bottom: "100px",
        right: "12px",
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
      }}
      aria-label="Buscar por voz"
    >
      <Mic className="w-6 h-6 shrink-0" />
      <span className="font-bold text-sm leading-tight">Buscar por voz</span>
    </button>
  );
};
