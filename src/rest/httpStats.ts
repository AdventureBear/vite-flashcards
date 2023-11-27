import { Stats} from "../types.ts";

export function getCardStats(deckId: string, cardId: number, allStats: Stats[]) {
    const stat = allStats.filter((stat: Stats) => (stat.deckId === deckId && stat.cardId === cardId))
    console.log("Stat: ", stat)
    const numReviews = stat.length
    console.log("Reviews, ", numReviews)
    // const numCorrect = stat.reviews.filter((review: Review) => review.correct).length
    // console.log(numReviews, numCorrect)
}