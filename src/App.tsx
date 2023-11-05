//React
import {useEffect, useState} from 'react'

//Data
const URL = "http://localhost:3000/deck"

//Components
import CompleteModal from './components/CompleteModal'
import AddCardModal from "./components/AddCard";
import { useFetch } from "../hooks/useFetch"
import FeedbackModal from "./components/FeedbackModal.tsx";
import ReviewDeck from "./components/ReviewDeck.tsx";

//Style
import './App.css'

//Types
import {Card, Review} from './types.ts'

//State Management
import  { useFlashCardState } from "./store.ts";

//Interfaces
interface NewCard {
    question: string,
    answer: string
}


function App() {
    const [deck, setDeck] = useState<Card[]>([]);
    const [cardIdsToReview, setCardIdsToReview] = useState<number[]>([]);
    const [unrevealedCards, setUnrevealedCards] = useState<Card[]>([]);
    const [questionsReviewed, setQuestionsReviewed] = useState<Review[]>([]);  //Array to track each question for this round reviewed and correct
    const { data, isPending, error } = useFetch(URL)
    const { postData, data: _postRequest, error: _postError } = useFetch(URL, "POST")

    //Zustand State Management
    const increaseCorrect = useFlashCardState((state)=>state.increaseCorrect)
    const increaseIncorrect = useFlashCardState((state)=>state.increaseIncorrect)
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)
    const changeCurrentCardIndex = useFlashCardState((state)=>state.changeCurrentCardIndex)
    const resetCurrentCardIndex = useFlashCardState((state)=>state.resetCurrentCardIndex)
    const cardsDone = useFlashCardState((state)=>state.cardsDone)
    const increaseCardsDone = useFlashCardState((state)=>state.increaseCardsDone)
    const updateShowAnswer = useFlashCardState((state)=>state.updateShowAnswer)
    const updateShowComplete = useFlashCardState((state)=>state.updateShowComplete)
    const updateShowCard = useFlashCardState((state)=>state.updateShowCard)
    const updateDeckLength = useFlashCardState((state)=>state.updateDeckLength)
    const showQuiz = useFlashCardState((state)=>(state.showQuiz))
    const updateShowQuiz = useFlashCardState((state)=>(state.updateShowQuiz))
    const updateShowFeedbackModal = useFlashCardState((state)=>state.updateShowFeedbackModal)
    const updateAnsweredCorrectly = useFlashCardState((state) =>state.updateAnsweredCorrectly )

    useEffect(() => {
        resetCurrentCardIndex()
        updateDeckLength(deck.length)
    }, [deck]);

    useEffect(() => {
 if (deck.length>0 && cardsDone===deck.length){
            updateShowComplete(true)
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
            // setShowAnswer(false);
            updateShowAnswer(false)
            // setCurrentCardIndex(currentCardIndex - 1);
            changeCurrentCardIndex(-1)
        }
    }

    function handleNext() {
        if (currentCardIndex < deck.length - 1) {
            updateShowAnswer(false)
            changeCurrentCardIndex(1)
        } else {
            updateShowAnswer(false)
            if (checkUnreviewedCards()) {
                console.log("you have cards to review")
                console.log(checkUnreviewedCards())
            }
        }
    }


    const handleAnswer = (cardIndex: number, isCorrect: boolean) => {

        if (cardsDone < deck.length) {
            if (!questionsReviewed[cardIndex].reviewed) {
                updateAnsweredCorrectly(isCorrect)  //this triggers success window and message
                if (isCorrect) {
                    increaseCorrect()
                } else {
                    increaseIncorrect()
                }
                increaseCardsDone()
                updateReviewedData(currentCardIndex, true, isCorrect)
                updateShowFeedbackModal(true)
            } else {
                //card has already been reviewed
                alert("You've already reviewed this card for this round")
            }
        }  else {
            updateShowComplete(true)
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
                       handleAnswer={handleAnswer}
                       progressBarWidth={progressBarWidth}
                       handleNext={handleNext}
                       handlePrev={handlePrev}
                       questionsReviewed={questionsReviewed}
                   />


                <button
                    className="mt-8 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={()=>{
                        updateShowCard(true)
                        updateShowQuiz(false)
                    }
                }
                    >Add New Question
                </button>
            </div>


            {/* Add Modal */}
            <AddCardModal
                handleAddNewCard = {handleAddNewCard}
                onClose={() => {
                    // setShowQuiz(true)
                    updateShowQuiz(true)
                    updateShowCard(false)
                }}

            />

                <FeedbackModal
                    close = {()=>{updateShowFeedbackModal(false)}}
                    handleNext =  {handleNext}
                />

            {/* Complete Modal */}
            <CompleteModal
                onClose={() => {
                    updateShowComplete(false)
                }}
            />
            </>

            }
        </>
)

}
export default App
