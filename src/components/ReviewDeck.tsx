import Flashcard from "./Flashcard.tsx";
import { Review} from '../types.ts'

import ProgressBar from "./ProgressBar.tsx";
import NavigationControls from "./NavigationControls.tsx";
import ReviewedCheckbox from "./ReviewedCheckbox.tsx";
import {useFlashCardState} from "../store.ts";

import  Badge  from '../templates/Badge.tsx'

interface QuestionNumberProps {
    deckLength: number
}
interface ReviewDeckProps {
    handleAnswer: (cardIndex: number, isCorrect: boolean) => void;
    progressBarWidth: string;
    handlePrev: ()=> void,
    handleNext: ()=> void,
    questionsReviewed: Review[]
}

const QuestionNumber = ({deckLength}: QuestionNumberProps) => {
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)

    return (
        <p className="font-bold  mb-2">
            <span className="text-amber-100">Question: {currentCardIndex + 1} of {deckLength}</span>
        </p>
    )
}
const ReviewDeck = ({ handleAnswer, progressBarWidth, handlePrev, handleNext, questionsReviewed}: ReviewDeckProps) => {
    const deck = useFlashCardState((state)=>state.deck)
    const deckName = useFlashCardState((state)=>state.deckName)

    return (
    <>

        <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">
            <div
                className="bg-orange-300 w-full text-xl py-2 px-2 mb-4 rounded-xl cursor-pointer shadow-gray-500 shadow-l hover:shadow-xl hover:scale-105"
            >
                <h2>{deckName}</h2>
            </div>

            <ReviewedCheckbox questionsReviewed={questionsReviewed} />


            <QuestionNumber deckLength = {deck.length as number} />

            <Flashcard handleAnswer = {handleAnswer}/>

            <ProgressBar
                deck={deck}
                progressBarWidth={progressBarWidth}
            />

            <NavigationControls
                handlePrev={handlePrev}
                handleNext={handleNext}
            />

            <Badge size={1} variant={2}>TEST</Badge>

        </div>
    </>
)};

export default ReviewDeck;