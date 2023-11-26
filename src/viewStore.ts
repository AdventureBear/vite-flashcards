import { create } from 'zustand'

type View = {
    dashboard: boolean,
        deckOptions: boolean,
        addDeck: boolean,
        quiz: boolean,
        addCard: boolean,
        feedback: boolean,
        complete: boolean
}
interface ViewState {
    view: View,
    updateView: ((newView: string, to: boolean)=> void)
}

const viewInit = {dashboard: true, deckOptions: false, addDeck: false, quiz: false, addCard: false, feedback: false, complete: false}


export const useViewState = create<ViewState>((set) => ({
    view: viewInit,
    updateView: (newView, to) => {
        set((state) => ({
            view: {...state.view, [newView]: to},
        }));
    },
}));


