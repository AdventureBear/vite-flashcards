
//State Management
import  { useFlashCardState } from '../store.ts'
import ShowArchivedCheckbox from "./ShowArchivedCheckbox.tsx";


interface DashboardProps {
    selectDeck: (name: string) => void
}

const Dashboard = ({selectDeck}:DashboardProps) => {
    const deckList = useFlashCardState((state)=>state.deckList)
    const updateShowDashboard = useFlashCardState((state)=>state.updateShowDashboard)
    const updateShowAddDeck = useFlashCardState((state)=>state.updateShowAddDeck)
    const showArchived = useFlashCardState((state)=>state.showArchived)

    return (
        <>
                {/*<div className="w-full  mx-auto bg-purple-400 rounded-lg p-4 shadow-lg">*/}

                    <div className="bg-white p-8 font-extrabold text-2xl mb-2">
                        <span className="text-blue-900">{showArchived ? 'Archived Decks' : 'Deck List'}</span>
                    </div>

                        <div className="mb-8 p-8  w-full">

                            {deckList.map((name, i) => (
                                <div
                                    key={i}
                                    className="bg-indigo-200 w-full text-2xl text-black font-bold py-2 px-2 mb-4 rounded-xl cursor-pointer shadow-gray-500 shadow-l hover:shadow-xl hover:scale-105"
                                    onClick={()=>
                                        selectDeck(name)
                                    }
                                >
                                    <h2>{name}</h2>
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