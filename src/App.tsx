//React
import {useEffect, useState} from 'react'

//React Query
import { useQuery } from "react-query";

//ComponentLibrary
import Button from "./templates/Button.tsx";


//Data
const URL = "http://localhost:3000/decks"
const statsURL = "http://localhost:3000/stats"
// import {useFetch} from "../hooks/useFetch.ts";

//Components
import CompleteModal from './components/CompleteModal'
import AddCardModal from "./components/AddCard";
import FeedbackModal from "./components/FeedbackModal.tsx";
import ReviewDeck from "./components/ReviewDeck.tsx";
import AddDeckModal from "./components/AddDeck.tsx"

//Style
import './App.css'

//Types
import {Card, Review, NewCard, Deck} from './types.ts'

//State Management
import  { useFlashCardState } from "./store.ts";
import Dashboard from "./components/Dashboard.tsx";
import ConfirmReopenDashboard from "./components/ConfirmReopenDashboard.tsx";
import DeckOptions from "./components/DeckOptions.tsx";



//functions

function App() {
    // const [cardIdsToReview, setCardIdsToReview] = useState<number[]>([]);
    const [unrevealedCards, setUnrevealedCards] = useState<Card[]>([]);
    const [questionsReviewed, setQuestionsReviewed] = useState<Review[]>([]);  //Array to track each question for this round reviewed and correct
    const [filteredDecks, setFilteredDecks] = useState()

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
    // const updateShowAddDeck = useFlashCardState((state)=>state.updateShowAddDeck)
    const showQuiz = useFlashCardState((state)=>(state.showQuiz))
    const showCard = useFlashCardState((state) => state.showCard)
    const showAddDeck = useFlashCardState((state)=> state.showAddDeck)
    const showComplete = useFlashCardState((state)=>state.showComplete)
    const updateShowQuiz = useFlashCardState((state)=>(state.updateShowQuiz))
    const updateShowFeedbackModal = useFlashCardState((state)=>state.updateShowFeedbackModal)
    const updateAnsweredCorrectly = useFlashCardState((state) =>state.updateAnsweredCorrectly )
    const deck = useFlashCardState((state)=>state.deck)
    const updateDeck = useFlashCardState((state)=>state.updateDeck)
    const updateShowDashboard = useFlashCardState((state)=>state.updateShowDashboard)
    const cardsToReview = useFlashCardState((state)=>state.cardsToReview)
    const updateCardsToReview = useFlashCardState((state)=>state.updateCardsToReview)
    const showDashboard = useFlashCardState((state)=>state.showDashboard)
    const showDeckOptions = useFlashCardState((state)=>state.showDeckOptions)
    const updateShowDeckOptions = useFlashCardState((state)=>state.updateShowDeckOptions)
    const confirmDashboardShow = useFlashCardState((state)=>state.confirmDashboardShow)
    const updateConfirmDashboardShow = useFlashCardState((state)=>state.updateConfirmDashboardShow)
    const showArchived = useFlashCardState((state)=>state.showArchived)

    //reactQuery, get all data
    const { isLoading, error,  data: allDecks , refetch } = useQuery('repoData', () =>
        fetch(URL).then(res =>
            res.json()
        )
    )

    const { isLoading: isLoadingStats, error: errorStats, data: dataStats , refetch: refetchStats } = useQuery('repoStats', () =>
        fetch(statsURL).then(res =>
            res.json()

        )
    )

    //Dependency **DATA**
    //When database loaded, gather deck names
    useEffect(() => {
        if (allDecks) {
    setFilteredDecks (allDecks.filter((deck: Deck) => deck.archived === showArchived)
        .map((deck: Deck) => deck));
    //        updateDeckList(data.filter((deck: Deck)=> deck.archived === showArchived)
    //            .map((deck: Deck) => deck.name ))
        }
    }, [allDecks]);

    //Dependency **DECK**
    //When deck cards loaded...
    //Create a set of cards for current review session
    //Initialize questions/cards reviewed array,
    //Call init here too?

    useEffect(() => {
        if(deck) {
            updateCardsToReview(deck.cards.map(card => card.id))  // creates array of card ids for this round of review
            resetCurrentCardIndex()
            setUnrevealedCards(deck.cards)  //initializing unreviewed cards, in case some are skipped
            setQuestionsReviewed(deck.cards.map((x: Card)=>{
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
    // useEffect(() => {
    //     if (deck.length>0 && cardsDone===deck.length){
    //         updateShowComplete(true)
    //     }
    // }, [cardsDone, deck]);
    //when deck chosen, load cards into deck global state

    // console.log(isLoadingStats, errorStats, dataStats)

    console.log(filteredDecks)

    const selectDeck = (id: number) => {
        const newDeck = (allDecks.find((deck: { id: number; })=>deck.id===id))
        updateDeck(newDeck)

        updateShowDashboard(false)
        updateShowDeckOptions(true)
    }

    const handleReviewDeck = () => {
        updateShowDeckOptions(false)
        updateShowQuiz(true)
    }

    const handleAddQuestions = () =>{
        updateShowCard(true)
        updateShowDeckOptions(false)
    }




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
        if (currentCardIndex < deck.cards.length - 1) {
            changeCurrentCardIndex(1)
        } else {
            if (checkUnreviewedCards()) {
                console.log("you have cards to review")
                console.log(checkUnreviewedCards())
            }
        }
    }

    function handleOpenDashboard(){
        updateConfirmDashboardShow(false)
        updateShowDashboard(true)
        updateShowQuiz(false)
        init()
    }

    function init(){
        updateDeck({id:0, cards:[],archived:false, name:""})
        updateCardsToReview([])
        setQuestionsReviewed([])
        resetCardsDone()
        resetCorrect()
        resetIncorrect()
        updateShowAnswer(false)
    }

    const handleAnswer = (cardIndex: number, isCorrect: boolean) => {

        if (cardsDone < deck.cards.length) {
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

    function saveReviewStats(){
        let newStats: { id: number; deckId: string; reviews: { date: Date, correct:boolean }[]}[]=[]
            console.log("calculatnig review stats")
        questionsReviewed.map((question)=>{
            console.log(deck.id, question.id, question.correct, question.reviewed)
            //add entry to stats in this format:
            if (question.reviewed) {
                const newReview = {
                    "date": JSON.stringify(new Date()),
                    "correct": question.correct
                }
                newStats.push({"id": question.id, "deckId": deck.id, "reviews": updateStats(deck.id, question.id, newReview)})
            }
        } )
        console.log(newStats)
        updateStatsDB(newStats)
    }

    async function updateStats(deckId: string, cardId: number, review: { reviewDate: string; correct: boolean | null; }) {
        console.log("*** update stats ***")
        let currentCardStats = null
        let currentReviews = []
        const currentDeckStats = dataStats.find((elem)=> elem.id === deckId)
        if (currentDeckStats) {
            // console.log("Found Deck")
             currentCardStats = currentDeckStats.cards.find((elem) => elem.cardId === cardId)
            if (currentCardStats) {
                // The card with the matching deckId & cardId was found
                // console.log("Found Card");
                currentReviews = currentCardStats.reviewed
                console.log("current review stats: ", currentReviews)
            } else {
                // The card with the specified Id was not found
                // console.log("Card not found");
            }
        } else {
            // console.log("Deck not found")
        }

        const newReviews = [...currentReviews,review]
return newReviews
        // console.log("New Reviews for ", cardId, newReviews)
        // const response = await fetch(`http://localhost:3000/stats/${deckId}/cards`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         newReviews
        //     }),
        // });
        //
        // const result = await response.json();
        // console.log(result)
        //
        // if (!response.ok) {
        //     throw new Error(result.message);
        // }
        //
        // return result
    }

    async function updateStatsDB(newReviews: any) {
        const response = await fetch(`http://localhost:3000/stats/${deckId}/cards`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newReviews
            }),
        });

        const result = await response.json();
        console.log(result)

        if (!response.ok) {
            throw new Error(result.message);
        }

        return result
    }

    async function handleAddNewDeck(name: string) {
        // console.log(name)
        const response = await fetch("http://localhost:3000/decks", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name,
                "archived": false,
                "cards": [

                ]
            }),
        })

        const result = await response.json();
        // console.log(result)

        if (!response.ok) {
            throw new Error(result.message);
        }
        // Update local state after successful API call
        await refetch();
        // updateDeckName(name)
        updateDeck({id:0, cards:[],archived:false, name:""})

        return result;

    }

    async function handleArchiveDeck(deckId:string) {
        console.log("Archiving/Unarchiving Deck, ", deckId);

        const response = await fetch(`http://localhost:3000/decks/${deckId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                archived: !deck.archived,
            }),
        });

        const result = await response.json();
        console.log("Archived:", result.archived)
        if (!response.ok) {
            throw new Error(result.message);
        }

        // Update local state after successful API call
        await refetch();

        return result;
    }

    async function handleDeleteDeck(deckId:string) {
        const response = await fetch(`http://localhost:3000/decks/${deckId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },

        });

        const result = await response.json();
        console.log("Deleting:", deckId)
        if (!response.ok) {
            throw new Error(result.message);
        }

        // Update local state after successful API call
        await refetch();

        return result;
    }
    async function handleAddNewCard(newCard: NewCard ) {
        // const workingDeck = data.find((elem: { id: number, name: string; cards: Card[] }) => elem.name === deckName);
        // console.log(workingDeck.name, workingDeck.id, newCard)
        const uid = (() => {
            let id: number;
            if (deck.cards.length > 0) {
                id = Math.max(...deck.cards.map((card: { id: number }) => card.id || 0)) + 1;
            } else {
                id = 1; // Set a default ID if the array is empty
            }

            return () => id++;
        })();
        const nextId = uid()
        if (deck.id === undefined) {
            throw new Error("Deck not found");
        }

        const updatedCards = [...deck.cards, {...newCard, "id": nextId}]


        const response = await fetch(`http://localhost:3000/decks/${deck.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                "cards": updatedCards
            }),
        });

        const result = await response.json();
        // console.log(result)
        if (!response.ok) {
            throw new Error(result.message);
        }
        // Update local state after successful API call

        await refetch();

        // updateDeck(updatedCards)

        return result;
    }

    const progressBarWidth = `${(cardsDone / deck.cards.length) * 100}%`;

    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error
        return (<>
            <div className={`bg-gray-800 shadow-xl shadow-gray-950 p-12 `}>
                <div className={`bg-white p-8`}>
                    <div className="w-full  mx-auto bg-gray-800 rounded-lg p-4 shadow-lg">

            {filteredDecks && <>
                {showDashboard &&
                    <Dashboard
                        selectDeck ={selectDeck}
                        filteredDecks     ={filteredDecks}
                    />
                }

                {showAddDeck &&
                    <AddDeckModal
                        handleAddNewDeck = {handleAddNewDeck}
                    />
                }

                {showDeckOptions &&
                    <DeckOptions
                        deck={deck}
                        handleArchiveDeck={handleArchiveDeck}
                        handleDeleteDeck={handleDeleteDeck}
                        // deckName = {deckName}
                        reviewDeck = {handleReviewDeck}
                        addQuestions = {handleAddQuestions}
                        // isArchived={isArchived}


                    />
                }


                {showQuiz &&
                    <>
                    {/*// <div className={`bg-gray-800 shadow-xl shadow-gray-950 p-8 `}>*/}

                   <ReviewDeck
                       handleAnswer={handleAnswer}
                       progressBarWidth={progressBarWidth}
                       handleNext={handleNext}
                       handlePrev={handlePrev}
                       questionsReviewed={questionsReviewed}
                   />


                    <Button
                        onClick={()=>{
                            updateConfirmDashboardShow(true)
                        }}>
                        Show Dashboard
                        </Button>

                    {confirmDashboardShow &&
                        <ConfirmReopenDashboard

                            handleOpenDashboard={handleOpenDashboard}
                        />
                    }

                    {/*</div>*/}
                    </>
                }



                {showCard &&
                    <AddCardModal
                        handleAddNewCard = {handleAddNewCard}


                    />
                }




                <FeedbackModal
                    // close = {()=>{updateShowFeedbackModal(false)}}
                    handleNext =  {handleNext}
                />

                {/* Complete Modal */}
                {showComplete &&
                    <CompleteModal
                        saveReviewStats={saveReviewStats}
                    />
                }

                {/*<UploadCsv />*/}
            </>


            }
                    </div>
                </div>
            </div>
        </>
)

}
export default App
