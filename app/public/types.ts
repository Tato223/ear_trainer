export interface Note {
    name: string,
    pitch: string,
    
}

export interface Scale {
    name: string,
    notes: Note[]
}

export interface Interval {
    value: number
}

export interface Question {
    text: string,
    isAnswered: boolean,
    options: Note[] | Scale[] | Interval,
    answer: Note | Scale | Interval
}