import { create } from 'zustand'



interface FlashCardState {
    correct: number
    increaseCorrect: () => void
    incorrect: number
    increaseIncorrect: () => void
    currentCardIndex: number
    changeCurrentCardIndex: (by: number) => void
    resetCurrentCardIndex: ()=> void
    cardsDone: number
    increaseCardsDone: ()=> void
}

export const useFlashCardState = create<FlashCardState>()((set) => ({
    correct: 0,
    increaseCorrect: () => set((state) => ({ correct: state.correct + 1 })),
    incorrect: 0,
    increaseIncorrect: () => set((state) => ({ incorrect: state.incorrect + 1 })),
    currentCardIndex: 0,
    changeCurrentCardIndex: (by) => set((state) => ({ currentCardIndex: state.currentCardIndex + by })),
    resetCurrentCardIndex: ()=>set({currentCardIndex: 0}),
    cardsDone: 0,
    increaseCardsDone: ()=> set((state)=>({cardsDone: state.cardsDone+1}))

}))
