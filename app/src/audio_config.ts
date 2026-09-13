import * as tone from "tone";
import * as types from "./types.ts";

export function playSingleNote(
  currentQuestion: any,
  setIsPlaying: Function,
  defaultOctave: types.octave,
  noteLength: types.NoteLength,
) {
  const synth = new tone.Synth().toDestination();
  synth.triggerAttackRelease(
    currentQuestion.correctAnswer + defaultOctave,
    `${noteLength}n`,
  );

  return () => {
    synth.dispose();
    setIsPlaying(false);
  };
}

export function playScale(
  seenBorBb: types.Note[],
  seenNotes: types.Note[],
  note: types.Note,
  prevOrderedIndex: number | null,
  index: number,
  synth: tone.Synth,
  defaultOctave: types.octave,
  noteLength: types.NoteLength,
): void {
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

  synth.triggerAttackRelease(`${note}${octave}`, noteLength, scheduledTime);

  if (note === "B" || note === "Bb") {
    seenBorBb.push(note);
  }

  seenNotes.push(note);
}

export function playInterval(
  note: types.Note,
  prevOrderedIndex: number | null,
  index: number,
  octave: types.octave,
  synth: tone.Synth,
  noteLength: types.NoteLength,
  delayBetweenNotes: number = 0.75,
) {
  let currOrderedIndex = types.orderedNotes.indexOf(note);
  prevOrderedIndex && currOrderedIndex < prevOrderedIndex ? octave++ : null;

  const scheduledTime = tone.now() + index * delayBetweenNotes;
  synth.triggerAttackRelease(`${note}${octave}`, noteLength, scheduledTime);

  prevOrderedIndex = currOrderedIndex;
}

export function playNoteWithPitchModifer(
  synth: tone.Synth,
  currentQuestion: any,
  setIsPlaying: Function,
  defaultOctave: types.octave,
  noteLength: types.NoteLength,
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
    noteLength,
  );

  return () => {
    synth.dispose();
    setIsPlaying(false);
  };
}
