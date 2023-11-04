import { create } from 'zustand'

interface BearState {
    bears: number
    increase: (by: number) => void
}

export const useBearStore = create<BearState>()((set) => ({
    bears: 0,
    increase: () => set((state) => ({ bears: state.bears + 1 })),
}))


interface FlashCardState {
    correct: number
    increase: (by: number) => void
}

export const useFlashCardState = create<FlashCardState>()((set) => ({
    correct: 0,
    increase: (by) => set((state) => ({ correct: state.correct + by })),
}))
