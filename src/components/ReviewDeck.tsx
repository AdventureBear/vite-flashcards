import Flashcard from "./Flashcard.tsx";
// import { Review} from '../types.ts'

import ProgressBar from "./ProgressBar.tsx";
import NavigationControls from "./NavigationControls.tsx";
// import ReviewedCheckbox from "./ReviewedCheckbox.tsx";
import {useFlashCardState} from "../flashCardStore.ts";

import  Badge  from '../templates/Badge.tsx'
import {Stats} from "../types.ts";

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
    const deck = useFlashCardState((state)=>state.deck)
    // const deckName = useFlashCardState((state)=>state.deckName)

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
                handleAnswer = {handleAnswer}
                stats={stats}
            />

            </div>

            <ProgressBar
                cards={deck.cards}
            />



            <Badge size={1} variant={2}>TEST</Badge>

        {/*</div>*/}
    </>
)};

export default ReviewDeck;