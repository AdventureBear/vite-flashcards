import {useFlashCardState} from "../store.ts";

interface DeckOptionsProps {
    deckName: string;
    reviewDeck: ()=>void;
    addQuestions: () => void;
    handleArchiveDeck: (id:string)=>void;
    handleDeleteDeck:(id:string)=>void;
    isArchived:boolean;
}

const DeckOptions = ({ deckName, reviewDeck, addQuestions, handleArchiveDeck, handleDeleteDeck, isArchived} :DeckOptionsProps) => {
    const updateShowDeckOptions = useFlashCardState((state)=>state.updateShowDeckOptions)
    const updateShowDashboard = useFlashCardState((state)=>state.updateShowDashboard)
    const deck = useFlashCardState((state)=>state.deck)
    const deckId = useFlashCardState((state)=>state.deckId)

    return (
        <>
            <div className={`bg-amber-50 p-8`}>
                <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">

                    <div
                        className="bg-orange-300 w-full text-xl py-2 px-2 mb-4 rounded-xl cursor-pointer shadow-gray-500 shadow-l hover:shadow-xl hover:scale-105"
                    >
                        <h2>{deckName}</h2>
                    </div>

                    <p className="font-bold  mb-2">
                        <span className="text-amber-100">What would you like to do?</span>
                    </p>

                        <div className="flex justify-around">

                            <button
                                onClick={reviewDeck}
                                disabled={deck.length === 0}
                                // className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg mb-8 shadow-green-800 w-96`}>
                                className={`  text-black font-bold 
                                           ${deck.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-300 hover:bg-teal-500 hover:text-white'}
                                            px-8 py-2 rounded shadow-lg mb-8 shadow-green-800 w-96`
                                }>
                                Review Deck
                            </button>
                        </div>
                    <div className="flex justify-around">
                            <button
                                onClick={addQuestions}
                                className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg mb-8 shadow-green-800 w-96`}>
                                Add or Modify Cards
                            </button>
                </div>
                    <div className="flex justify-around">
                            <button
                                onClick={()=>{
                                    handleArchiveDeck(deckId)
                                    updateShowDeckOptions(false)
                                    updateShowDashboard(true)
                                }}
                                className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg mb-8 shadow-green-800 w-96`}>
                                { isArchived ? "Un-archive Deck" : "Archive Deck" }
                            </button>
                        </div>

                    <div className={`flex justify-around ${isArchived? 'block': 'hidden'}`}>
                        <button
                            onClick={()=>{
                                handleDeleteDeck(deckId)
                                updateShowDeckOptions(false)
                                updateShowDashboard(true)
                            }}
                            className={`hover:text-white text-black font-bold  bg-red-300 hover:bg-red-500 px-8 py-2 rounded shadow-lg mb-8 shadow-green-800 w-96`}>
                            { isArchived ? "Delete Deck" : "Archive Deck" }
                        </button>
                    </div>

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={()=>{
                            updateShowDeckOptions(false)
                            updateShowDashboard(true)
                        }}>Close
                    </button>


                </div>
            </div>
        </>
    )
};

export default DeckOptions;