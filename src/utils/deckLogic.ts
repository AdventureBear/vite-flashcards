import {Deck} from "../types.ts";

export function getNextCardUid(deck: Deck) {
    let id: number;

    if (deck.cards.length > 0) {
        const thisThing = deck.cards.map((card: { id: number }) => card.id || 0)
        console.log(thisThing)
        const idArray = Math.max(...deck.cards.map((card: { id: number }) => card.id || 0))
        id = idArray + 1;

    } else {
        id = 1; // Set a default ID if the array is empty
    }
    return id;
}