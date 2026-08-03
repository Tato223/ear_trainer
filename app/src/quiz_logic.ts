import {
  NaturalNote,
  Interval,
  Scale,
  Question,
  AccidentalNote,
} from "./types";

import * as Tone from "tone";

export function createPitchRecognitionQuestion(text: string): Question {

  const options = generateOptionsArr()
  const correctAnswer = getCorrectNote(options)

  const question: Question = {
    text: text,
    options,
    isAnswered: false,
    correctAnswer,
    selectedAnswer: null
  };

  return question;
}

export function createPitchRecognitionQuiz(numQuestions: number) {

  for (let i = 0; i < numQuestions; i++) {
    let questionNumber = i + 1;
    let currQuestion = createPitchRecognitionQuestion("text");
    let answer = currQuestion.correctAnswer;
    playNaturalNote(answer);
/*
    console.log(`Question #${questionNumber}:`)
    console.log(`Answer Choices: ${currQuestion.options}`)
    console.log(`Correct Answer: ${answer}`)
    */
  }
}

function getCorrectNote(options: NaturalNote[]): NaturalNote {
  const answerIndex = Math.floor(Math.random() * 4);
  return options[answerIndex];
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

function playNaturalNote(note: NaturalNote) {
  const synth = new Tone.Synth().toDestination();

  synth.triggerAttackRelease(note, "4n");
}

function startQuiz() {
  setTimeout(createPitchRecognitionQuiz, 5)
  createPitchRecognitionQuiz(10)
}