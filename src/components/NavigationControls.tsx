import {useFlashCardState} from "../flashCardStore.ts";
import './NavigationControls.css'
import {Deck} from "../types.ts";
import {useQueryClient} from "react-query";

interface NavigationControlsProps {
    handlePrev: () => void,
    handleNext: () => void,
}

interface QuestionNumberProps {
    deck: Deck
}

const QuestionNumber = ({deck}:QuestionNumberProps) => {


    const currentCardIndex = useFlashCardState((state) => state.currentCardIndex)

    return (
        <>
            <div className="font-bold  text-2xl" key={currentCardIndex}>
                <span className="text-blue-900 scroll-up-container">
                     Question: <span className="scroll-up-text"> {currentCardIndex + 1} </span> of {deck.cards.length}
                </span>
            </div>

        </>

    )
}


const NavigationControls = ({handlePrev, handleNext}: NavigationControlsProps) => {
    const currentCardIndex = useFlashCardState((state) => state.currentCardIndex)
    const deckId = useFlashCardState((state) => state.deckId)
    const queryClient = useQueryClient()
    const deck: Deck | undefined = queryClient.getQueryData(['getDeck', deckId]);

    if (!deck) return null
    return (
        <div className=" flex justify-between items-center pb-4">
            <button
                className={` text-xl font-bold bg-blue-500 text-white px-4 py-2 rounded ${currentCardIndex === 0 
                    ? 
                    'opacity-50 cursor-not-allowed' 
                    : 
                    ' hover:text-white hover:bg-blue-700'}`
            }

                onClick={handlePrev}
                disabled={currentCardIndex === 0}
            >
                Prev
            </button>

            <QuestionNumber deck={deck}/>

            <button
                className={`text-xl font-bold bg-blue-500 text-white px-4 py-2 rounded ${currentCardIndex === deck.cards.length - 1 
                    ?
                    'opacity-50 cursor-not-allowed'
                    :
                    ' hover:text-white hover:bg-blue-700'}`
            }
                onClick={handleNext}
                disabled={currentCardIndex === deck.cards.length - 1}
            >
                Next
            </button>
        </div>
    )
}


export default NavigationControls