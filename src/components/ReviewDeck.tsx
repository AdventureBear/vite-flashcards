import Flashcard from "./Flashcard.tsx";
import {Card, Review} from '../types.ts'
import { Dispatch, SetStateAction } from "react";
import IsCorrectControls from "./IsCorrectControls.tsx";
import ProgressBar from "./ProgressBar.tsx";
import NavigationControls from "./NavigationControls.tsx";
import ReviewedCheckbox from "./ReviewedCheckbox.tsx";
import {useFlashCardState} from "../store.ts";

interface ReviewDeckProps {
    deck: Card[],
    cardIdsToReview: number[],
    // currentCardIndex: number,
    showAnswer: boolean,
    setShowAnswer: Dispatch<SetStateAction<boolean>>
    handleAnswer: (cardIndex: number, isCorrect: boolean) => void;
    progressBarWidth: string;
    handlePrev: ()=> void,
    handleNext: ()=> void,
    questionsReviewed: Review[]
}

interface QuestionNumberProps {
    decklength: number
}
const QuestionNumber = ({decklength}:QuestionNumberProps) => {
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)
    return ( <p className="font-bold  mb-2">
        <span className="text-amber-100">Question: {currentCardIndex + 1} of {decklength}</span>
    </p>)
}
const ReviewDeck = ({deck, cardIdsToReview, showAnswer, setShowAnswer, handleAnswer, progressBarWidth, handlePrev, handleNext, questionsReviewed}: ReviewDeckProps) => {
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)

    
    return (
    <>
        <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">

            <ReviewedCheckbox questionsReviewed={questionsReviewed} />

            <QuestionNumber decklength = {deck.length}/>

            {/*<p className="font-bold  mb-2">*/}
            {/*    <span className="text-amber-100">Question: {currentCardIndex + 1} of {deck.length}</span>*/}
            {/*</p>*/}

            <Flashcard
                question={deck[cardIdsToReview[currentCardIndex]]?.question || ""}
                answer={deck[cardIdsToReview[currentCardIndex]]?.answer || ""}
                showAnswer={showAnswer}
                setShowAnswer={setShowAnswer}
            />

            <IsCorrectControls
                showAnswer={showAnswer}
                handleAnswer={handleAnswer}
            />

            <ProgressBar
                deck={deck}
                progressBarWidth={progressBarWidth}
            />

            <NavigationControls
                handlePrev={handlePrev}
                handleNext={handleNext}
                deckLength={deck.length}
            />

        </div>
        </>
)};

export default ReviewDeck;