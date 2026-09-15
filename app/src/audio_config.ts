import * as tone from "tone";
import * as types from "./types.ts";

export function playSingleNote(
  currentQuestion: any,
  setIsPlaying: Function,
  defaultOctave: types.octave,
  noteDurationSeconds: types.NoteDurationSeconds,
) {
  const synth = new tone.Synth().toDestination();
  synth.triggerAttackRelease(
    currentQuestion.correctAnswer + defaultOctave,
    `${noteDurationSeconds}n`,
  );

  return () => {
    synth.dispose();
    setIsPlaying(false);
  };
}

export function playScale(
  note: types.Note,
  index: number,
  // synth: tone.Synth,
  defaultOctave: types.octave,
  noteDurationSeconds: types.NoteDurationSeconds,
  seenBorBb: types.Note[],
  seenNotes: types.Note[],
  setIsPlaying: Function
) {
  const synth = new tone.Synth().toDestination();

  let prevOrderedIndex: number | null = null;

  let octave = defaultOctave;
  let currOrderedIndex = types.orderedNotes.indexOf(note);
  const indexOfBb = 15;

  if (
    (prevOrderedIndex && currOrderedIndex < prevOrderedIndex) ||
    (currOrderedIndex < indexOfBb && seenBorBb.length > 0) ||
    seenNotes.includes(note)
  ) {
    octave++;
  } else {
    octave = defaultOctave;
  }

  prevOrderedIndex = currOrderedIndex;
  const scheduledTime = tone.now() + index * 0.25;

  synth.triggerAttackRelease(
    `${note}${octave}`,
    noteDurationSeconds,
    scheduledTime,
  );

  if (note === "B" || note === "Bb") {
    seenBorBb.push(note);
  }

  seenNotes.push(note);

  return () => {
    synth.dispose();
    setIsPlaying(false);
  };
}

export function playInterval(
  note: types.Note,
  prevOrderedIndex: number | null,
  index: number,
  octave: types.octave,
  synth: tone.Synth,
  noteDurationSeconds: types.NoteDurationSeconds,
  delayBetweenNotes: number = 0.75,
) {
  let currOrderedIndex = types.orderedNotes.indexOf(note);
  prevOrderedIndex && currOrderedIndex < prevOrderedIndex ? octave++ : null;

  const scheduledTime = tone.now() + index * delayBetweenNotes;
  synth.triggerAttackRelease(
    `${note}${octave}`,
    noteDurationSeconds,
    scheduledTime,
  );

  prevOrderedIndex = currOrderedIndex;
}

export function playNoteWithPitchModifer(
  synth: tone.Synth,
  currentQuestion: any,
  setIsPlaying: Function,
  defaultOctave: types.octave,
  noteDurationSeconds: types.NoteDurationSeconds,
) {
  // Determines how to adjust the pitch depending on the correct answer
  let modifier = 0;
  if (currentQuestion.correctAnswer === "Flat") {
    modifier = -40;
  } else if (currentQuestion.correctAnswer === "Sharp") {
    modifier = +40;
  }

  //adjust the pitch using the modifier
  synth.detune.value = modifier;

  synth.triggerAttackRelease(
    currentQuestion.noteToPlay + defaultOctave,
    noteDurationSeconds,
  );

  return () => {
    synth.dispose();
    setIsPlaying(false);
  };
}
