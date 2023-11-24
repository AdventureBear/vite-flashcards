import {useFlashCardState} from "../store.ts";
import {Deck} from "../types.ts";

interface DeckOptionsProps {
    // deckName: string
    deck: Deck
    reviewDeck: ()=>void;
    addQuestions: () => void;
    handleArchiveDeck: (id:string)=>void;
    handleDeleteDeck:(id:string)=>void;
    // isArchived:boolean;
}

const DeckOptions = ({ deck, reviewDeck, addQuestions, handleArchiveDeck, handleDeleteDeck} :DeckOptionsProps) => {
    const updateShowDeckOptions = useFlashCardState((state)=>state.updateShowDeckOptions)
    const updateShowDashboard = useFlashCardState((state)=>state.updateShowDashboard)
    // const deck = useFlashCardState((state)=>state.deck)
    // const deckId = useFlashCardState((state)=>state.deckId)
    console.log(deck)
    return (
        <>

                        <div className="bg-white p-8 font-extrabold text-2xl mb-2">

                        <h2>{deck.name}</h2>
                    </div>
            <div className="mb-8 p-8  w-full h-full">


                        <div className={` ${deck.cards.length === 0 ? 'cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'}  
                            flex justify-around bg-indigo-200 w-full text-2xl text-black font-bold py-2 px-2 mb-4 
                            rounded-xl cursor-pointer shadow-gray-500 shadow-l `}>
                            <button
                                onClick={reviewDeck}
                                disabled={deck.cards.length === 0}
                                className={` 
                                           ${deck.cards.length === 0 ? 'text-gray-700 cursor-not-allowed' :'text-black'}
                                         
                                         `}>
                                Review Deck
                            </button>
                        </div>
                <div className={`hover:shadow-xl hover:scale-105 flex justify-around bg-indigo-200 w-full text-2xl text-black font-bold py-2 px-2 mb-4 
                            rounded-xl cursor-pointer shadow-gray-500 shadow-l `}>
                            <button
                                onClick={addQuestions}
                                >
                                Add or Modify Cards
                            </button>
                </div>
                <div className={`hover:shadow-xl hover:scale-105 flex justify-around bg-indigo-200 w-full text-2xl text-black font-bold py-2 px-2 mb-4 
                            rounded-xl cursor-pointer shadow-gray-500 shadow-l `}>
                            <button
                                onClick={()=>{
                                    handleArchiveDeck(deck.id)
                                    updateShowDeckOptions(false)
                                    updateShowDashboard(true)
                                }}
                                >
                                { deck.archived ? "Un-archive Deck" : "Archive Deck" }
                            </button>
                        </div>

                    <div className={` ${deck.archived? 'hover:shadow-xl hover:scale-105 hover:text-white flex justify-around  bg-red-300 hover:bg-red-500 w-full ' +
                        'text-2xl text-black font-bold py-2 px-2 mb-4 \n' +
                        'rounded-xl cursor-pointer shadow-gray-500 shadow-l': 'hidden'}`}>
                        <button
                            onClick={()=>{
                                handleDeleteDeck(deck.id)
                                updateShowDeckOptions(false)
                                updateShowDashboard(true)
                            }}
                            // className={`hover:text-white text-black font-bold  bg-red-300 hover:bg-red-500 px-8 py-2 rounded shadow-lg mb-8 shadow-green-800 w-96`}>
                            >
                            { deck.archived ? "Delete Deck" : "Archive Deck" }
                        </button>
                    </div>


            </div>

            <button
                className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg mb-8 shadow-green-800`}
                onClick={()=>{
                    updateShowDeckOptions(false)
                    updateShowDashboard(true)
                }}>Back to Dashboard
            </button>
                {/*</div>*/}
            {/*</div>*/}
        </>
    )
};

export default DeckOptions;