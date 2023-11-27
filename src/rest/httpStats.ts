import {Review, Stats} from "../types.ts";


export async function handleAddNewCardReview(newStats: Stats) {

    const response = await fetch("http://localhost:3000/stats", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(newStats),
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
    }

    return response.json();
}

export async function handleUpdateCardReview(review:{nextReviewDate: string, reviews: Review[]}, cardId: number) {
    const response = await fetch(`http://localhost:3000/stats/${cardId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
    });

    const result = await response.json();
    console.log("Review added:", result)
    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}
