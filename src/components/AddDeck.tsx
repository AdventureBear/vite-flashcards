import {useState} from "react";
import SuccessfulAddDeckModal from "./SuccessfulAddDeck.tsx";
import {useFlashCardState} from "../flashCardStore.ts";

import {useMutation, useQueryClient} from 'react-query'


import {handleAddNewDeck} from "../rest/httpDecks.ts";
// import {prepareNewDeck} from "../utils/deckLogic.ts";
import {Deck} from "../types.ts";


const AddDeckModal = () => {
    const [deckName, setDeckName] = useState('')
    const updateShowAddDeck = useFlashCardState((state) => state.updateShowAddDeck)
    const updateShowConfirmAddDeck = useFlashCardState((state) => state.updateShowConfirmAddDeck)
    const showConfirmAddDeck = useFlashCardState((state)=>state.showConfirmAddCard)
    // const updateDeck = useFlashCardState((state)=>state.updateDeck)

    const queryClient = useQueryClient()

    //optimistic update of decks
    const { mutate } = useMutation(
        'addDeck', handleAddNewDeck,
        {
            onMutate: async (deckName)=> {
                const previousDecks = queryClient.getQueryData(['getAllDecks']);
                // Optimistically update to the new value
                queryClient.setQueryData(['getAllDecks'], (old) => {
                    return [...(old as Deck[]),
                        {name: deckName, id: 'optimistic-id', cards: []}, // Use a temporary ID for optimistic update
                    ];
                });
                return { previousDecks };
            },
            onSettled: (data) => {
                queryClient.invalidateQueries({ queryKey: ['getAllDecks'] });
                return data
            },
            onError: (_err, _deckName, context) => {
                // Roll back to the previous value on error
                queryClient.setQueryData(['getAllDecks'], context?.previousDecks);
            },
        }
    );


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        mutate(deckName)
        setDeckName('')
        updateShowConfirmAddDeck(true)

    }

    return (
        <>
            <div className={`bg-amber-50 p-8`}>
                <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">
                    <p className="font-bold  mb-2">
                        <span className="text-amber-100">Create New Deck</span>
                    </p>
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="mb-8 p-8 bg-teal-600 shadow-lg rounded-xl w-full h-full">
                            <p className="font-bold  mb-2">
                                <span className="text-amber-100">Deck Name:</span>
                            </p>
                            <label>
                                <input
                                    required
                                    className="w-full h-16 px-4 py-2 rounded-lg border border-gray-300"
                                    type="text"
                                    value={deckName}
                                    onChange={(e) => {
                                        setDeckName(e.target.value)
                                    }}
                                />
                            </label>
                        </div>
                        <div className="flex justify-around">
                            <button
                                className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-4 py-2 rounded shadow-lg shadow-green-800`}>
                                <input type="submit" value="Add"/>
                            </button>
                        </div>

                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {
                            updateShowAddDeck(false)
                        }}>Close
                        </button>


                    </form>
                </div>
            </div>

            {showConfirmAddDeck &&
                <SuccessfulAddDeckModal/>
            }

        </>

    );
};
export default AddDeckModal;

