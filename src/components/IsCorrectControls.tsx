

interface isCorrectControlsProps {
    showAnswer: boolean,
    handleAnswer: (cardIndex: number, isCorrect: boolean, )=> void;
    currentCardIndex: number,
}

const IsCorrectControls = ({showAnswer, handleAnswer, currentCardIndex}: isCorrectControlsProps) => (


<div className="flex justify-around">
    <button
        onClick={showAnswer ?()=> handleAnswer(currentCardIndex, true ) : undefined}
        className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg shadow-green-800 ${!showAnswer ? 'opacity-30 cursor-not-allowed' : ''}`}>
        <span className="material-symbols-outlined flex items-center justify-center">task_alt</span>
    </button>
    <button
        onClick={showAnswer ? ()=>handleAnswer(currentCardIndex, false) : undefined}
        className={`hover:text-white text-black font-bold bg-red-300 hover:bg-rose-400 px-8 py-2 rounded shadow-lg shadow-red-800 ${!showAnswer ? 'opacity-30 cursor-not-allowed' : ''}`}>
                                <span
                                    className="material-symbols-outlined flex items-center justify-center">do_not_disturb_on</span>
    </button>
</div>

)

export default IsCorrectControls