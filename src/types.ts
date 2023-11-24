export type DeckApiResponse = {
    name: string;
    cards: Card[];
}[];


export type Deck = {
    id: number,
    archived: boolean,
    name: string,
    cards: Card[]
}

export type Card ={
    id: number,
    question: string;
    answer: string;
    reviewed: boolean;
    correct: boolean;
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
