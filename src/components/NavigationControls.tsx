import {useFlashCardState} from "../store.ts";


interface NavigationControlsProps {

    handlePrev: ()=> void,
    handleNext: ()=> void,
    deckLength: number

}


const NavigationControls = ({handlePrev, handleNext, deckLength}: NavigationControlsProps) => {

    const currentCardIndex = useFlashCardState((state) => state.currentCardIndex)


    return (
        <div className="max-w-xl mx-auto mt-4 bg-white rounded-lg p-4 shadow-lg flex justify-between items-center">
            <button
                className={`bg-blue-500 text-white px-2 py-2 rounded ${currentCardIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                onClick={handlePrev}
                disabled={currentCardIndex === 0}
            >
                Previous
            </button>
            <p className="text-lg font-bold ml-2"><span
                className="text-blue-500">Question: {currentCardIndex + 1} of {deckLength}</span></p>
            <button
                className={`bg-blue-500 text-white px-2 py-2 rounded ${currentCardIndex === deckLength - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                onClick={handleNext}
                disabled={currentCardIndex === deckLength - 1}
            >
                Next
            </button>
        </div>
    )
}


export default NavigationControls