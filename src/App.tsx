//React
import {useEffect, useState} from 'react'

//React Query
import { useQuery } from "react-query";


//Data
const URL = "http://localhost:3000/decks"
import {useFetch} from "../hooks/useFetch.ts";

//Components
import CompleteModal from './components/CompleteModal'
import AddCardModal from "./components/AddCard";
// import { useFetch } from "../hooks/useFetch"
import FeedbackModal from "./components/FeedbackModal.tsx";
import ReviewDeck from "./components/ReviewDeck.tsx";

//Style
import './App.css'

//Types
import {Card, Review, NewCard, Deck} from './types.ts'

//State Management
import  { useFlashCardState } from "./store.ts";
import Dashboard from "./components/Dashboard.tsx";


function App() {

    // const [cardIdsToReview, setCardIdsToReview] = useState<number[]>([]);
    const [unrevealedCards, setUnrevealedCards] = useState<Card[]>([]);
    const [questionsReviewed, setQuestionsReviewed] = useState<Review[]>([]);  //Array to track each question for this round reviewed and correct
    // const { data, isPending, error } = useFetch(URL)
    const [filteredDeck, setFilteredDeck] = useState<Card[]>([])


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
    const deck = useFlashCardState((state)=>state.deck)
    const updateDeck = useFlashCardState((state)=>state.updateDeck)
    const deckLength = useFlashCardState((state)=>state.deckLength)
    const updateDeckList = useFlashCardState((state)=> state.updateDeckList)
    const updateShowDashboard = useFlashCardState((state)=>state.updateShowDashboard)
    // const cardsToReview = useFlashCardState((state)=>state.cardsToReview)
    const updateCardsToReview = useFlashCardState((state)=>state.updateCardsToReview)

    //reactQuery
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch(URL).then(res =>
            res.json()
        )
    )

    useEffect(() => {
        if (data) {
           updateDeckList(data.map((deck: Deck) => deck.name))
        }
    }, [data]);

    useEffect(() => {
        if(deck) {
            setFilteredDeck(deck)
            // setCardIdsToReview(deck.map(card => card.id))  // creates array of card ids for this round of review
            updateCardsToReview(deck.map(card => card.id))  // creates array of card ids for this round of review

            setUnrevealedCards(deck as Card[])  //initializing unreviewed cards, in case some are skipped
            let reviewedArray = deck.map((x: Card)=>{
                return {
                    id: x.id,
                    correct: null,
                    reviewed: false,
                }
            })

            setQuestionsReviewed(reviewedArray)
            resetCurrentCardIndex()
            updateDeckLength(deck.length)
        }
    }, [deck]);


       useEffect(() => {
    if (deckLength>0 && cardsDone===deckLength){
               updateShowComplete(true)
           }
       }, [cardsDone, deckLength]);

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

    const selectDeck = (name: string) => {
        const deck = (data.find(deck=>deck.name===name))

        console.log( deck.cards)
        updateDeck(deck.cards)
        updateShowDashboard(false)

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
        // Add try-catch block around postData call
        try {
            const createdCardId: number = await postData(newCard);
            // Update state with the ID
            updateDeck([...deck, { id: createdCardId, ...newCard }])

            // Update review array with new placeholder
            // setQuestionsReviewed(prev => [...prev, {reviewed: false, correct: null, id: createdCardId}])
        } catch (error) {
            console.error('Error during POST request:', error);
            // Handle the error, if any, specific to the POST request
        }
    }


    const progressBarWidth = `${(cardsDone / deck.length) * 100}%`;

    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error
        return (<>

            {data && <>

                <div className={`bg-amber-50 p-8 ${showQuiz ? 'block' : 'hidden'}`}>

                    <Dashboard selectDeck ={selectDeck} />


                   <ReviewDeck
                       // deck={deck}
                       // cardIdsToReview={cardIdsToReview}
                       handleAnswer={handleAnswer}
                       progressBarWidth={progressBarWidth}
                       handleNext={handleNext}
                       handlePrev={handlePrev}
                       questionsReviewed={questionsReviewed}
                   />


                <button
                    className="bg-orange-300 text-xl py-2 px-4 mt-10 mb-4 mx-2 rounded shadow-lg"
                    onClick={()=>{
                        updateShowCard(true)
                        updateShowQuiz(false)
                    }
                }
                    >Add New Question
                </button>
                    <button
                        className="bg-orange-300 text-xl py-2 px-4 mt-10 mb-4 mx-2 rounded shadow-lg"
                        onClick={()=>{
                            updateShowDashboard(true)
                        }
                        }
                    >Show Dashboard</button>
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
