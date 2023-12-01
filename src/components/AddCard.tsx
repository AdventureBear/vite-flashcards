import React, {useState} from "react";
import SuccessfulAddModal from "./SuccessfulAddModal";
import {Card, Deck, NewCard, NewCardApiResponse} from '../types.ts'
import {useFlashCardState} from "../flashCardStore.ts";

import {useMutation, useQueryClient} from 'react-query'
import {handleAddNewCard} from "../rest/httpDecks.ts";
import {getNextCardUid} from "../utils/deckLogic.ts";

type MutationVars = { updatedCards: Card[], deck: Deck  };


const AddCardModal = () => {
    //local state
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')

    //Zustand State
    // const deck = useFlashCardState((state)=>state.deck)
    const updateShowDeckOptions = useFlashCardState((state)=>state.updateShowDeckOptions)
    const updateShowCard = useFlashCardState((state)=>state.updateShowCard)
    const updateShowConfirmAddCard = useFlashCardState((state)=>state.updateShowConfirmAddCard)
    const deckId = useFlashCardState((state)=> state.deckId)

    //react-query
    const queryClient = useQueryClient()
    const allDecksCachedData: Deck[] = queryClient.getQueryData('getAllDecks') || [];
    const deck: Deck | undefined = queryClient.getQueryData(['getDeck', deckId]);


    const { mutate: mutateAddCard } =
        useMutation<NewCardApiResponse, Error, MutationVars, { previousDecks: Deck[] | undefined }>(
        ({updatedCards, deck}) => handleAddNewCard(updatedCards, deck),
        {
            onMutate: ({updatedCards, deck}): { previousDecks: Deck[] | undefined } => {
                const previousDecks = queryClient.getQueryData<Deck[] | undefined>("getAllDecks");

                queryClient.setQueryData<Deck[]>('getAllDecks', (old = []) =>
                    old.map((d) => d.id === deck?.id ? {...d, cards: updatedCards } : d)
                );
                return { previousDecks };
            },

            // onError: (_err, _updateDeckObject, context) => {
            //     queryClient.setQueryData<Deck[]>('getAllDecks', context?.previousDecks || []);
            // },
            // onSuccess: () => {
            //                 console.log("Successful mutation add card");
            //                 queryClient.invalidateQueries({queryKey: ['getAllDecks']})
            //                     .then(()=>console.log("Successful invalidation"))
            //             },
            onSettled: (_data, _error, _variables, _context) => {
                // Handle post-mutation logic here
                queryClient.invalidateQueries({ queryKey: ['getAllDecks'] });
            },
            });

    function updateCardsData(allDecks: Deck[], deckId: string, newCard: NewCard){
        const newDeck = allDecks.filter((deck: Deck) => deck.id ===deckId)[0]
        return [...newDeck.cards, newCard] as Card[]
    }

    // async function handleSubmit(e: React.FormEvent) {
    //     e.preventDefault()
    //     // Access the cached data here
    //     // const allDecksCachedData: Deck[] = queryClient.getQueryData('getAllDecks') || [];
    //     if (!deck) return null
    //     const nextId = getNextCardUid(deck)
    //
    //     const newCard = {
    //         id: nextId,
    //         question,
    //         answer
    //     };
    //
    //     // Use it here assuming updatedCardsFromCachedData is derived from allDecksCachedData
    //     const updatedCards = updateCardsData(allDecksCachedData,deck.id, newCard); // You should implement updateCardsData function
    //
    //
    //
    //     mutateAddCard({updatedCards, deck})
    //
    //     setQuestion('')
    //     setAnswer('')
    //     updateShowConfirmAddCard(true)
    //
    // }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!deck) return null;

        const nextId = getNextCardUid(deck);

        const newCard = {
            id: nextId,
            question,
            answer
        };

        const updatedCards = updateCardsData(allDecksCachedData, deck.id, newCard);

        await mutateAddCard({ updatedCards, deck }); // Wait for the mutation to complete

        setQuestion('');
        setAnswer('');
        updateShowConfirmAddCard(true);
    }

    return (
        <>
        {deck?.id ?
            <>

                <div className={`bg-amber-50 p-8`}>
                    <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">
                        <div
                            className="bg-orange-300 w-full text-xl py-2 px-2 mb-4 rounded-xl cursor-pointer shadow-gray-500 shadow-l hover:shadow-xl hover:scale-105"
                        >
                            <h2>{deck.name}</h2>
                        </div>
                        <p className="font-bold  mb-2">
                            <span className="text-amber-100">Create New Flashcard</span>
                        </p>
                        <form onSubmit={handleSubmit} method="POST">
                            <div className="mb-8 p-8 bg-teal-600 shadow-lg rounded-xl w-full h-full">
                                <p className="font-bold  mb-2">
                                    <span className="text-amber-100">Add Question:</span>
                                </p>
                                <label>
                                    <input
                                        required
                                        className="w-full h-16 px-4 py-2 rounded-lg border border-gray-300"
                                        type="text"
                                        value={question}
                                        onChange={(e) => {
                                            setQuestion(e.target.value)
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="mb-8 p-8 bg-teal-600 shadow-lg rounded-xl w-full h-full">
                                <p className="font-bold  mb-2">
                                    <span className="text-amber-100">Add Answer:</span>
                                </p>
                                <label>
                                    <input
                                        required
                                        className="w-full h-16 px-4 py-2 rounded-lg border border-gray-300"
                                        type="text"
                                        value={answer}
                                        onChange={(e) => {
                                            setAnswer(e.target.value)
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="flex justify-around">

                                <button
                                    className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg shadow-green-800`}>
                                    <input type="submit" value="Add"/>
                                </button>
                            </div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {
                                updateShowDeckOptions(true)
                                updateShowCard(false)

                            }}>Close
                            </button>


                            {/*<input type="submit" value="Add"/>*/}
                        </form>
                    </div>
                </div>

                <SuccessfulAddModal/>

            </>
        :
        <div><p>No deck selected, go back!</p></div>
        }
        </>
    );
};
export default AddCardModal;

