import {Note, Interval, Scale, Question} from './types';


function createQuestion(text: string, options: Note[] | Scale[] | Interval, answer: Note | Scale | Interval): Question {
    return {
        text,
        isAnswered: false,
        options,
        answer
    }
}