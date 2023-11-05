export type Card ={
    id: number,
    question: string;
    answer: string;
}

export type Review ={
    id: number,
    reviewed: boolean,
    correct: null | boolean
}

export type NewCard = {
    question: string,
    answer: string
}
