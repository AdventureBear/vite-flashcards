import { create } from 'zustand'

import {Deck, Stats} from "./types.ts";

const deckInit = {id:"", cards:[], archived: false, name: ""}
const statsInit = {deckId: "", cardId: 0, nextReviewDate: "", reviews: [{date: "", correct: false, confidence: 0}]}
interface FlashCardState {
    deck: Deck,
    updateDeck: (deck: Deck) => void
    resetDeck: ()=> void
    currentCardIndex: number
    changeCurrentCardIndex: (by: number) => void
    resetCurrentCardIndex: ()=> void
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
    showQuiz: boolean
    updateShowQuiz:  (to:boolean)=>void
    showFeedbackModal: boolean
    updateShowFeedbackModal: (to:boolean)=>void
    answeredCorrectly: boolean
    updateAnsweredCorrectly: (to:boolean)=>void
    showDashboard: boolean,
    updateShowDashboard:(to:boolean)=>void
    confirmDashboardShow: boolean
    updateConfirmDashboardShow: (to:boolean)=>void
    showArchived: boolean
    updateShowArchived: (to:boolean)=>void
    stats: Stats
    updateStats: (to:Stats)=> void

}

export const useFlashCardState = create<FlashCardState>()((set) => ({
    deck: deckInit,
    updateDeck: (deck: Deck)=> set(()=>({deck: deck})),
    resetDeck: ()=>set(()=>({deck: deckInit})),
    currentCardIndex: 0,
    changeCurrentCardIndex: (by) => set((state) => ({ currentCardIndex: state.currentCardIndex + by })),
    resetCurrentCardIndex: ()=>set({currentCardIndex: 0}),
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
    showQuiz: false,
    updateShowQuiz: (to)=>set(()=>({showQuiz: to})),
    showFeedbackModal: false,
    updateShowFeedbackModal: (to)=>set(()=>({showFeedbackModal: to})),
    answeredCorrectly: false,
    updateAnsweredCorrectly: (to) => set(()=>({answeredCorrectly: to})),
    showDashboard: true,
    updateShowDashboard:(to)=> set(()=>({showDashboard: to})),
    confirmDashboardShow: false,
    updateConfirmDashboardShow: (to)=>set(()=>({confirmDashboardShow: to})),
    showArchived: false,
    updateShowArchived:(to: boolean)=> set(()=>({showArchived: to})),
    stats: statsInit,
    updateStats: (to) => set(()=>({stats: to}))
}))


