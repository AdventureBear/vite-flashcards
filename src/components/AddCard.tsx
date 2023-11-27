import React, {useState} from "react";
import SuccessfulAddModal from "./SuccessfulAddModal";
// import {useFlashCardState} from "../flashCardStore.ts";
import {Deck, NewCard} from '../types.ts'
import {useFlashCardState} from "../flashCardStore.ts";

import {useMutation, useQueryClient} from 'react-query'
import {handleAddNewCard} from "../rest/httpDecks.ts";

// interface AddCardModalProps {
//     // onClose: ()=>void,
//     // handleAddNewCard: (newCard: NewCard)=>NewCardApiResponse
// }

const AddCardModal = () => {
    //local state
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')

    //Zustand State
    const deck = useFlashCardState((state)=>state.deck)
    const updateShowDeckOptions = useFlashCardState((state)=>state.updateShowDeckOptions)
    const updateShowCard = useFlashCardState((state)=>state.updateShowCard)
    const updateShowConfirmAddCard = useFlashCardState((state)=>state.updateShowConfirmAddCard)

    //react-query
    const queryClient = useQueryClient()


    const { mutate: mutateAddCard } = useMutation(
        'addDeck',
        ({newCard, deck}: {newCard: NewCard, deck: Deck}) => handleAddNewCard(newCard, deck),
        {
            onSuccess: () => {
                console.log("Successful mutation add card");
                queryClient.invalidateQueries({queryKey: ['getAllDecks']})
                    .then(()=>console.log("Successful invalidation"))
            },
        }
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const newCard = {
            question,
            answer
        };
        mutateAddCard({newCard, deck})
        setQuestion('')
        setAnswer('')
        updateShowConfirmAddCard(true)
    }

    return (
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
            <label >
                <input
                    required
                    className="w-full h-16 px-4 py-2 rounded-lg border border-gray-300"
                    type="text"
                    value={question}
                    onChange={(e)=>{setQuestion(e.target.value)}}
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
                    onChange={(e)=>{setAnswer(e.target.value)}}
                />
            </label>
            </div>
            <div className="flex justify-around">

                <button
                    className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg shadow-green-800`}>
                    <input type="submit" value="Add"/>
                </button>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>{
                updateShowDeckOptions(true)
                updateShowCard(false)

            }}>Close</button>


            {/*<input type="submit" value="Add"/>*/}
        </form>
            </div>
            </div>

            <SuccessfulAddModal />

        </>

    );
};
export default AddCardModal;

