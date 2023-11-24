//React
import {useEffect, useState} from 'react'

//React Query
import { useQuery } from "react-query";

//ComponentLibrary
import Button from "./templates/Button.tsx";


//Data
const URL = "http://localhost:3000/decks"
// const statsURL = "http://localhost:3000/stats"
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
import {Card, NewCard, Deck} from './types.ts'

//State Management
import  { useFlashCardState } from "./store.ts";
import Dashboard from "./components/Dashboard.tsx";
import ConfirmReopenDashboard from "./components/ConfirmReopenDashboard.tsx";
import DeckOptions from "./components/DeckOptions.tsx";



//functions

function App() {
    const [filteredDecks, setFilteredDecks] = useState()

    //Zustand State Management
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)
    const changeCurrentCardIndex = useFlashCardState((state)=>state.changeCurrentCardIndex)
    const resetCurrentCardIndex = useFlashCardState((state)=>state.resetCurrentCardIndex)
    const updateShowAnswer = useFlashCardState((state)=>state.updateShowAnswer)
    const updateShowComplete = useFlashCardState((state)=>state.updateShowComplete)
    const updateShowCard = useFlashCardState((state)=>state.updateShowCard)
    const showQuiz = useFlashCardState((state)=>(state.showQuiz))
    const showCard = useFlashCardState((state) => state.showCard)
    const showAddDeck = useFlashCardState((state)=> state.showAddDeck)
    const showComplete = useFlashCardState((state)=>state.showComplete)
    const updateShowQuiz = useFlashCardState((state)=>(state.updateShowQuiz))
    const updateShowFeedbackModal = useFlashCardState((state)=>state.updateShowFeedbackModal)
    const updateAnsweredCorrectly = useFlashCardState((state) =>state.updateAnsweredCorrectly )
    const deck = useFlashCardState((state)=>state.deck)
    const updateDeck = useFlashCardState((state)=>state.updateDeck)
    const resetDeck = useFlashCardState((state)=>state.resetDeck)
    const updateShowDashboard = useFlashCardState((state)=>state.updateShowDashboard)
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

    // const { isLoading: isLoadingStats, error: errorStats, data: dataStats , refetch: refetchStats } = useQuery('repoStats', () =>
    //     fetch(statsURL).then(res =>
    //         res.json()
    //
    //     )
    // )

    //Dependency **DATA**
    //When database loaded, gather deck names
    useEffect(() => {
        if (allDecks) {
            setFilteredDecks (allDecks.filter((deck: Deck) => deck.archived === showArchived)
            .map((deck: Deck) => deck));

        }
    }, [allDecks, showArchived]);


    function unreviewedCards(){
        return deck.cards.filter((card) => !card.reviewed ).map((card)=> card.id)
    }

    const selectDeck = (id: string) => {
        const newDeck = (allDecks.find((deck: { id: string; })=>deck.id===id))
        const updatedCards = newDeck.cards.map((card: Card)=> {
            return {...card, "reviewed": false, "correct": false}
        })
        updateDeck({...newDeck, cards: updatedCards})
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


    function handlePrev() {
        //check boundries
        if (currentCardIndex > 0) {
            updateShowAnswer(false)
            changeCurrentCardIndex(-1)
        }
    }

    function handleNext() {
        const cardsRemaining =unreviewedCards()
        console.log(cardsRemaining)
        updateShowAnswer(false)
        //check boundries
        if (currentCardIndex < deck.cards.length - 1) {
            changeCurrentCardIndex(1)
        } else {

            if (cardsRemaining.length>0) {
                console.log("you have cards to review")
                console.log(cardsRemaining)
            }
        }
    }

    function handleOpenDashboard(){
        updateConfirmDashboardShow(false)
        updateShowDashboard(true)
        updateShowQuiz(false)
        updateShowAnswer(false)
        init()
    }

    function init(){
        resetDeck()
        resetCurrentCardIndex()
        // updateShowAnswer(false)
    }

    const handleAnswer = (cardIndex: number, isCorrect: boolean) => {
        const cardsRemaining = unreviewedCards()
        // const cardsDone = deck.cards.filter((card)=>card.reviewed).length
        console.log("Cards done: ", cardsDone)

        //check to see if all cards have been answered
        // if (cardsDone < deck.cards.length) {
        if (cardsRemaining.length > 0) {
            if (!deck.cards[cardIndex].reviewed) {
                let newCards = [...deck.cards]
                newCards[currentCardIndex].reviewed = true
                updateAnsweredCorrectly(isCorrect)  //this triggers success window and message
                if (isCorrect) {
                    newCards[currentCardIndex].correct = true
                } else {
                    newCards[currentCardIndex].correct = false
                }
                updateDeck({...deck, cards: newCards})
                updateShowFeedbackModal(true)
            } else {
                //card has already been reviewed
                alert("You've already reviewed this card for this round")
            }
            //was thsi the last card?
            if ((cardsRemaining.length === 1) && (cardsRemaining[0]===deck.cards[cardIndex].id)) {
                updateShowComplete(true)
            }
        }
        //this shouldn't ever get called
        // else {
        //     updateShowComplete(true)
        // }
    };

    // function saveReviewStats(){
    //     let newStats: { id: number; deckId: string; reviews: { date: Date, correct:boolean }[]}[]=[]
    //         console.log("calculatnig review stats")
    //     deck.cards.map((card)=>{
    //         console.log(deck.id, card.id, card.correct, card.reviewed)
    //         //add entry to stats in this format:
    //         if (card.reviewed) {
    //             const newReview = {
    //                 "date": JSON.stringify(new Date()),
    //                 "correct": card.correct
    //             }
    //             newStats.push({"id": card.id, "deckId": deck.id, "reviews": updateStats(deck.id, card.id, newReview)})
    //         }
    //     } )
    //     console.log(newStats)
    //     updateStatsDB(newStats)
    // }


    // async function updateStatsDB(newReviews: any) {
    //     const response = await fetch(`http://localhost:3000/stats/${deck.id}/cards`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             newReviews
    //         }),
    //     });
    //
    //     const result = await response.json();
    //     console.log(result)
    //
    //     if (!response.ok) {
    //         throw new Error(result.message);
    //     }
    //
    //     return result
    // }

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
        updateDeck({id:"", cards:[],archived:false, name:""})

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

    let cardsDone = deck.cards.length - unreviewedCards().length
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
                        handleArchiveDeck={handleArchiveDeck}
                        handleDeleteDeck={handleDeleteDeck}
                        reviewDeck = {handleReviewDeck}
                        addQuestions = {handleAddQuestions}
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
                        // saveReviewStats={saveReviewStats}
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
