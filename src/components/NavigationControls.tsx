import {useFlashCardState} from "../store.ts";


interface NavigationControlsProps {
    handlePrev: ()=> void,
    handleNext: ()=> void,
}
interface QuestionNumberProps {
    deckLength: number
}
const QuestionNumber = ({deckLength}: QuestionNumberProps) => {
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)

    return (
        <p className="font-bold  mb-2">
            <span className="text-gray-500">Question: {currentCardIndex + 1} of {deckLength}</span>
        </p>
    )
}



const NavigationControls = ({handlePrev, handleNext}: NavigationControlsProps) => {
    const currentCardIndex = useFlashCardState((state) => state.currentCardIndex)
    const deck = useFlashCardState((state)=>state.deck)

    return (
        <div className="max-w-xl mx-auto mt-4 mb-2 bg-white rounded-lg p-4 shadow-lg flex justify-between items-center">
            <button
                className={`bg-blue-500 text-white px-4 py-2 rounded ${currentCardIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                onClick={handlePrev}
                disabled={currentCardIndex === 0}
            >
                Prev
            </button>

            {/*<p className="text-lg font-bold ml-2"><span*/}
            {/*    className="text-blue-500">Question: {currentCardIndex + 1} of {deck.length}</span></p>*/}

            <QuestionNumber deckLength = {deck.length as number} />

            <button
                className={`bg-blue-500 text-white px-4 py-2 rounded ${currentCardIndex === deck.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                onClick={handleNext}
                disabled={currentCardIndex === deck.length - 1}
            >
                Next
            </button>
        </div>
    )
}


export default NavigationControls