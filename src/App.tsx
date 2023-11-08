//React
import {useEffect, useState} from 'react'

//React Query
import { useQuery } from "react-query";

//ComponentLibrary
import Button from "./templates/Button.tsx";


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
import ConfirmReopenDashboard from "./components/ConfirmReopenDashboard.tsx";

//functions


function App() {

    // const [cardIdsToReview, setCardIdsToReview] = useState<number[]>([]);
    const [unrevealedCards, setUnrevealedCards] = useState<Card[]>([]);
    const [questionsReviewed, setQuestionsReviewed] = useState<Review[]>([]);  //Array to track each question for this round reviewed and correct
    const [confirmDashboardShow, setConfirmDashboardShow] = useState(false)

    const { postData, data: _postRequest, error: _postError } = useFetch(URL, "POST")



    //Zustand State Management
    const increaseCorrect = useFlashCardState((state)=>state.increaseCorrect)
    const resetCorrect = useFlashCardState((state)=>state.resetCorrect)
    const increaseIncorrect = useFlashCardState((state)=>state.increaseIncorrect)
    const resetIncorrect = useFlashCardState((state)=>state.resetIncorrect)
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)
    const changeCurrentCardIndex = useFlashCardState((state)=>state.changeCurrentCardIndex)
    const resetCurrentCardIndex = useFlashCardState((state)=>state.resetCurrentCardIndex)
    const cardsDone = useFlashCardState((state)=>state.cardsDone)
    const increaseCardsDone = useFlashCardState((state)=>state.increaseCardsDone)
    const resetCardsDone = useFlashCardState((state)=>state.resetCardsDone)

    const updateShowAnswer = useFlashCardState((state)=>state.updateShowAnswer)
    const updateShowComplete = useFlashCardState((state)=>state.updateShowComplete)
    const updateShowCard = useFlashCardState((state)=>state.updateShowCard)
    // const updateDeckLength = useFlashCardState((state)=>state.updateDeckLength)
    const showQuiz = useFlashCardState((state)=>(state.showQuiz))
    const updateShowQuiz = useFlashCardState((state)=>(state.updateShowQuiz))
    const updateShowFeedbackModal = useFlashCardState((state)=>state.updateShowFeedbackModal)
    const updateAnsweredCorrectly = useFlashCardState((state) =>state.updateAnsweredCorrectly )
    const deck = useFlashCardState((state)=>state.deck)
    const updateDeck = useFlashCardState((state)=>state.updateDeck)
    // const deckLength = useFlashCardState((state)=>state.deckLength)
    const updateDeckList = useFlashCardState((state)=> state.updateDeckList)
    const updateShowDashboard = useFlashCardState((state)=>state.updateShowDashboard)
    const cardsToReview = useFlashCardState((state)=>state.cardsToReview)
    const updateCardsToReview = useFlashCardState((state)=>state.updateCardsToReview)

    const postId = useFlashCardState((state)=>state.postId)
    const updatePostId = useFlashCardState((state)=>state.updatePostId)


    //reactQuery
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch(URL).then(res =>
            res.json()
        )
    )

    //Dependency **DATA**
    //When database loaded, gather deck names
    useEffect(() => {
        if (data) {
           updateDeckList(data.map((deck: Deck) => deck.name))
        }
    }, [data]);

    //when deck chosen, load cards into deck global state
    const selectDeck = (name: string) => {
        const deck = (data.find((deck: { name: string; })=>deck.name===name))
        updateDeck(deck.cards)
        updateShowDashboard(false)
        updateShowQuiz(true)

    }

    //Dependency **DECK**
    //When deck cards loaded...
    //Create a set of cards for current review session
    //Initialize questions/cards reviewed array,
    //Call init here too?

    useEffect(() => {
        if(deck) {
            updateCardsToReview(deck.map(card => card.id))  // creates array of card ids for this round of review
            resetCurrentCardIndex()
            setUnrevealedCards(deck as Card[])  //initializing unreviewed cards, in case some are skipped
            setQuestionsReviewed(deck.map((x: Card)=>{
                return {
                    id: x.id,
                    correct: null,
                    reviewed: false
                }
            }))

        }
    }, [deck]);

    //Dependency **DECK, CARDSDONE**
    //Check for end of review (should this be reviewed array instead?
    //Show end screen
    useEffect(() => {
    if (deck.length>0 && cardsDone===deck.length){
               updateShowComplete(true)
           }
       }, [cardsDone, deck]);


    function checkUnreviewedCards() {
        const unreviewedCards = questionsReviewed.filter(card => !card.reviewed);
        if (unreviewedCards.length > 0) {
            return unreviewedCards
        } else {
            return null
        }
    }

    function handlePrev() {
        //check boundries
        if (currentCardIndex > 0) {
            updateShowAnswer(false)
            changeCurrentCardIndex(-1)
        }
    }

    function handleNext() {
        updateShowAnswer(false)
        //check boundries
        if (currentCardIndex < deck.length - 1) {
            changeCurrentCardIndex(1)
        } else {
            if (checkUnreviewedCards()) {
                console.log("you have cards to review")
                console.log(checkUnreviewedCards())
            }
        }
    }

    function handleOpenDashboard(){
        setConfirmDashboardShow(false)
        updateShowDashboard(true)
        updateShowQuiz(false)
        init()
    }

    function init(){
        updateDeck([])
        updateCardsToReview([])
        setQuestionsReviewed([])
        resetCardsDone()
        resetCorrect()
        resetIncorrect()
        updateShowAnswer(false)
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

        if (cardsToReview[index] !== questionsReviewed[index].id) {
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
            postData(newCard);
            // Update state with the ID
            if (postId != -1) {
                updateDeck([...deck, { id: postId, ...newCard }])
                updatePostId(-1)
            }


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

                <Dashboard selectDeck ={selectDeck} />

                <div className={`bg-amber-50 p-8 ${showQuiz ? 'block' : 'hidden'}`}>

                   <ReviewDeck
                       handleAnswer={handleAnswer}
                       progressBarWidth={progressBarWidth}
                       handleNext={handleNext}
                       handlePrev={handlePrev}
                       questionsReviewed={questionsReviewed}
                   />


                {/*<button*/}
                {/*    className="bg-orange-300 text-xl py-2 px-4 mt-10 mb-4 mx-2 rounded shadow-lg"*/}
                {/*    onClick={()=>{*/}
                {/*        updateShowCard(true)*/}
                {/*        updateShowQuiz(false)*/}
                {/*    }*/}
                {/*}*/}
                {/*    >Add New Question*/}
                {/*</button>*/}

                    {/*<button*/}
                    {/*    className="bg-orange-300 text-xl py-2 px-4 mt-10 mb-4 mx-2 rounded shadow-lg"*/}
                    {/*    onClick={()=>{setConfirmDashboardShow(true)}*/}
                    {/*    }*/}
                    {/*>Show Dashboard</button>*/}

                    <Button
                        onClick={()=>{
                            updateShowCard(true)
                            updateShowQuiz(false)
                        }}
                    >Add new Question
                    </Button>

                    <Button
                        onClick={()=>{
                            setConfirmDashboardShow(true)
                        }}>
                        Show Dashboard
                        </Button>


                    <ConfirmReopenDashboard
                        confirmDashboardShow={confirmDashboardShow}
                        onClose = {()=>setConfirmDashboardShow(false)}
                        handleOpenDashboard={handleOpenDashboard}
                    />
            </div>


             {/* Add Modal */}
                <AddCardModal
                    handleAddNewCard = {handleAddNewCard}
                    onClose={() => {
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
