
//State Management
import  { useFlashCardState } from '../flashCardStore.ts'
import ShowArchivedCheckbox from "./ShowArchivedCheckbox.tsx";
import {Deck} from "../types.ts";


interface DashboardProps {
    filteredDecks: Deck[]
    // createReviewData: (id: string)=> void
    // selectDeck: (name: string) => void
}

const Dashboard = ({ filteredDecks}:DashboardProps) => {
    // const deckList = useFlashCardState((state)=>state.deckList)
    const updateDeckId = useFlashCardState((state)=>state.updateDeckId)
    const updateShowDashboard = useFlashCardState((state)=>state.updateShowDashboard)
    const updateShowAddDeck = useFlashCardState((state)=>state.updateShowAddDeck)
    const updateShowDeckOptions = useFlashCardState((state)=>state.updateShowDeckOptions)


    const showArchived = useFlashCardState((state)=>state.showArchived)
    if (!filteredDecks) return null




    return (
        <>
                {/*<div className="w-full  mx-auto bg-purple-400 rounded-lg p-4 shadow-lg">*/}

                    <div className="bg-white p-8 font-extrabold text-2xl mb-2">
                        <span className="text-blue-900">{showArchived ? 'Archived Decks' : 'Deck List'}</span>
                    </div>

                        <div className="mb-8 p-8  w-full">

                            {filteredDecks.map((deck, i) => (
                                <div
                                    key={i}
                                    className="bg-indigo-200 w-full text-2xl text-black font-bold py-2 px-2 mb-4 rounded-xl cursor-pointer shadow-gray-500 shadow-l hover:shadow-xl hover:scale-105"
                                    onClick={()=>{
                                        updateDeckId(deck.id)
                                        // createReviewData(deck.id)
                                        updateShowDashboard(false)
                                        updateShowDeckOptions(true)
                                    }}
                                >
                                    <h2>{deck.name}</h2>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-around">

                            <button
                                onClick={()=>{
                                    updateShowAddDeck(true)
                                    updateShowDashboard(false)}
                                }
                                className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg mb-8 shadow-green-800`}>
                               Add New Deck
                            </button>
                        </div>

                    <ShowArchivedCheckbox />

                {/*</div>*/}
            {/*</div>*/}
        </>
    )
};

export default Dashboard;