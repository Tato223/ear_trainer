import { NoteLibraryEntry } from "./library_types";
import { ScaleLibraryEntry } from "./library_types";
import {
  C_Major_Scale,
  G_Major_Scale,
  D_Major_Scale,
  A_Major_Scale,
  B_Major_Scale,
  Bb_Major_Scale,
  Db_Major_Scale,
  E_Major_Scale,
  Eb_Major_Scale,
  FSharp_Major_Scale,
  F_Major_Scale,
  Ab_Major_Scale,
} from "../../types";

export const noteLibrary: NoteLibraryEntry[] = [
  {
    kind: "note",
    note: "C",
    standardFrequencyHz: 261.63,
    description:
      "Middle C (C4) is the most commonly referenced pitch in music notation and education, often used as the anchor point for teaching the grand staff.",
    culturalReferences: [
      "Reference point for piano keyboard layout",
      "Common starting pitch in beginner music instruction",
    ],
  },

  {
    kind: "note",
    note: "C#",
    displayName: "C# / Db",
    standardFrequencyHz: 277.18,
    description:
      "Sitting between C and D, this note is the tonic of Db Major (five flats) and appears as the third scale degree in A Major.",
    culturalReferences: ["Common key center in jazz piano voicings (Db Major)"],
  },

  {
    kind: "note",
    note: "D",
    standardFrequencyHz: 293.66,
    description:
      "D sits a whole step above C and is the tonic of one of the most guitar- and violin-friendly keys, due to its relationship with common open strings.",
    culturalReferences: ["Common open string on violin and guitar"],
  },

  {
    kind: "note",
    note: "D#",
    displayName: "D# / Eb",
    standardFrequencyHz: 311.13,
    description:
      "This pitch is most often spelled Eb in practice, serving as the tonic of Eb Major and a frequent transposition target for saxophone and clarinet parts.",
    culturalReferences: [
      "Common concert-band and jazz-horn key center (Eb Major)",
    ],
  },

  {
    kind: "note",
    note: "E",
    standardFrequencyHz: 329.63,
    description:
      "E is the pitch of the guitar's highest and lowest open strings in standard tuning, making it foundational to guitar-based music.",
    culturalReferences: [
      "Standard tuning open string (both low E and high E) on guitar",
    ],
  },
  {
    kind: "note",
    note: "F",
    standardFrequencyHz: 349.23,
    description:
      "F is the tonic of the only major scale requiring a single flat (Bb), placing it just one step removed from C major in the circle of fifths.",
    culturalReferences: ["Adjacent to C major on the circle of fifths"],
  },

  {
    kind: "note",
    note: "F#",
    displayName: "F# / Gb",
    standardFrequencyHz: 369.99,
    description:
      "Roughly the midpoint of the chromatic scale from C, this note anchors F# Major (six sharps) and its enharmonic twin, Gb Major (six flats) — the only major key pair with an equal number of accidentals on both sides.",
    culturalReferences: [
      "Tritone relationship to C, the most harmonically distant interval",
    ],
  },

  {
    kind: "note",
    note: "G",
    standardFrequencyHz: 392.0,
    description:
      "G is a common open string on both the guitar and violin, and the tonic of G major, one of the most frequently used keys in folk and rock music.",
    culturalReferences: ["Common open string on guitar and violin"],
  },

  {
    kind: "note",
    note: "G#",
    displayName: "G# / Ab",
    standardFrequencyHz: 415.3,
    description:
      "Typically spelled Ab in practice, this note is the tonic of Ab Major, a key favored in jazz and gospel piano for its warm, rounded tonal color.",
    culturalReferences: ["Common jazz and gospel piano key center (Ab Major)"],
  },

  {
    kind: "note",
    note: "A",
    standardFrequencyHz: 440.0,
    description:
      "A4 is the standard tuning reference pitch for most Western instruments and orchestras, defined internationally as 440 Hz.",
    culturalReferences: [
      "Standard orchestral tuning pitch (concert pitch, ISO 16)",
    ],
  },

  {
    kind: "note",
    note: "A#",
    displayName: "A# / Bb",
    standardFrequencyHz: 466.16,
    description:
      "Almost always spelled Bb in practice, this note is the tonic of Bb Major and the home key for many transposing brass instruments, including the trumpet and clarinet.",
    culturalReferences: [
      "Home concert pitch for many transposing brass and woodwind instruments",
    ],
  },

  {
    kind: "note",
    note: "B",
    standardFrequencyHz: 493.88,
    description:
      "B sits a half step below C, making it the leading tone in C major — the note that creates the strongest pull back to resolve to the tonic.",
    culturalReferences: ["Leading tone in the key of C major"],
  },
];

export const scaleLibrary: ScaleLibraryEntry[] = [
  {
    kind: "scale",
    scale: C_Major_Scale,
    description:
      "C Major is the only major scale with no sharps or flats, making it the standard starting point for music theory and the easiest scale to visualize on a piano (all white keys).",
  },
  {
    kind: "scale",
    scale: G_Major_Scale,
    description:
      "G Major contains one sharp (F#) and is a highly guitar-friendly key thanks to open strings, making it common in folk, country, and rock music.",
  },
  {
    kind: "scale",
    scale: D_Major_Scale,
    description:
      "D Major contains two sharps (F#, C#) and is a favored key for string instruments like violin, since D and A are both open strings.",
  },
  {
    kind: "scale",
    scale: A_Major_Scale,
    description:
      "A Major contains three sharps (F#, C#, G#) and is commonly used in guitar and brass music, sitting comfortably in many instruments' natural ranges.",
  },
  {
    kind: "scale",
    scale: E_Major_Scale,
    description:
      "E Major contains four sharps (F#, C#, G#, D#) and is a common key for guitar-driven rock music due to its relationship with the open low E string.",
  },
  {
    kind: "scale",
    scale: B_Major_Scale,
    description:
      "B Major contains five sharps (F#, C#, G#, D#, A#) and, while less common than its neighbors, appears in classical and jazz repertoire requiring brighter tonal color.",
  },
  {
    kind: "scale",
    scale: FSharp_Major_Scale,
    description:
      "F# Major contains six sharps and sits at the midpoint of the circle of fifths, enharmonically equivalent to Gb Major depending on notational context.",
  },
  {
    kind: "scale",
    scale: Db_Major_Scale,
    description:
      "Db Major contains five flats and is a common key for piano-centric ballads, since its scale maps comfortably onto the piano's black keys.",
  },
  {
    kind: "scale",
    scale: Ab_Major_Scale,
    description:
      "Ab Major contains four flats and is frequently used in jazz and gospel piano music for its warm tonal quality.",
  },
  {
    kind: "scale",
    scale: Eb_Major_Scale,
    description:
      "Eb Major contains three flats and is a standard key for brass and wind instruments, particularly common in concert band repertoire.",
  },
  {
    kind: "scale",
    scale: Bb_Major_Scale,
    description:
      "Bb Major contains two flats and is the home key for many transposing brass instruments, making it one of the most frequently played keys in concert band music.",
  },
  {
    kind: "scale",
    scale: F_Major_Scale,
    description:
      "F Major contains a single flat (Bb) and sits just one step from C major on the circle of fifths, making it a common early modulation target in beginner repertoire.",
  },
];
