import {useFlashCardState} from "../store.ts";

function CompleteModal() {

    const updateShowComplete = useFlashCardState((state)=> state.updateShowComplete)
    const deck = useFlashCardState((state)=> state.deck)

    const correct = deck.cards.filter((card) => card.correct).length
    const incorrect = deck.cards.filter((card) => !card.correct).length

    return (
        <div className={`fixed inset-0 flex items-center justify-center`}>
            <div className="bg-white rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Great Job, you're a rockstar!</h2>

                <p className="flex justify-center text-lg mb-4">Correct: {correct}, Incorrect: {incorrect}</p>
                <button className="bg-teal-300 text-black px-4 py-2 rounded" onClick={()=>{console.log("saving stats")}}>Save Stats</button>

                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=> updateShowComplete(false)}>Close</button>
            </div>
        </div>
    );
}

export default CompleteModal