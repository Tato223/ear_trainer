import { Interval } from "tonal";

import {
  NaturalNote,
  IntervalQuestion,
  Scale,
  PitchRecognitionQuestion,
  MajorScaleQuestion,
  scales,
  interval,
  Note
} from "./types";

const possibleNotes: Note[] = ["C", "D", "E", "F", "G", "A", "B"]

export function createPitchRecognitionQuestion(text: string): PitchRecognitionQuestion {

  const options = generateOptionsArr()
  const correctAnswer = getCorrectNote(options)

  const question: PitchRecognitionQuestion = {
    text: text,
    options: options,
    isAnswered: false,
    correctAnswer: correctAnswer,
    selectedAnswer: null
  };

  return question;
}

export function createMajorScaleQuestion(text: string): MajorScaleQuestion {
  
  const options = generateMajorScaleOptionsArr()
  const correctAnswer = getCorrectScale(options)

  const question: MajorScaleQuestion = {
    text: text,
    options: options,
    isAnswered: false,
    correctAnswer: correctAnswer,
    selectedAnswer: null
  }

  return question;
}

export function createIntervalQuestion(text: string): IntervalQuestion {

  const rootNote: Note = selectIntervalRoot()
  const intervalNote: Note = getIntervalNameFromRoot(rootNote)
  const options: interval[] = [2, 4, 5, 7]
  const correctAnswer = getCorrectInterval(rootNote, intervalNote)

  const question: IntervalQuestion = {
    text: text,
    options: options,
    isAnswered: false,
    correctAnswer: correctAnswer,
    selectedAnswwer: null
  }

  return question
}

function getCorrectNote(options: NaturalNote[]): NaturalNote {
  const answerIndex = Math.floor(Math.random() * options.length);
  return options[answerIndex];
}

function getCorrectScale(options: Scale[]): Scale {
  const answerIndex = Math.floor(Math.random() * options.length)
  return options[answerIndex]
}

function getCorrectInterval(rootNote: Note, intervalNote: Note): string {
  const derivedInterval = Interval.distance(rootNote, intervalNote).toString().slice(0, 1)
  return derivedInterval
}

function selectIntervalRoot(): Note {
  const possibleNotes: Note[] = ["C", "D", "E", "F", "G", "A", "B"]
  const rootNoteIndex = Math.floor(Math.random() * possibleNotes.length)
  const intervalRoot = possibleNotes[rootNoteIndex]
  return intervalRoot
}


function generateMajorScaleOptionsArr(): Scale[] {
  const options: Scale[] = [];
  let possibleScales: Scale[] = [...scales]

  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * possibleScales.length);
    let newScale: Scale = possibleScales[randomIndex];

    possibleScales.splice(randomIndex, 1);

    options.push(newScale);
  }

  return options;
}

function getIntervalNameFromRoot(intervalRoot: Note): Note {
  const notes: Note[] = [...possibleNotes]
  const rootIndex = notes.indexOf(intervalRoot)
  const possibleIntervals = [
    (rootIndex + 1) % notes.length,
    (rootIndex + 3) % notes.length,
    (rootIndex + 4) % notes.length,
    (rootIndex + 6) % notes.length
  ]

  const randomIndex = Math.floor(Math.random() * possibleIntervals.length)
  const noteIndex = possibleIntervals[randomIndex]
  return notes[noteIndex]
}

function generateOptionsArr(): NaturalNote[] {
  const options: NaturalNote[] = [];
  let possibleNotes: NaturalNote[] = ["C", "D", "E", "F", "G", "A", "B"]; // if interval > length, subtract length

  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * possibleNotes.length);
    let newNote: NaturalNote = possibleNotes[randomIndex];

    possibleNotes.splice(randomIndex, 1);

    options.push(newNote);
  }

  // console.log(options);
  return options;
}