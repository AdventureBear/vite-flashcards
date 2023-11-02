import {useEffect, useState} from 'react'
import './App.css'
import Flashcard from "./components/Flashcard";
const URL = "http://localhost:3000/deck"
import CompleteModal from './components/CompleteModal'
import AddCardModal from "./components/AddCard";
import { useFetch } from "../hooks/useFetch"
interface Card {
    question: string;
    answer: string;
}



//  async function getData(URL: string, method: string): Promise<Card[]>  {
//     const response = await fetch(URL, {
//         method: method
//     });
//     const data = await response.json();
//     console.log(data);
//     return data as Card[]
// }

// const postData = async (cardData: Card): Promise<Card[]> => {
//     return fetch(URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(cardData)
//     })
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error(`HTTP error! status: ${res.status}`);
//             }
//             return res.json();
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             throw new Error('Error sending data to server');
//         });
//     // setDeck((prev) => [...prev, card])
// }

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

    useEffect(() => {
        setCurrentCardIndex(0)
    }, [deck]);

    useEffect(() => {

        if (deck.length>0 && cardsDone===deck.length){
            setShowComplete(true)
        }
    }, [cardsDone, deck.length]);


    const { data: deck , isPending, error} = useFetch('http://localhost:3000/events')

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedData: Card[] = await getData(URL, 'GET')
                setDeck(fetchedData)
            } catch(error) {
                console.error('Error:', error)
            }
        }
        fetchData()
    }, []);

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
            setCardsDone(cardsDone + 1);
            handleNext()
        } else {
            setShowComplete(true)
        }
    }

    function handleIncorrect() {


        if (cardsDone < deck.length) {
            setIncorrect((prev) => prev - 1)
            setCardsDone(cardsDone + 1);
            handleNext()
        } else {
            setShowComplete(true)
        }
    }

    async function handleAddCard(card: Card): Promise<void> {
        try {
            await postData(card);
            setDeck((prev) => [...prev, card])
        } catch (error) {
            console.error('Error:', error);
        }
    }
        const progressBarWidth = `${(cardsDone / deck.length) * 100}%`;

        return (<>
            <div className={`bg-amber-50 p-8 ${showQuiz ? 'block' : 'hidden'}`}>
                <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">
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
                            onClick={handleCorrect}
                            className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg shadow-green-800 ${!showAnswer ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <span className="material-symbols-outlined flex items-center justify-center">task_alt</span>
                        </button>
                        <button
                            onClick={handleIncorrect}
                            className={`hover:text-white text-black font-bold bg-red-300 hover:bg-rose-400 px-8 py-2 rounded shadow-lg shadow-red-800 ${!showAnswer ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <span
                                className="material-symbols-outlined flex items-center justify-center">do_not_disturb_on</span>
                        </button>
                    </div>
                </div>


                <div
                    className="max-w-xl mx-auto mt-4 bg-gray-500 rounded-lg p-4 shadow-lg flex justify-between items-center">
                    <div>
                        <p className="text-lg font-bold ml-2"><span
                            className="text-amber-100 mr-2">Answered:</span>
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
                <div
                    className="max-w-xl mx-auto mt-4 bg-white rounded-lg p-4 shadow-lg flex justify-between items-center">
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
               addCard={handleAddCard}
               setShowQuiz={setShowQuiz}
                show={showCard}
                onClose={() => {
                    setShowQuiz(true)
                    setShowCard(false)
                }}
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




        </>)

}
export default App
