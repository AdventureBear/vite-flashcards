import {useEffect, useState} from 'react'
import './App.css'
import Flashcard from "./components/Flashcard";
const URL = "http://localhost:3000/deck"
import CompleteModal from './components/CompleteModal'
import AddCardModal from "./components/AddCard";
import { useFetch } from "../hooks/useFetch"
import FeedbackModal from "./components/FeedbackModal.tsx";
interface Card {
    // id: number | undefined,
    question: string;
    answer: string;
}


function App() {
    const [deck, setDeck] = useState<Card[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false)
    const [cardsDone, setCardsDone] = useState(0);
    const [showComplete, setShowComplete] = useState(false)
    const [showCard, setShowCard] = useState(false)
    const [showQuiz, setShowQuiz] = useState(true)
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)
    const [showFeedbackModal, setShowFeedbackModal] = useState(false)
    const [answeredCorrectly, setAnsweredCorrectly] = useState(false)
    const [questionsReviewed, setQuestionsReviewed] = useState<{ reviewed: boolean; correct: boolean | null }[]>([]);

    const { data, isPending, error } = useFetch(URL)

    console.log(questionsReviewed)

    const { postData, data: _postRequest, error: _postError } = useFetch(URL, "POST")

    useEffect(() => {
        setCurrentCardIndex(0)
    }, [deck]);

    useEffect(() => {
        if (deck.length>0 && cardsDone===deck.length){
            setShowComplete(true)
        }
    }, [cardsDone, deck.length]);

    useEffect(() => {

        if (data) {
            setDeck(data)
            let reviewedArray = data.map((_card)=>{
                return {
                    reviewed: false,
                    correct: null
                }
            })
            setQuestionsReviewed(reviewedArray)

        }
    }, [data]);



    function handlePrev() {
        if (currentCardIndex > 0) {
            setShowAnswer(false);
            setCurrentCardIndex(currentCardIndex - 1);
        }
    }

    function handleNext() {
        if (currentCardIndex < deck.length - 1) {
            setShowAnswer(false);
            setCurrentCardIndex(currentCardIndex + 1);
        }
    }



    function handleCorrect() {
        if (cardsDone < deck.length) {
            setCorrect((prev) => prev + 1)
            setAnsweredCorrectly(true)
            setCardsDone(cardsDone + 1);
            setShowFeedbackModal(true)
            updateReviewedData(currentCardIndex, true, true)
            // handleNext()
        } else {
            setShowComplete(true)
        }
    }


    function updateReviewedData(index: number, reviewed: boolean, correct: boolean | null) {
        setQuestionsReviewed(prevData => {
            // Create a copy of the array
            const updatedData = prevData.slice();

            if (index >= 0 && index < updatedData.length) {
                // Update reviewed and correct properties
                updatedData[index] = {
                    ...updatedData[index],
                    reviewed,
                    correct,
                };
            }

            return updatedData;
        });
    }

    function handleIncorrect() {
        if (cardsDone < deck.length) {
            setIncorrect((prev) => prev + 1)
            setAnsweredCorrectly(false)
            setCardsDone(cardsDone + 1);
            setShowFeedbackModal(true)
            updateReviewedData(currentCardIndex, true, false)
            // handleNext()
        } else {
            setShowComplete(true)
        }
    }


    function handleAddNewCard(card: Card) {
        console.log(card)
        //add to db
        postData(card)

        //update state
        setDeck((prev)=>[...prev, card])

    }


        const progressBarWidth = `${(cardsDone / deck.length) * 100}%`;

        return (<>

            {isPending && <div>Loading...</div>}
            {error && <div>Error: {error} </div>}
            {data && <>
            <div className={`bg-amber-50 p-8 ${showQuiz ? 'block' : 'hidden'}`}>
                <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">

                    {/* Checkbox for indicating if the question was reviewed */}
                    <div className="mb-4 flex items-center">
                        <label className="inline-flex items-center">
                            <input type="checkbox" readOnly checked={questionsReviewed[currentCardIndex]? questionsReviewed[currentCardIndex].reviewed: false} className="form-checkbox h-5 w-5 text-teal-600" />
                            <span className="ml-2 text-white">Reviewed</span>
                        </label>
                    </div>

                    <p className="font-bold  mb-2"><span
                        className="text-amber-100">Question: {currentCardIndex + 1} of {deck.length}
                    </span></p>

                    <Flashcard
                        question={deck[currentCardIndex]?.question || ""}
                        answer={deck[currentCardIndex]?.answer || ""}
                        showAnswer={showAnswer}
                        setShowAnswer={setShowAnswer}
                    />

                    <div className="flex justify-around">
                        <button
                            onClick={showAnswer ? handleCorrect : undefined}
                            className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg shadow-green-800 ${!showAnswer ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <span className="material-symbols-outlined flex items-center justify-center">task_alt</span>
                        </button>
                        <button
                            onClick={showAnswer ? handleIncorrect : undefined}
                            className={`hover:text-white text-black font-bold bg-red-300 hover:bg-rose-400 px-8 py-2 rounded shadow-lg shadow-red-800 ${!showAnswer ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <span
                                className="material-symbols-outlined flex items-center justify-center">do_not_disturb_on</span>
                        </button>
                    </div>
                </div>


                <div className="max-w-xl mx-auto mt-4 bg-gray-500 rounded-lg p-4 shadow-lg flex justify-between items-center">
                    <div>
                        <p className="text-lg font-bold ml-2"><span
                            className="text-amber-100 mr-2">Reviewed:</span>
                        </p>
                    </div>
                    <div className="flex-1">
                        <div className="bg-gray-600 h-4 rounded-full ">
                            <div className="bg-teal-500 h-full rounded-full " style={{width: progressBarWidth}}></div>
                        </div>
                    </div>
                    <div>
                        <p className="text-lg font-bold ml-2"><span
                            className="text-amber-100">{cardsDone}</span> / {deck.length}
                        </p>
                    </div>
                </div>


                {/* Previous and Next Buttons */}
                <div className="max-w-xl mx-auto mt-4 bg-white rounded-lg p-4 shadow-lg flex justify-between items-center">
                    <button
                        className={`bg-blue-500 text-white px-2 py-2 rounded ${currentCardIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        onClick={handlePrev}
                        disabled={currentCardIndex === 0}
                    >
                        Previous
                    </button>
                    <p className="text-lg font-bold ml-2"><span
                        className="text-blue-500">Question: {currentCardIndex + 1} of {deck.length}</span></p>
                    <button
                        className={`bg-blue-500 text-white px-2 py-2 rounded ${currentCardIndex === deck.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        onClick={handleNext}
                        disabled={currentCardIndex === deck.length - 1}
                    >
                        Next
                    </button>
                </div>

                <button
                    className="mt-8 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={()=>{
                        setShowCard(true)
                        setShowQuiz(false)
                    }
                }
                    >Add New Question
                </button>
            </div>



            {/* Add Modal */}
            <AddCardModal
                handleAddNewCard = {handleAddNewCard}
               setShowQuiz={setShowQuiz}
                show={showCard}
                onClose={() => {
                    setShowQuiz(true)
                    setShowCard(false)
                }}

            />

                <FeedbackModal
                    show = {showFeedbackModal}
                    close = {()=>{setShowFeedbackModal(false)}}
                    handleNext =  {handleNext}
                    answeredCorrectly = {answeredCorrectly}
                />

            {/* Complete Modal */}
            <CompleteModal
                show={showComplete}
                onClose={() => {
                    setShowComplete(false)
                }}
                correct={correct}
                incorrect={incorrect}
            />
            </>

            }
        </>
)

}
export default App
