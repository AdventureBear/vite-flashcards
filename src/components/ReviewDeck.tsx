import Flashcard from "./Flashcard.tsx";
import {Card, Review} from '../types.ts'
import { Dispatch, SetStateAction } from "react";
import IsCorrectControls from "./IsCorrectControls.tsx";
import ProgressBar from "./ProgressBar.tsx";
import NavigationControls from "./NavigationControls.tsx";
import ReviewedCheckbox from "./ReviewedCheckbox.tsx";

interface ReviewDeckProps {
    deck: Card[],
    cardIdsToReview: number[],
    currentCardIndex: number,
    showAnswer: boolean,
    setShowAnswer: Dispatch<SetStateAction<boolean>>
    handleAnswer: (cardIndex: number, isCorrect: boolean) => void;
    cardsDone: number;
    progressBarWidth: string;
    handlePrev: ()=> void,
    handleNext: ()=> void,
    questionsReviewed: Review[]
}

const ReviewDeck = ({deck, cardIdsToReview, currentCardIndex, showAnswer, setShowAnswer, handleAnswer, cardsDone, progressBarWidth, handlePrev, handleNext, questionsReviewed}: ReviewDeckProps) => {
    console.log()
return (
    <>
        <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">

            <ReviewedCheckbox questionsReviewed={questionsReviewed} currentCardIndex={currentCardIndex}/>

            <p className="font-bold  mb-2">
                <span className="text-amber-100">Question: {currentCardIndex + 1} of {deck.length}</span>
            </p>

            <Flashcard
                question={deck[cardIdsToReview[currentCardIndex]]?.question || ""}
                answer={deck[cardIdsToReview[currentCardIndex]]?.answer || ""}
                showAnswer={showAnswer}
                setShowAnswer={setShowAnswer}
            />

            <IsCorrectControls
                showAnswer={showAnswer}
                handleAnswer={handleAnswer}
                currentCardIndex={currentCardIndex}
            />

            <ProgressBar
                cardsDone={cardsDone}
                deck={deck}
                progressBarWidth={progressBarWidth}
            />

            <NavigationControls
                currentCardIndex={currentCardIndex}
                handlePrev={handlePrev}
                handleNext={handleNext}
                deckLength={deck.length}
            />

        </div>
        </>
)};

export default ReviewDeck;