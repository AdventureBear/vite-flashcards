import {Deck, Stats, Card} from "../types.ts";

// export function getNextCardUid(deck: Deck) {
//     let id: number;
//
//     if (deck.cards.length > 0) {
//         //get array of card Ids and take the Max
//         const idArray = Math.max(...deck.cards.map((card: { id: number }) => card.id || 0))
//         id = idArray + 1;
//
//     } else {
//         id = 1; // Set a default ID if the array is empty
//     }
//     return id;
// }

export function getNextCardUid(deck: Deck) {
    const existingIds = deck.cards.map((card: { id: number }) => card.id || 0);
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
    return maxId + 1;
}


export function getNextStatUid(stats: Stats[]) {
    let id: number

    if (stats.length>0) {
        const idArray = Math.max(...stats.map((stat: { id: number }) => stat.id || 0))
        id = idArray + 1;

    } else {
        id = 1; // Set a default ID if the array is empty
    }
    return id;
}

export const prepareNewDeck = (deck: { id: string; cards?: Card[] }) => {
    if (!deck) {
        return null;
    }

    const updatedCards = deck.cards?.map((card: Card) => ({
        ...card,
        reviewed: false,
        correct: false,
    }));

    return { ...deck, cards: updatedCards };
};