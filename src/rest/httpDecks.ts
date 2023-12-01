import {Card, Deck, NewCardApiResponse} from "../types.ts";

export async function handleAddNewDeck(name: string) {
    const response = await fetch("http://localhost:3000/decks", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            name,
            "archived": false,
            "cards": [],
        }),
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
    }

    return response.json();
}

export async function handleArchiveDeck(deckId:string, archive: boolean) {
    const response = await fetch(`http://localhost:3000/decks/${deckId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            archived: archive
        }),
    });

    const result = await response.json();
    console.log("Archived:", result.archived)
    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}


export async function handleDeleteDeck(deckId: string): Promise<boolean> {
    const response = await fetch(`http://localhost:3000/decks/${deckId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
    }

    return response.ok;
}


export async function handleAddNewCard(updatedCards: Card[], deck: Deck ):Promise<NewCardApiResponse> {
    // const nextId = getNextCardUid(deck)
    // const updatedCards = [...deck.cards, {...newCard}]

    const response = await fetch(`http://localhost:3000/decks/${deck.id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            "cards": updatedCards
        }),
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }
    console.log("add card result: ", result)
    return result;
}