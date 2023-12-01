import Flashcard from "./Flashcard.tsx";
// import { Review} from '../types.ts'

import ProgressBar from "./ProgressBar.tsx";
import NavigationControls from "./NavigationControls.tsx";
// import ReviewedCheckbox from "./ReviewedCheckbox.tsx";

import  Badge  from '../templates/Badge.tsx'
import {Deck, Stats} from "../types.ts";
import {useQueryClient} from "react-query";
import {useFlashCardState} from "../flashCardStore.ts";

// interface QuestionNumberProps {
//     deckLength: number
// }
interface ReviewDeckProps {
    handleAnswer: (cardIndex: number, isCorrect: boolean) => void,
    handlePrev: ()=> void,
    handleNext: ()=> void,
    stats: Stats[]
}


const ReviewDeck = ({ stats, handleAnswer, handlePrev, handleNext }: ReviewDeckProps) => {
    // const deck = useFlashCardState((state)=>state.deck)
    const deckId = useFlashCardState((state)=>state.deckId)
    const inReviewData = useFlashCardState((state)=>state.inReviewData)
    const queryClient = useQueryClient()
    const deck: Deck | undefined = queryClient.getQueryData(['getDeck', deckId]);
    // console.log(deck)

    // function saveStats() {
    //     deck.cards.forEach((card) => {
    //         //let newStat = {}
    //         let newReviews = []
    //         const cardStats = stats.filter((stat: Stats) => (stat.cardId === card.id && stat.deckId === deck.id))
    //         if (cardStats) {
    //             newReviews = cardStats[0].reviews
    //             const reviewToAdd = {
    //                 deckId: deck.id,
    //                 cardId: card.id,
    //                 reviews: [...newReviews, {
    //                     date: new Date(),
    //                     correct: card.correct,
    //                     confidence: 3
    //                 }]
    //             }
    //             console.log(reviewToAdd)
    //         } else {
    //             console.log("new stat to save")
    //         }
    //     })
    // }



    if (!deck) return null
    console.log(inReviewData)
    return (
                <>

                    <div className="bg-white p-8 font-extrabold text-2xl mb-2">

                        <h2>{deck.name}</h2>
                    </div>

                    <div className="mb-8 px-8 py-4 bg-indigo-200 shadow-lg rounded-xl">

                        <NavigationControls
                            handlePrev={handlePrev}
                            handleNext={handleNext}
                        />


                        <Flashcard
                            deck={deck}
                            handleAnswer={handleAnswer}
                            stats={stats}
                        />

                    </div>

                    <ProgressBar
                        deck={deck}
                    />


                    <Badge size={1} variant={2}>TEST</Badge>

                    {/*</div>*/}
                </>

    )
};

export default ReviewDeck