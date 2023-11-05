import { create } from 'zustand'

import {Card} from "./types.ts";


interface FlashCardState {
    deck: Card[],
    updateDeck: (deck: Card[]) => void
    correct: number
    increaseCorrect: () => void
    incorrect: number
    increaseIncorrect: () => void
    currentCardIndex: number
    changeCurrentCardIndex: (by: number) => void
    resetCurrentCardIndex: ()=> void
    cardsDone: number
    increaseCardsDone: ()=> void
    showAnswer: boolean
    updateShowAnswer: (to: boolean) => void
    showComplete: boolean,
    updateShowComplete: (to: boolean) => void
    showCard: boolean
    updateShowCard: (to:boolean)=>void
    deckLength: number
    updateDeckLength:(to:number)=>void
    showQuiz: boolean
    updateShowQuiz:  (to:boolean)=>void
    showFeedbackModal: boolean
    updateShowFeedbackModal: (to:boolean)=>void
    answeredCorrectly: boolean
    updateAnsweredCorrectly: (to:boolean)=>void
    deckList: string[],
    updateDeckList: (list: string[])=>void,
    showDashboard: boolean,
    updateShowDashboard:(to:boolean)=>void
    cardsToReview: number[]
    updateCardsToReview: (cardsIds: number[])=>void
}

export const useFlashCardState = create<FlashCardState>()((set) => ({
    deck: [],
    updateDeck: (deck: Card[])=> set(()=>({deck: deck})),
    correct: 0,
    increaseCorrect: () => set((state) => ({ correct: state.correct + 1 })),
    incorrect: 0,
    increaseIncorrect: () => set((state) => ({ incorrect: state.incorrect + 1 })),
    currentCardIndex: 0,
    changeCurrentCardIndex: (by) => set((state) => ({ currentCardIndex: state.currentCardIndex + by })),
    resetCurrentCardIndex: ()=>set({currentCardIndex: 0}),
    cardsDone: 0,
    increaseCardsDone: ()=> set((state)=>({cardsDone: state.cardsDone+1})),
    showAnswer: false,
    updateShowAnswer: (to) => set(()=>({showAnswer: to})),
    showComplete: false,
    updateShowComplete: (to) => set(()=>({showComplete: to})),
    showCard: false,
    updateShowCard: (to)=> set(()=>({showCard: to})),
    deckLength: 0,
    updateDeckLength: (to) => set((state)=>({deckLength: state.deckLength + to})),
    showQuiz: true,
    updateShowQuiz: (to)=>set(()=>({showQuiz: to})),
    showFeedbackModal: false,
    updateShowFeedbackModal: (to)=>set(()=>({showFeedbackModal: to})),
    answeredCorrectly: false,
    updateAnsweredCorrectly: (to) => set(()=>({answeredCorrectly: to})),
    deckList: [],
    updateDeckList: (list: string[]) => set(()=>({deckList: list})),
    showDashboard: true,
    updateShowDashboard:(to)=> set(()=>({showDashboard: to})),
    cardsToReview: [],
    updateCardsToReview: (cardsIds: number[])=> set(()=>({cardsToReview: cardsIds}))
}))
