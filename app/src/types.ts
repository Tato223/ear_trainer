export type NaturalNote = "C" | "D" | "E" | "F" | "G" | "A" | "B"
export type AccidentalNote = `${NaturalNote}#` | `${NaturalNote}b`
export type octave = 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface Scale {
    name: string,
    NaturalNotes: NaturalNote[]
}

export interface Interval {
    value: number
}

export interface Question {
    text: string,
    isAnswered: boolean,
    options: NaturalNote[],
    correctAnswer: NaturalNote,
    selectedAnswer: NaturalNote | null
}