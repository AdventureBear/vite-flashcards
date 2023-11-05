import Flashcard from "./Flashcard.tsx";
import {Card, Review} from '../types.ts'
import IsCorrectControls from "./IsCorrectControls.tsx";
import ProgressBar from "./ProgressBar.tsx";
import NavigationControls from "./NavigationControls.tsx";
import ReviewedCheckbox from "./ReviewedCheckbox.tsx";
import {useFlashCardState} from "../store.ts";
import {useEffect, useState} from "react";

interface ReviewDeckProps {
    handleAnswer: (cardIndex: number, isCorrect: boolean) => void;
    progressBarWidth: string;
    handlePrev: ()=> void,
    handleNext: ()=> void,
    questionsReviewed: Review[]
}

const QuestionNumber = () => {
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)
    const deckLength = useFlashCardState((state)=>state.deckLength)

    return ( <p className="font-bold  mb-2">
        <span className="text-amber-100">Question: {currentCardIndex + 1} of {deckLength}</span>
    </p>)
}
const ReviewDeck = ({ handleAnswer, progressBarWidth, handlePrev, handleNext, questionsReviewed}: ReviewDeckProps) => {
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)
    const deck = useFlashCardState((state)=>state.deck)
    const cardsToReview = useFlashCardState((state)=>state.cardsToReview)
    console.log ( deck, currentCardIndex, cardsToReview)


    return (
    <>


        <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">
            <ReviewedCheckbox questionsReviewed={questionsReviewed} />

            <QuestionNumber />

            <Flashcard
                question =   {deck.find(card=> card.id === cardsToReview[currentCardIndex])?.question}
                answer =     {deck.find(card=> card.id === cardsToReview[currentCardIndex])?.answer }
            />

            <IsCorrectControls
                handleAnswer={handleAnswer}
            />

            <ProgressBar
                deck={deck}
                progressBarWidth={progressBarWidth}
            />

            <NavigationControls
                handlePrev={handlePrev}
                handleNext={handleNext}
            />

        </div>
        </>
)};

export default ReviewDeck;