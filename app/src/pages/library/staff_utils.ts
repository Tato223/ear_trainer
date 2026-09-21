import { Note, AccidentalNote, Scale, orderedNotes } from "../../types";

const enharmonicMap: Record<string, string> = {
  "C#": "Db", Db: "C#",
  "D#": "Eb", Eb: "D#",
  "F#": "Gb", Gb: "F#",
  "G#": "Ab", Ab: "G#",
  "A#": "Bb", Bb: "A#",
};

export function getEnharmonicEquivalent(note: AccidentalNote): AccidentalNote {
  return enharmonicMap[note] as AccidentalNote;
}

export function isAccidentalNote(note: Note): note is AccidentalNote {
  return note.length > 1;
}

export function toVexKey(note: Note, octave: number): string {
  return `${note.toLowerCase()}/${octave}`;
}

export function scaleToVexKeys(scale: Scale): string[] {

    const seenNotes: Note[] = [];
    const seenBorBb: Note[] = [];
    let prevOrderedIndex: number | null = null;
    const indexOfBb = orderedNotes.indexOf("Bb");
    let defaultOctave = 4;

  return scale.Notes.map((note) => {

     let currOrderedIndex = orderedNotes.indexOf(note);
     let octave = defaultOctave;
    
        if (
          (prevOrderedIndex && currOrderedIndex < prevOrderedIndex) ||
          (currOrderedIndex < indexOfBb && seenBorBb.length > 0) ||
          seenNotes.includes(note)
        ) {
          octave = defaultOctave + 1;
        } else {
          octave = defaultOctave;
        }
    
        prevOrderedIndex = currOrderedIndex;
    
        if (note === "B" || note === "Bb") {
          seenBorBb.push(note);
        }
    
        seenNotes.push(note);
        
    return toVexKey(note, octave);
  });
}

export function parseVexKey(vexKey: string): { accidental: string } {
  const [pitchPart] = vexKey.split("/");
  const accidental = pitchPart.slice(1);
  return { accidental };
}