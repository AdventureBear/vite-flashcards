import {useFlashCardState} from "../flashCardStore.ts";


interface isCorrectControlsProps {
    handleAnswer: (cardIndex: number, isCorrect: boolean, )=> void;

}

const IsCorrectControls = ({ handleAnswer}: isCorrectControlsProps) => {
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)
    const showAnswer = useFlashCardState((state)=>state.showAnswer)
    const updateShowAnswer = useFlashCardState((state)=>state.updateShowAnswer)

    return (

        <div className="flex justify-around">
            <button
                onClick={showAnswer ? () => handleAnswer(currentCardIndex, true) : undefined}
                className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 py-2 px-8  rounded shadow-lg shadow-green-800 ${!showAnswer ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <span className="material-symbols-outlined flex items-center justify-center">task_alt</span>
            </button>

            <button className={`bg-blue-500 text-xl py-2 px-4 font-bold hover:bg-blue-700 w-60 text-white rounded shadow-lg ${showAnswer ? 'opacity-50' : ''}`}
                    onClick={()=>{updateShowAnswer( !showAnswer)}}
            >{showAnswer? "Show Question" : "Show Answer"}
            </button>

            <button
                onClick={showAnswer ? () => handleAnswer(currentCardIndex, false) : undefined}
                className={`hover:text-white text-black font-bold bg-red-300 hover:bg-rose-400 py-2 px-8  rounded shadow-lg shadow-red-800 ${!showAnswer ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <span className="material-symbols-outlined flex items-center justify-center">do_not_disturb_on</span>
            </button>
        </div>

    )
}

export default IsCorrectControls