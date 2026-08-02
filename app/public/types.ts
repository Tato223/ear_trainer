export type NaturalNote = "C" | "D" | "E" | "F" | "G" | "A" | "B"
export type AccidentalNote = `${NaturalNote}#` | `${NaturalNote}b`

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
    //answer: NaturalNote | Scale | Interval
}