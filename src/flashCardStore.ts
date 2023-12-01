import { create } from 'zustand'

import { Stats, InReviewData} from "./types.ts";

const inReviewInit: InReviewData[] = [
    { cardId: -1, correct: false, reviewed: false, confidence: 3 },
];
// const inReviewInit = [{cardId: -1, reviewed: false, correct: false, confidence: 3}]
const statsInit = {id: 0, deckId: "", cardId: 0, nextReviewDate: "", reviews: [{date: "", correct: false, confidence: 0}]}
interface FlashCardState {
    inReviewData: InReviewData[]
    updateInReviewData: (to: InReviewData[]) => InReviewData[]
    deckId: string
    updateDeckId: (to: string) => void
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
    inReviewData: inReviewInit,
    // updateInReviewData: (to) => set(() => ({inReviewData: to})),
    updateInReviewData: (to) => {
        set(()=>({ inReviewData: to }))
        return to
    },
    deckId: "",
    updateDeckId: (to) => set(()=>({deckId: to})),
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


