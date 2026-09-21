import { Note, Scale } from "../../types";

export interface NoteLibraryEntry {
  kind: "note";
  note: Note;
  standardFrequencyHz: number;
  description: string;
  culturalReferences?: string[];
}

export interface ScaleLibraryEntry {
  kind: "scale";
  scale: Scale;
  description: string;
  culturalReferences?: string[];
}

export type LibraryEntry = NoteLibraryEntry | ScaleLibraryEntry;
export type LibraryMode = "notes" | "scales";