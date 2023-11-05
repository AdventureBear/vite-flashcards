import {useFlashCardState} from "../store.ts";

interface FlashcardProps {
    question: string ,
    answer: string ,
}



export default function Flashcard({question , answer}: FlashcardProps) {
    const updateShowAnswer = useFlashCardState((state)=>state.updateShowAnswer)
    const showAnswer = useFlashCardState((state)=>state.showAnswer)

    return (
            <div className="mb-8 p-8 bg-teal-600 shadow-lg rounded-xl">

            {!showAnswer ?
                <>
                <h2 className="text-2xl text-amber-100 font-bold mb-4">Question</h2>
                    <p className="text-xl text-amber-100">{question}</p>
                    <button className="bg-orange-300 text-xl py-2 px-4 mt-10 mb-4 rounded shadow-lg"
                            onClick={()=>{updateShowAnswer( !showAnswer)}}
                    >Reveal Answer
                    </button>
                </>

                :
                <>
                <h2 className="text-2xl text-amber-100 font-bold mb-4">Answer</h2>
                    <p className="text-xl text-amber-200">{answer}</p>
                    <button className="bg-orange-300 text-xl py-2 px-4 mt-10 mb-4 rounded shadow-lg"
                            onClick={()=>{updateShowAnswer( !showAnswer)}}
                    >Show Question
                    </button>
                </>
            }

            </div>

    );
}
