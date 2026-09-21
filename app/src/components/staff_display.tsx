// components/StaffDisplay.tsx
import { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Formatter, Accidental } from "vexflow";
import { parseVexKey } from "../pages/library/staff_utils";

interface StaffDisplayProps {
  vexKeys: string[];
  width?: number;
}

export default function StaffDisplay({ vexKeys, width }: StaffDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || vexKeys.length === 0) return;

    container.innerHTML = "";

    const staveWidth = width ?? Math.max(220, vexKeys.length * 70 + 60);

    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(staveWidth, 120);
    const context = renderer.getContext();

    const stave = new Stave(10, 10, staveWidth - 20);
    stave.addClef("treble");
    stave.setContext(context).draw();

    const staveNotes = vexKeys.map((key) => {
      const note = new StaveNote({ keys: [key], duration: "q" });
      const { accidental } = parseVexKey(key);

      if (accidental) {
        note.addModifier(new Accidental(accidental), 0);
      }

      return note;
    });

    Formatter.FormatAndDraw(context, stave, staveNotes);
  }, [vexKeys, width]);

  return <div className="staff-display" ref={containerRef} />;
}