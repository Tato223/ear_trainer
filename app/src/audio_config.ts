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
  currentQuestion: types.MajorScaleQuestion,
  defaultOctave: types.octave,
  noteDurationSeconds: types.NoteDurationSeconds,
  setIsPlaying: Function,
) {
  const seenBorBb: types.Note[] = [];
  const seenNotes: types.Note[] = [];
  const synth = new tone.Synth().toDestination();

  let prevOrderedIndex: number | null = null;

  let octave = defaultOctave;
  const indexOfBb = 15;

  const correctNotes: types.Note[] = currentQuestion.correctAnswer.Notes;

  correctNotes.forEach((note: types.Note, index: number) => {
    let currOrderedIndex = types.orderedNotes.indexOf(note);

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
  });

  return () => {
    synth.dispose();
    setIsPlaying(false);
  };
}

export function playScaleLibrary(scale: types.Scale): void {
  const defaultOctave: types.octave = 4;
  const seenBorBb: types.Note[] = [];
  const seenNotes: types.Note[] = [];
  const synth = new tone.Synth().toDestination();

  let prevOrderedIndex: number | null = null;

  let octave = defaultOctave;
  const indexOfBb = 15;

  const correctNotes: types.Note[] = scale.Notes;

  const noteDurationSeconds: types.NoteDurationSeconds = 0.4;

  correctNotes.forEach((note: types.Note, index: number) => {
    let currOrderedIndex = types.orderedNotes.indexOf(note);

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
  });
}

export function playInterval(
  currentQuestion: types.IntervalQuestion,
  defaultOctave: types.octave,
  noteDurationSeconds: types.NoteDurationSeconds,
  delayBetweenNotes: number = 0.75,
  setIsPlaying: Function
) {
  const answerNotes: types.Note[] = currentQuestion.intervalNotes;
  const synth = new tone.Synth().toDestination();
  let prevOrderedIndex: number | null = null;

  answerNotes.forEach((note, index) => {
    let octave = defaultOctave;
    let currOrderedIndex = types.orderedNotes.indexOf(note);
    prevOrderedIndex && currOrderedIndex < prevOrderedIndex
      ? (octave = defaultOctave + 1)
      : (octave = defaultOctave);

    const scheduledTime = tone.now() + index * delayBetweenNotes;
    synth.triggerAttackRelease(
      `${note}${octave}`,
      noteDurationSeconds,
      scheduledTime,
    );

    prevOrderedIndex = currOrderedIndex;
  });

   return () => {
    synth.dispose();
    setIsPlaying(false);
  };
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
