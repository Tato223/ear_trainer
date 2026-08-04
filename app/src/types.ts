import { interval } from "tonal";

export type NaturalNote = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type AccidentalNote = `${NaturalNote}#` | `${NaturalNote}b`;
export type Note = NaturalNote | AccidentalNote;
export type octave = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type interval = 2 | 4 | 5 | 7; // basic intervals for simplicity, expansion possible in the future

export interface Scale {
  Name: string;
  Notes: Note[];
}

export interface Interval {
  value: interval;
}

export interface IntervalQuestion {
  text: string;
  isAnswered: boolean;
  options: interval[];
  correctAnswer: interval | string;
  selectedAnswwer: interval | null;
  intervalNotes: Note[]
}

export interface PitchRecognitionQuestion {
  text: string;
  isAnswered: boolean;
  options: NaturalNote[];
  correctAnswer: NaturalNote;
  selectedAnswer: NaturalNote | null;
}

export interface MajorScaleQuestion {
  text: string;
  isAnswered: boolean;
  options: Scale[];
  correctAnswer: Scale;
  selectedAnswer: Scale | null;
}

// Major scale obj

export const C_Major_Scale: Scale = {
  Name: "C Major",
  Notes: ["C", "D", "E", "F", "G", "A", "B", "C"],
};

export const G_Major_Scale: Scale = {
  Name: "G Major",
  Notes: ["G", "A", "B", "C", "D", "E", "F#", "G"],
};

export const D_Major_Scale: Scale = {
  Name: "D Major",
  Notes: ["D", "E", "F#", "G", "A", "B", "C#", "D"],
};

export const A_Major_Scale: Scale = {
  Name: "A Major",
  Notes: ["A", "B", "C#", "D", "E", "F#", "G#", "A"],
};

export const E_Major_Scale: Scale = {
  Name: "E Major",
  Notes: ["E", "F#", "G#", "A", "B", "C#", "D#", "E"],
};

export const B_Major_Scale: Scale = {
  Name: "B Major",
  Notes: ["B", "C#", "D#", "E", "F#", "G#", "A#", "B"],
};

export const FSharp_Major_Scale: Scale = {
  Name: "F# Major",
  Notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#", "F#"],
};

export const Db_Major_Scale: Scale = {
  Name: "Db Major",
  Notes: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C", "Db"],
};

export const Ab_Major_Scale: Scale = {
  Name: "Ab Major",
  Notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G", "Ab"],
};

export const Eb_Major_Scale: Scale = {
  Name: "Eb Major",
  Notes: ["Eb", "F", "G", "Ab", "Bb", "C", "D", "Eb"],
};

export const Bb_Major_Scale: Scale = {
  Name: "Bb Major",
  Notes: ["Bb", "C", "D", "Eb", "F", "G", "A", "Bb"],
};

export const F_Major_Scale: Scale = {
  Name: "F Major",
  Notes: ["F", "G", "A", "Bb", "C", "D", "E", "F"],
};

export const scales: Scale[] = [
  C_Major_Scale,
  D_Major_Scale,
  E_Major_Scale,
  G_Major_Scale,
  A_Major_Scale,
  B_Major_Scale,
  F_Major_Scale,
  FSharp_Major_Scale,
  Bb_Major_Scale,
  Eb_Major_Scale,
  Db_Major_Scale,
  Ab_Major_Scale,
];
