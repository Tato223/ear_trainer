import { interval, Pitch } from "tonal";
import * as quizLogic from './quiz_logic';

export const orderedNotes: Note[] = ["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"] 

// Custom Types

export type NaturalNote = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type AccidentalNote = `${NaturalNote}#` | `${NaturalNote}b`;
export type Note = NaturalNote | AccidentalNote;
export type octave = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type interval = 2 | 4 | 5 | 7; // basic intervals for simplicity, expansion possible in the future
export type PitchModifier = "Sharp" | "Flat" | "In Tune";
export type NoteLength = 1 | 2 | 4 | 8 | 16 | 32;
export type QuizType = PitchRecognitionQuiz | MajorScalesQuiz |IntervalQuiz | IntonationQuiz;
export type AudioPlaybackType = "SingleNote" | "SequenceOfNotes"

export interface Scale {
  Name: string;
  Notes: Note[];
}

export interface Interval {
  value: interval;
}

// Component props types

export interface QuizProps {
  quizType: QuizType;
  maxQuestions: number;
}

// Quiz Categories

export interface PitchRecognitionQuiz {
  name: "PitchRecognitionQuiz";
  audioPlaybackType: "SingeNote";
  questionType: "PitchRecognitionQuestion";
  quizEndpoint: "/pitch_recognition";
  defaultOctave: 4;
  noteLength: 4;
  optionsType: NaturalNote;
  answerType: NaturalNote;
  questionText: "Select an answer choice to identify the note.";
}

export interface MajorScalesQuiz {
  name: "MajorScalesQuiz";
  audioPlaybackType: "SequenceOfNotes";
  questionType: "MajorScaleQuestion";
  quizEndpoint: "/major_scales";
  defaultOctave: 4;
  noteLength: 8;
  optionsType: Scale[];
  answerType: Scale;
  questionText: "Select an answer choice to identify the major scale.";
}

export interface IntervalQuiz {
  name: "IntervalsQuiz";
  audioPlaybackType: "SequenceOfNotes";
  questionType: "IntervalQuestion";
  quizEndpoint: "/intervals";
  defaultOctave: 4;
  noteLength: 4;
  optionsType: Interval[];
  answerType: Interval;
  questionText: "Select an answer choice to identify the interval.";
}

export interface IntonationQuiz {
  name: "IntonationQuiz";
  audioPlaybackType: "SingleNote";
  questionType: "IntonationQuestion";
  quizEndpoint: "/intonation";
  defaultOctave: 4;
  noteLength: 4;
  optionsType: PitchModifier[];
  answerType: PitchModifier;
  questionText: "Select an answer choice to determine if the note is sharp, flat, or natural.";
}


// Question Categories

export interface IntervalQuestion {
  text: string;
  isAnswered: boolean;
  options: interval[];
  correctAnswer: interval | string;
  selectedAnswer: interval | null;
  intervalNotes: Note[]
}

export interface PitchRecognitionQuestion {
  text: string;
  isAnswered: boolean;
  options: NaturalNote[];
  correctAnswer: NaturalNote;
  selectedAnswer: NaturalNote | null;
  audioPlaybackType: "SingleNote";
}

export interface MajorScaleQuestion {
  text: string;
  isAnswered: boolean;
  options: Scale[];
  correctAnswer: Scale;
  selectedAnswer: Scale | null;
}

export interface IntonationQuestion {
  text: string;
  isAnswered: boolean,
  options: PitchModifier[],
  noteToPlay: Note,
  correctAnswer: PitchModifier,
  selectedAnswer: PitchModifier | null
}

// Major scale objects

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
