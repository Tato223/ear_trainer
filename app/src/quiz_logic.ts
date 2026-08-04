import {
  NaturalNote,
  Interval,
  Scale,
  PitchRecognitionQuestion,
  MajorScaleQuestion,
  AccidentalNote,
  Note,
  scales
} from "./types";

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

function getCorrectNote(options: NaturalNote[]): NaturalNote {
  const answerIndex = Math.floor(Math.random() * options.length);
  return options[answerIndex];
}

function getCorrectScale(options: Scale[]): Scale {
  const answerIndex = Math.floor(Math.random() * options.length)
  return options[answerIndex]
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

function generateOptionsArr(): NaturalNote[] {
  const options: NaturalNote[] = [];
  let possibleNotes: NaturalNote[] = ["C", "D", "E", "F", "G", "A", "B"];

  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * possibleNotes.length);
    let newNote: NaturalNote = possibleNotes[randomIndex];

    possibleNotes.splice(randomIndex, 1);

    options.push(newNote);
  }

  // console.log(options);
  return options;
}