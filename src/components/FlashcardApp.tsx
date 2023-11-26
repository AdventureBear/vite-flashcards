//React
import { useMemo } from 'react';

//Components
import CompleteModal from './CompleteModal'
import AddCardModal from "./AddCard";
import FeedbackModal from "./FeedbackModal.tsx";
import AddDeckModal from "./AddDeck.tsx"

//Types
import {Card, Deck} from '../types.ts'

//State Management
import  { useFlashCardState } from "../flashCardStore.ts";
import Dashboard from "./Dashboard.tsx";
import DeckOptions from "./DeckOptions.tsx";
import { Frame } from './Frame.tsx';
import QuizArea from "./QuizArea.tsx";

interface FlashCardAppProps {
    decks: Deck[],
}

//functions
function filterDecks(decks: Deck[], archived: boolean){
    return decks.filter((deck: Deck) => deck.archived === archived)
}

function FlashCardApp({decks}: FlashCardAppProps) {

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
    const updateConfirmDashboardShow = useFlashCardState((state)=>state.updateConfirmDashboardShow)
    const showArchived = useFlashCardState((state)=>state.showArchived)
    const showFeedbackModal = useFlashCardState((state)=> (state.showFeedbackModal))


    const filteredDecks = useMemo(
        () => filterDecks(decks, showArchived),
        [decks, showArchived]
    );


    const selectDeck = (id: string) => {
        const newDeck = (filteredDecks.find((deck: { id: string; })=>deck.id===id))
        if (!newDeck){
            return "No deck found"
        }
        const updatedCards = newDeck?.cards?.map((card: Card)=> {
            return {...card, "reviewed": false, "correct": false}
        })
        updateDeck({...newDeck, cards: updatedCards })
        updateShowDashboard(false)
        updateShowDeckOptions(true)
    }

    function unreviewedCards(){
        return deck.cards?.filter((card) => !card.reviewed ).map((card)=> card.id)
    }

    const handleReviewDeck = () => {
        // dispatch({ type: 'show_quiz' });
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
        const cardsRemaining =unreviewedCards()
        console.log(cardsRemaining)
        updateShowAnswer(false)
        //check boundaries
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
    }

    const handleAnswer = (cardIndex: number, isCorrect: boolean) => {
        const cardsRemaining = unreviewedCards()
        console.log("Cards done: ", cardsDone)

        //check to see if all cards have been answered
        if (cardsRemaining.length > 0) {
            if (!deck.cards[cardIndex].reviewed) {
                const newCards = [...deck.cards]
                newCards[currentCardIndex].reviewed = true
                updateAnsweredCorrectly(isCorrect)  //this triggers success window and message
                newCards[currentCardIndex].correct = isCorrect;
                updateDeck({...deck, cards: newCards})
                updateShowFeedbackModal(true)
            } else {
                //card has already been reviewed
                alert("You've already reviewed this card for this round")
            }
            //was this the last card?
            if ((cardsRemaining.length === 1) && (cardsRemaining[0]===deck.cards[cardIndex].id)) {
                updateShowComplete(true)
            }
        }

    };

    const cardsDone = deck.cards.length - unreviewedCards().length
    const progressBarWidth = `${(cardsDone / deck.cards.length) * 100}%`;


    return (
        <Frame>
            <>
                {showDashboard &&
                    <Dashboard
                        selectDeck ={selectDeck}
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
                    />
                }

                {showQuiz &&
                    <QuizArea
                        handleAnswer={handleAnswer}
                        progressBarWidth={progressBarWidth}
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
                    <CompleteModal />
                }
            </>
        </Frame>

    )

}
export default FlashCardApp
