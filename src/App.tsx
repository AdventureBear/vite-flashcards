import {useEffect, useState} from 'react'
import './App.css'
const URL = "http://localhost:3000/deck"
import CompleteModal from './components/CompleteModal'
import AddCardModal from "./components/AddCard";
import { useFetch } from "../hooks/useFetch"
import FeedbackModal from "./components/FeedbackModal.tsx";

import ReviewDeck from "./components/ReviewDeck.tsx";

import {Card, Review} from './types.ts'


interface NewCard {
    question: string,
    answer: string
}



function App() {
    const [deck, setDeck] = useState<Card[]>([]);
    const [cardIdsToReview, setCardIdsToReview] = useState<number[]>([]);
    const [unrevealedCards, setUnrevealedCards] = useState<Card[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false)
    const [cardsDone, setCardsDone] = useState(0);
    const [showComplete, setShowComplete] = useState(false)
    const [showCard, setShowCard] = useState(false)
    const [showQuiz, setShowQuiz] = useState(true)
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)
    const [showFeedbackModal, setShowFeedbackModal] = useState(false)
    const [answeredCorrectly, setAnsweredCorrectly] = useState(false)  //for Feedback Modal
    const [questionsReviewed, setQuestionsReviewed] = useState<Review[]>([]);  //Array to track each question for this round reviewed and correct

    const { data, isPending, error } = useFetch(URL)


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
            console.log(data)
            setDeck(data as Card[])   //starting deck to review
            setCardIdsToReview(deck.map(card => card.id))  // creates array of card ids for this round of review
            setUnrevealedCards(data as Card[])  //initializing unreviewed cards, in case some are skipped
            let reviewedArray = data.map((x)=>{
                return {
                    id: x.id,
                    correct: null,
                    reviewed: false,
                }
            })


            setQuestionsReviewed(reviewedArray)
        }
    }, [data]);

    function checkUnreviewedCards() {
        const unreviewedCount = questionsReviewed.filter(card => !card.reviewed);
        if (unreviewedCount.length > 0) {
            return unreviewedCount
        } else {
            return null
        }
    }

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
        } else {
            setShowAnswer(false);
            if (checkUnreviewedCards()) {
                console.log("you have cards to review")
                console.log(checkUnreviewedCards())
            }
        }
    }


    const handleAnswer = (cardIndex: number, isCorrect: boolean) => {
        // if (currentCardIndex)


        if (cardsDone < deck.length) {
            if (!questionsReviewed[cardIndex].reviewed) {
                setAnsweredCorrectly(isCorrect)  //this triggers success window and message
                // setQuestionsReviewed(prev => ({...prev, [cardIndex]: true}));  //redundant, older object to track reviewed questions
                if (isCorrect) {
                    setCorrect(prev => prev + 1);
                } else {
                    setIncorrect((prev) => prev + 1)
                }
                setCardsDone(prev => prev + 1)  // to check of the round of reviewing cards is over
                updateReviewedData(currentCardIndex, true, isCorrect)
                setShowFeedbackModal(true)
            } else {
                //card has already been reviewed
                alert("You've already reviewed this card for this round")
            }
        }  else {
            setShowComplete(true)
        }
    };

    function updateReviewedData(index: number, reviewed: boolean, correct: boolean | null) {

        if (cardIdsToReview[index] !== questionsReviewed[index].id) {
            console.log("There is a mismatch between reviewed cards and the current Index")
        }
        setQuestionsReviewed(prevData => {
            // Create a copy of the array
            const updatedData = prevData.slice();

            if (index >= 0 && index < updatedData.length) {  //checking bounds, but shouldn't be an issue, as only passing existing indexes
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


    async function handleAddNewCard(newCard: NewCard) {
        try {
            // Validate the newCard object (hypothetical example)
            if (!newCard.question || !newCard.answer) {
                throw new Error('Both question and answer are required.');
            }

            // Add try-catch block around postData call
            try {
                const createdCardId = await postData(newCard);
                // Update state with the ID
                setDeck(prev => [...prev, { ...newCard, id: createdCardId }]);
                // Update review array with new placeholder
                setQuestionsReviewed(prev => [...prev, {reviewed: false, correct: null, id:createdCardId}])
            } catch (error) {
                console.error('Error during POST request:', error);
                // Handle the error, if any, specific to the POST request
            }

        } catch (error) {
            console.error('Error in handleAddNewCard:', error);
            // Handle any other error that might occur
        }
    }


    const progressBarWidth = `${(cardsDone / deck.length) * 100}%`;

        return (<>
            {isPending && <div>Loading...</div>}
            {error && <div>Error: {error} </div>}
            {data && <>

            <div className={`bg-amber-50 p-8 ${showQuiz ? 'block' : 'hidden'}`}>


                   <ReviewDeck
                       deck={deck}
                       cardIdsToReview={cardIdsToReview}
                       currentCardIndex={currentCardIndex}
                       showAnswer={showAnswer}
                       setShowAnswer={setShowAnswer}
                       handleAnswer={handleAnswer}
                       cardsDone={cardsDone}
                       progressBarWidth={progressBarWidth}
                       handleNext={handleNext}
                       handlePrev={handlePrev}
                       questionsReviewed={questionsReviewed}
                   />


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
