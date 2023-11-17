// import { NewCard }  from "../types.ts"

export async function createFlashCard(newCard, deckName, jsonData) {

    const updatedDecks = jsonData.decks.map((deck) => {
        if (deck.name === deckName) {
            // Create a new deck object with the updated cards array
            return {
                ...deck,
                cards: [...deck.cards, newCard],
            };
        }
        return deck; // Return unchanged deck if it's not the one to update
    });

    const response = await fetch("http://localhost:3000/decks", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            updatedDecks
        }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }
    return result;
}
