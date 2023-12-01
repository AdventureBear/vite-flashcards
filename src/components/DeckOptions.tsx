import {useFlashCardState} from "../flashCardStore.ts";

import {useMutation, useQuery, useQueryClient} from 'react-query'

import {handleArchiveDeck, handleDeleteDeck} from '../rest/httpDecks.ts'
// import {create} from "zustand";
import {useEffect} from "react";
import {Deck} from "../types.ts";
// import {Deck, InReviewData} from "../types.ts";
// import reviewDeck from "./ReviewDeck.tsx";

// import {DECKS_URL} from "../constants.ts";


interface DeckOptionsProps {
    reviewDeck: () => void;
    addQuestions: () => void;
    createReviewData: (deck: Deck)=> void
    // deckId: string
}



const DeckOptions = ({reviewDeck, addQuestions, createReviewData}: DeckOptionsProps) => {
    const updateShowDeckOptions = useFlashCardState((state) => state.updateShowDeckOptions)
    const updateShowDashboard = useFlashCardState((state) => state.updateShowDashboard)
    // const deck = useFlashCardState((state)=>state.deck)
    const deckId = useFlashCardState((state) => state.deckId)
    const queryClient = useQueryClient();

    const {data: deck, isLoading, isError} = useQuery(
        ['getDeck', deckId], () =>
            fetch(`http://localhost:3000/decks/${deckId}`).then((res) => res.json())
    );


    const {mutate: mutateArchiveDeck} = useMutation(
        'addDeck',
        ({deckId, archive}: { deckId: string, archive: boolean }) => handleArchiveDeck(deckId, archive),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['getAllDecks']});
            },
        }
    );


    const {mutate: mutateDeleteDeck} = useMutation<boolean, Error, { deckId: string }>(
        'deleteDeck',
        ({deckId}: { deckId: string }) => handleDeleteDeck(deckId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['getAllDecks']});
            },
        }
    );

    useEffect(() => {
        if (deck) {
            createReviewData(deck)
        }
    }, [deck]);

    function handleReview() {
        // createReviewData()
        reviewDeck()
    }
    function handleArchive(deckId: string, archive: boolean) {
        mutateArchiveDeck({deckId, archive})
        updateShowDeckOptions(false)
        updateShowDashboard(true)
    }

    function handleDelete(deckId: string) {
        mutateDeleteDeck({deckId})
        updateShowDeckOptions(false)
        updateShowDashboard(true)
    }


    if (isLoading) return 'Loading...';

    if (isError) return 'Error loading deck';

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
                        onClick={handleReview}
                        disabled={deck.cards.length === 0}
                        className={`${deck.cards.length === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-black'} `}>
                        Review Deck
                    </button>
                </div>
                <div className={`hover:shadow-xl hover:scale-105 flex justify-around bg-indigo-200 w-full text-2xl text-black font-bold py-2 px-2 mb-4 
                            rounded-xl cursor-pointer shadow-gray-500 shadow-l `}>
                    <button
                        onClick={addQuestions}>
                        Add or Modify Cards
                    </button>
                </div>
                <div className={`hover:shadow-xl hover:scale-105 flex justify-around bg-indigo-200 w-full text-2xl text-black font-bold py-2 px-2 mb-4 
                            rounded-xl cursor-pointer shadow-gray-500 shadow-l `}>
                    <button
                        onClick={() => {
                            handleArchive(deck.id, !deck.archived)
                        }}
                    >
                        {deck.archived ? "Un-archive Deck" : "Archive Deck"}
                    </button>
                </div>

                <div
                    className={` ${deck.archived ? 'hover:shadow-xl hover:scale-105 hover:text-white flex justify-around  bg-red-300 hover:bg-red-500 w-full ' +
                        'text-2xl text-black font-bold py-2 px-2 mb-4 \n' +
                        'rounded-xl cursor-pointer shadow-gray-500 shadow-l' : 'hidden'}`}>
                    <button
                        onClick={() => {
                            handleDelete(deck.id)
                        }}
                    >
                        {deck.archived ? "Delete Deck" : "Archive Deck"}
                    </button>
                </div>


            </div>

            <button
                className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg mb-8 shadow-green-800`}
                onClick={() => {
                    updateShowDeckOptions(false)
                    updateShowDashboard(true)
                }}>Back to Dashboard
            </button>

        </>
    )
};

export default DeckOptions;