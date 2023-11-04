import Flashcard from "./Flashcard.tsx";
import {Card} from '../App.tsx'
import { Dispatch, SetStateAction } from "react";

interface ReviewDeckProps {
    deck: Card[],
    cardIdsToReview: number[],
    currentCardIndex: number,
    showAnswer: boolean,
    setShowAnswer: Dispatch<SetStateAction<boolean>>
}

const ReviewDeck = ({deck, cardIdsToReview, currentCardIndex, showAnswer, setShowAnswer}: ReviewDeckProps) => {
    console.log()
return (
    <Flashcard
        question={deck[cardIdsToReview[currentCardIndex]]?.question || ""}
        answer={deck[cardIdsToReview[currentCardIndex]]?.answer || ""}
        showAnswer={showAnswer}
        setShowAnswer={setShowAnswer}
    />
)};

export default ReviewDeck;