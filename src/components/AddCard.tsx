import {useState} from "react";
import SuccessfulAddModal from "./SuccessfulAddModal";
// import {useFlashCardState} from "../store.ts";
import {NewCard} from '../types.ts'
import {useFlashCardState} from "../store.ts";

interface AddCardModalProps {
    onClose: ()=>void,
    handleAddNewCard: (newCard: NewCard)=>void
}

const AddCardModal = ({ onClose, handleAddNewCard }: AddCardModalProps) => {
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')
    const [showConfirmAd, setShowConfirmAd] = useState(false)
    const deckName = useFlashCardState((state)=>state.deckName)

   // const showCard = useFlashCardState((state)=>state.showCard)
    // const updateShowQuiz = useFlashCardState((state)=>state.updateShowQuiz)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const newCard = {
            question,
            answer
        };

        handleAddNewCard(newCard)
        setQuestion('')
        setAnswer('')
        setShowConfirmAd(true)
        // onClose()

    }

    return (
        <>
            <div className={`bg-amber-50 p-8`}>
            <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">
                <div
                    className="bg-orange-300 w-full text-xl py-2 px-2 mb-4 rounded-xl cursor-pointer shadow-gray-500 shadow-l hover:shadow-xl hover:scale-105"
                >
                    <h2>{deckName}</h2>
                </div>
                <p className="font-bold  mb-2">
                    <span className="text-amber-100">Create New Flashcard</span>
                </p>
        <form onSubmit={handleSubmit} method="POST">
            <div className="mb-8 p-8 bg-teal-600 shadow-lg rounded-xl w-full h-full">
                <p className="font-bold  mb-2">
                    <span className="text-amber-100">Add Question:</span>
                </p>
            <label >
                <input
                    required
                    className="w-full h-16 px-4 py-2 rounded-lg border border-gray-300"
                    type="text"
                    value={question}
                    onChange={(e)=>{setQuestion(e.target.value)}}
                />
            </label>
            </div>
            <div className="mb-8 p-8 bg-teal-600 shadow-lg rounded-xl w-full h-full">
                <p className="font-bold  mb-2">
                    <span className="text-amber-100">Add Answer:</span>
                </p>
            <label>
                <input
                    required
                    className="w-full h-16 px-4 py-2 rounded-lg border border-gray-300"
                    type="text"
                    value={answer}
                    onChange={(e)=>{setAnswer(e.target.value)}}
                />
            </label>
            </div>
            <div className="flex justify-around">

                <button
                    className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg shadow-green-800`}>
                    <input type="submit" value="Add"/>
                </button>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>


            {/*<input type="submit" value="Add"/>*/}
        </form>
            </div>
            </div>

            <SuccessfulAddModal
                show = {showConfirmAd}
                closeAddCard = {onClose}
                close = {()=>{setShowConfirmAd(false)}}
            />

        </>

    );
};
export default AddCardModal;

