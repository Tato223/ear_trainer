import {
  NaturalNote,
  Interval,
  Scale,
  Question,
  AccidentalNote,
} from "./types";

import * as Tone from "tone";

function createPitchRecognitionQuestion(text: string): Question {
  const question: Question = {
    text: text,
    options: generateOptionsArr(),
    isAnswered: false,
  };

  return question;
}

function createPitchRecognitionQuiz(numQuestions: number) {

  for (let i = 0; i < numQuestions; i++) {
    let currQuestion = createPitchRecognitionQuestion("text");
    let answer = getCorrectNote(currQuestion.options);
    playNaturalNote(answer);

    console.log(`Question #${i}:`)
    console.log(`Answer Choices: ${currQuestion.options}`)
    console.log(`Correct Answer: ${answer}`)
  }
}

function getCorrectNote(options: NaturalNote[]): NaturalNote {
  const answerIndex = Math.floor(Math.random() * 4);
  return options[answerIndex];
}

function generateOptionsArr(): NaturalNote[] {
  const options: NaturalNote[] = [];

  for (let i = 0; i < 4; i++) {
    let possibleNotes: NaturalNote[] = ["C", "D", "E", "F", "G", "A", "B"];
    let randomIndex = Math.floor(Math.random() * possibleNotes.length);
    let newNote: NaturalNote = possibleNotes[randomIndex];

    possibleNotes.splice(randomIndex, 1);

    options.push(newNote);
  }

  console.log(options);
  return options;
}

function playNaturalNote(note: NaturalNote) {
  const synth = new Tone.Synth().toDestination();

  synth.triggerAttackRelease(note, "4n");
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
async function delayQuiz() {
    while (true) {
        await delay(5000)
        createPitchRecognitionQuiz(10)
    }
}