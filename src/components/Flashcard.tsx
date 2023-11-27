import {useFlashCardState} from "../flashCardStore.ts";
import IsCorrectControls from "./IsCorrectControls.tsx";
// import { Review} from "../types.ts";
import ReviewedCheckbox from "./ReviewedCheckbox.tsx";

import './Flashcard.css'

import {Stats} from "../types.ts";

interface FlashcardProps {
    handleAnswer: (cardIndex: number, isCorrect: boolean, )=> void;
    stats: Stats[]
}

export default function Flashcard({handleAnswer, stats }: FlashcardProps) {
    const updateShowAnswer = useFlashCardState((state)=>state.updateShowAnswer)
    const showAnswer = useFlashCardState((state)=>state.showAnswer)
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)
    const deck = useFlashCardState((state)=>state.deck)

    const cards = deck.cards
    const cardStats = stats.filter((stat: Stats) => (stat.cardId === cards[currentCardIndex].id && stat.deckId === deck.id))

    console.log("all stats: ", stats)
    console.log("Card Stats: ", deck.id, cards[currentCardIndex].id, cardStats)


    return (
        <>
            <ReviewedCheckbox  />
            <div
                className={`card ${showAnswer ? 'flipped' : ''} hover:scale-105 duration-100 hover:shadow-xl shadow-gray-900  me-2 rounded mb-4`}
                onClick={()=>updateShowAnswer(!showAnswer)}
            >
                <div className="card-inner  ">
                    <div className="card-front">
                        <p className="text-xl font-bold text-black">{cards[currentCardIndex].question}</p>
                    </div>
                    <div className="card-back">
                        <p className="text-xl font-bold text-black">{cards[currentCardIndex].answer}</p>
                    </div>
                </div>

            </div>

            <IsCorrectControls
                handleAnswer={handleAnswer}
            />

            <div>
                {!cardStats[0] ? 'This is your first review' :
                    <div>
                        <p> Your stats for this card:
                            <ul>
                                <li>Reviewed:  {cardStats[0].reviews?.length}</li>
                                <li>Correct:  {cardStats[0].reviews?.filter((review) => review.correct).length}</li>
                            </ul>
                        </p>
                    </div>
                }
            </div>


        </>

    );
}
