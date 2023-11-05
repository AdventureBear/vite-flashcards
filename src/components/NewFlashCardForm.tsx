import { useMutation, useQueryClient } from 'react-query';
const URL = "http://localhost:3000/deck"

import {NewCard} from '../types.ts'

const createFlashcard = async (newFlashcard: NewCard) => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFlashcard),
    });

    if (!response.ok) {
        throw new Error('Error creating flashcard');
    }

    const data = await response.json();
    return data.id; // Assuming the API returns the created flashcard with an ID
};

const NewFlashCardForm = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(createFlashcard, {
        onSuccess: (createdFlashcardId) => {
            // Do something with the created ID (e.g., update state)
            console.log('Flashcard created with ID:', createdFlashcardId);

            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries('flashcards');
        },
    });

    const handleAddNewFlashcard = (newFlashcard: NewCard) => {
        mutation.mutate(newFlashcard);
    };

    return (
        <div>
            <button onClick={() => handleAddNewFlashcard({ question: 'New Question', answer: 'New Answer' })}>
                Add New Flashcard
            </button>
        </div>
    );
};

export default NewFlashCardForm;
