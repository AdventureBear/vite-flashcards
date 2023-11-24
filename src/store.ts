import { create } from 'zustand'

import { Deck} from "./types.ts";



// interface DecksStore {
//     deck: Deck,
//     score: {correct: number, incorrect: number},
//     currentCardIndex: number,
//
// }

interface FlashCardState {
    // deckName: string,
    // updateDeckName: (to: string) =>void,
    deck: Deck,
    updateDeck: (deck: Deck) => void
    correct: number
    increaseCorrect: () => void
    resetCorrect: ()=>void
    incorrect: number
    increaseIncorrect: () => void
    resetIncorrect: ()=> void
    currentCardIndex: number
    changeCurrentCardIndex: (by: number) => void
    resetCurrentCardIndex: ()=> void
    cardsDone: number
    increaseCardsDone: ()=> void
    resetCardsDone: ()=> void
    showAnswer: boolean
    updateShowAnswer: (to: boolean) => void
    showComplete: boolean,
    updateShowComplete: (to: boolean) => void
    showCard: boolean
    updateShowCard: (to:boolean)=>void
    showConfirmAddCard: boolean,
    updateShowConfirmAddCard: (to:boolean)=>void
    showConfirmAddDeck: boolean,
    updateShowConfirmAddDeck: (to:boolean)=>void
    showAddDeck: boolean
    updateShowAddDeck: (to:boolean)=>void
    showDeckOptions: boolean
    updateShowDeckOptions: (to:boolean)=>void
    // deckLength: number
    // updateDeckLength:(to:number)=>void
    showQuiz: boolean
    updateShowQuiz:  (to:boolean)=>void
    showFeedbackModal: boolean
    updateShowFeedbackModal: (to:boolean)=>void
    answeredCorrectly: boolean
    updateAnsweredCorrectly: (to:boolean)=>void
    // deckList: string[],
    // updateDeckList: (list: string[])=>void,
    showDashboard: boolean,
    updateShowDashboard:(to:boolean)=>void
    // cardsToReview: number[]
    // updateCardsToReview: (cardsIds: number[])=>void
    confirmDashboardShow: boolean
    updateConfirmDashboardShow: (to:boolean)=>void
    // deckId: string
    // updateDeckId: (to: string)=>void
    showArchived: boolean
    updateShowArchived: (to:boolean)=>void

}

export const useFlashCardState = create<FlashCardState>()((set) => ({
    // deckName: "",
    // updateDeckName: (to) => set(()=>({deckName: to})),
    deck: {id:0, cards:[], archived: false, name: ""},
    updateDeck: (deck: Deck)=> set(()=>({deck: deck})),
    correct: 0,
    increaseCorrect: () => set((state) => ({ correct: state.correct + 1 })),
    resetCorrect: () => set(()=>({correct: 0})),
    incorrect: 0,
    increaseIncorrect: () => set((state) => ({ incorrect: state.incorrect + 1 })),
    resetIncorrect: () => set(()=>({incorrect: 0})),
    currentCardIndex: 0,
    changeCurrentCardIndex: (by) => set((state) => ({ currentCardIndex: state.currentCardIndex + by })),
    resetCurrentCardIndex: ()=>set({currentCardIndex: 0}),
    cardsDone: 0,
    increaseCardsDone: ()=> set((state)=>({cardsDone: state.cardsDone+1})),
    resetCardsDone: ()=>set({cardsDone: 0}),
    showAnswer: false,
    updateShowAnswer: (to) => set(()=>({showAnswer: to})),
    showComplete: false,
    updateShowComplete: (to) => set(()=>({showComplete: to})),
    showCard: false,
    updateShowCard: (to)=> set(()=>({showCard: to})),
    showConfirmAddCard:  false,
    updateShowConfirmAddCard: (to) => set(()=>({showConfirmAddCard: to})),
    showConfirmAddDeck:  false,
    updateShowConfirmAddDeck: (to) => set(()=>({showConfirmAddCard: to})),
    showAddDeck: false,
    updateShowAddDeck: (to)=> set(()=>({showAddDeck: to})),
    showDeckOptions: false,
    updateShowDeckOptions: (to)=> set(()=>({showDeckOptions: to})),
    // deckLength: 0,
    // updateDeckLength: (to) => set((state)=>({deckLength: state.deckLength + to})),
    showQuiz: false,
    updateShowQuiz: (to)=>set(()=>({showQuiz: to})),
    showFeedbackModal: false,
    updateShowFeedbackModal: (to)=>set(()=>({showFeedbackModal: to})),
    answeredCorrectly: false,
    updateAnsweredCorrectly: (to) => set(()=>({answeredCorrectly: to})),
    // deckList: [],
    // updateDeckList: (list: string[]) => set(()=>({deckList: list})),
    showDashboard: true,
    updateShowDashboard:(to)=> set(()=>({showDashboard: to})),
    cardsToReview: [],
    updateCardsToReview: (cardsIds: number[])=> set(()=>({cardsToReview: cardsIds})),
    confirmDashboardShow: false,
    updateConfirmDashboardShow: (to)=>set(()=>({confirmDashboardShow: to})),
    // deckId: "",
    // updateDeckId: (to: string)=>set(()=>({deckId: to})),
    showArchived: false,
    updateShowArchived:(to: boolean)=> set(()=>({showArchived: to}))
}))
