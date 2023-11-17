export type DeckApiResponse = {
    name: string;
    cards: Card[];
}[];


export type Deck = {
    id: number,
    archive: boolean,
    name: string,
    cards: Card[]
}

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
