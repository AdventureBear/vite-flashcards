import {useFlashCardState} from "../flashCardStore.ts";
import './NavigationControls.css'

interface NavigationControlsProps {
    handlePrev: () => void,
    handleNext: () => void,
}

// interface QuestionNumberProps {
//     deckLength: number
// }

const QuestionNumber = () => {


    const deck = useFlashCardState((state) => state.deck)
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
    const deck = useFlashCardState((state) => state.deck)

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

            <QuestionNumber />

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