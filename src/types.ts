
export type Deck = {
    id: string,
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


export type NewCard = {
    question: string;
    answer: string;
};

export type NewCardApiResponse = {
    id: string,
    question: string;
    answer: string;
};
