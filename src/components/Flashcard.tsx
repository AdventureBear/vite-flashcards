import {useFlashCardState} from "../store.ts";
import IsCorrectControls from "./IsCorrectControls.tsx";
import { Review} from "../types.ts";
import ReviewedCheckbox from "./ReviewedCheckbox.tsx";

import './Flashcard.css'

interface FlashcardProps {
    handleAnswer: (cardIndex: number, isCorrect: boolean, )=> void;
    questionsReviewed: Review[]
}

export default function Flashcard({handleAnswer, questionsReviewed}: FlashcardProps) {
    const updateShowAnswer = useFlashCardState((state)=>state.updateShowAnswer)
    const showAnswer = useFlashCardState((state)=>state.showAnswer)
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)
    const deck = useFlashCardState((state)=>state.deck)
    const cards = deck.cards
    // const cardsToReview = useFlashCardState((state)=>state.cardsToReview)

    // const question =  deck.find(card=> card.id === cardsToReview[currentCardIndex])?.question
    // const answer =  deck.find(card=> card.id === cardsToReview[currentCardIndex])?.answer

    return (
        <>
                <ReviewedCheckbox questionsReviewed={questionsReviewed} />
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


        </>

    );
}
