import {useState} from "react";
// const URL = "http://localhost:3000/deck"
import SuccessfulAddModal from "./SuccessfulAddModal";
import {useFlashCardState} from "../store.ts";

interface Card {
    question: string;
    answer: string;
    postData: (arg0: Card)=>Promise<void>;
}


interface AddCardModalProps {
    // show: boolean,
    onClose: ()=>void,
    // setShowQuiz: (arg0: boolean)=>void,
    handleAddNewCard: (arg0: Card)=>void
}
const AddCardModal = ({ onClose, handleAddNewCard }: AddCardModalProps) => {
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')
    const [showConfirmAd, setShowConfirmAd] = useState(false)

   const showCard = useFlashCardState((state)=>state.showCard)
    // const updateShowQuiz = useFlashCardState((state)=>state.updateShowQuiz)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const newCard = {
            question,
            answer
        };
        handleAddNewCard(newCard as Card)
        setQuestion('')
        setAnswer('')
        setShowConfirmAd(true)
        // onClose()

    }

    return (
        <>
            <div className={`bg-amber-50 p-8 ${showCard ? 'block' : 'hidden'}`}>
            <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">
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
                // setShowQuiz={setShowQuiz}
                closeAddCard = {onClose}
                close = {()=>{setShowConfirmAd(false)}}
            />

        </>

    );
};
export default AddCardModal;

