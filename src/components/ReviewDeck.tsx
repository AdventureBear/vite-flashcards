import Flashcard from "./Flashcard.tsx";
import { Review} from '../types.ts'

import ProgressBar from "./ProgressBar.tsx";
import NavigationControls from "./NavigationControls.tsx";
// import ReviewedCheckbox from "./ReviewedCheckbox.tsx";
import {useFlashCardState} from "../store.ts";

import  Badge  from '../templates/Badge.tsx'

// interface QuestionNumberProps {
//     deckLength: number
// }
interface ReviewDeckProps {
    handleAnswer: (cardIndex: number, isCorrect: boolean) => void;
    progressBarWidth: string;
    handlePrev: ()=> void,
    handleNext: ()=> void,
    questionsReviewed: Review[]
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

            {/*<ReviewedCheckbox questionsReviewed={questionsReviewed} />*/}

            <NavigationControls
                handlePrev={handlePrev}
                handleNext={handleNext}
            />

            {/*<QuestionNumber deckLength = {deck.length as number} />*/}

            <Flashcard
                handleAnswer = {handleAnswer}
                questionsReviewed={questionsReviewed}
            />

            <ProgressBar
                deck={deck}
                progressBarWidth={progressBarWidth}
            />



            <Badge size={1} variant={2}>TEST</Badge>

        </div>
    </>
)};

export default ReviewDeck;