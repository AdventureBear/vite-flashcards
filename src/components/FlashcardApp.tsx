//React
import { useMemo } from 'react';

//Components
import CompleteModal from './CompleteModal'
import AddCardModal from "./AddCard";
import FeedbackModal from "./FeedbackModal.tsx";
import AddDeckModal from "./AddDeck.tsx"

//Types
import {Card, Deck, InReviewData, Stats} from '../types.ts'

//State Management
import  { useFlashCardState } from "../flashCardStore.ts";
import Dashboard from "./Dashboard.tsx";
import DeckOptions from "./DeckOptions.tsx";
import { Frame } from './Frame.tsx';
import QuizArea from "./QuizArea.tsx";
import {useQueryClient} from "react-query";

interface FlashCardAppProps {
    decks: Deck[],
    stats: Stats[]
}

//functions
function filterDecks(decks: Deck[], archived: boolean){
    return decks.filter((deck: Deck) => deck.archived === archived)
}





function FlashCardApp({decks, stats}: FlashCardAppProps) {
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
    const deckId = useFlashCardState((state)=>state.deckId)
    const updateShowDashboard = useFlashCardState((state)=>state.updateShowDashboard)
    const showDashboard = useFlashCardState((state)=>state.showDashboard)
    const showDeckOptions = useFlashCardState((state)=>state.showDeckOptions)
    const updateShowDeckOptions = useFlashCardState((state)=>state.updateShowDeckOptions)
    const updateConfirmDashboardShow = useFlashCardState((state)=>state.updateConfirmDashboardShow)
    const showArchived = useFlashCardState((state)=>state.showArchived)
    const showFeedbackModal = useFlashCardState((state)=> (state.showFeedbackModal))
    const inReviewData = useFlashCardState((state)=> (state.inReviewData))
    const updateInReviewData = useFlashCardState((state)=> (state.updateInReviewData))

    const queryClient = useQueryClient()

    const deck: Deck | undefined = queryClient.getQueryData(['getDeck', deckId]);

    const filteredDecks = useMemo(
        () => filterDecks(decks, showArchived),
        [decks, showArchived]
    );

    function createReviewData (deck: Deck) {
        console.log("Creating review data")
        console.log("Deck Selected: ", deck)
        if (deck) {
            const freshReviewData: InReviewData[] = deck.cards.map((card: Card) => {
                return {cardId: card.id, reviewed: false, correct: false, confidence: 3}
            })
            console.log("New Review Data:", freshReviewData)
            updateInReviewData(freshReviewData)
        }
    }

    function unreviewedCards(){
        return inReviewData.filter((card) => !card.reviewed ).map((card)=> card.cardId)
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
        //check boundaries
        if (currentCardIndex > 0) {
            updateShowAnswer(false)
            changeCurrentCardIndex(-1)
        }
    }

    function handleNext() {
        if (!deck?.cards.length) return null
        const cardsRemaining =unreviewedCards()
        console.log(cardsRemaining)
        updateShowAnswer(false)
        //check boundaries
        if (currentCardIndex < deck?.cards.length - 1) {
            changeCurrentCardIndex(1)
        } else {

            if (cardsRemaining && cardsRemaining.length>0) {
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
        // resetDeck()
        resetCurrentCardIndex()
    }

    const handleAnswer = (cardIndex: number, isCorrect: boolean) => {
        const cardsRemaining = unreviewedCards()
        console.log("Handling answer! ReviewData: ", inReviewData)
        //check to see if all cards have been answered
        if (cardsRemaining && cardsRemaining.length > 0) {
            //check to see if card has been reviewed
            if (!inReviewData[cardIndex].reviewed) {
                //if card hasn't been reviewed, update this cards review key to true
                const newData = inReviewData         //make shallow copy
                newData[currentCardIndex].reviewed = true          //set this card to true
                updateAnsweredCorrectly(isCorrect)                  //this triggers success window and message
                newData[currentCardIndex].correct = isCorrect;     //this updates the answer (correct vs incorrect)
                updateInReviewData(newData)              //this updates the review
                updateShowFeedbackModal(true)                   //shows the feedback
            } else {
                //card has already been reviewed
                alert("You've already reviewed this card for this round")
            }
            //was this the last card?
            if ((cardsRemaining.length === 1) && (cardsRemaining[0]===deck?.cards[cardIndex].id)) {
                updateShowComplete(true)
            }
        }

    };


    return (
        <Frame>
            <>
                {showDashboard &&
                    <Dashboard
                        // selectDeck ={selectDeck}
                        // createReviewData={createReviewData}
                        filteredDecks     ={filteredDecks}
                    />
                }

                {showAddDeck &&
                    <AddDeckModal />
                }

                {showDeckOptions &&
                    <DeckOptions
                        // handleDeleteDeck={handleDeleteDeck}
                        reviewDeck = {handleReviewDeck}
                        addQuestions = {handleAddQuestions}
                        createReviewData={createReviewData}
                    />
                }

                {showQuiz &&
                    <QuizArea
                        stats={stats}
                        handleAnswer={handleAnswer}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        handleOpenDashboard={handleOpenDashboard}

                    />
                }

                {showCard &&
                    <AddCardModal />
                }
                {showFeedbackModal &&
                    <FeedbackModal
                        handleNext =  {handleNext}
                    />
                }

                {showComplete &&
                    <CompleteModal
                        stats={stats}
                    />
                }
            </>
        </Frame>

    )

}
export default FlashCardApp
