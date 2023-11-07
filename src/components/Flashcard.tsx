import {useFlashCardState} from "../store.ts";
import IsCorrectControls from "./IsCorrectControls.tsx";

interface FlashcardProps {
    handleAnswer: (cardIndex: number, isCorrect: boolean, )=> void;
}

export default function Flashcard({handleAnswer}: FlashcardProps) {
    const updateShowAnswer = useFlashCardState((state)=>state.updateShowAnswer)
    const showAnswer = useFlashCardState((state)=>state.showAnswer)
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)
    const deck = useFlashCardState((state)=>state.deck)
    const cardsToReview = useFlashCardState((state)=>state.cardsToReview)

    const question =  deck.find(card=> card.id === cardsToReview[currentCardIndex])?.question
    const answer =  deck.find(card=> card.id === cardsToReview[currentCardIndex])?.answer

    return (
            <div className="mb-8 p-8 bg-teal-600 shadow-lg rounded-xl">

            {!showAnswer ?
                <>
                <h2 className="text-2xl text-amber-100 font-bold mb-4">Question</h2>
                    <p className="text-xl text-amber-100">{question}</p>
                    <button className="bg-orange-300 text-xl py-2 px-4 mt-10 mb-12 rounded shadow-lg"
                            onClick={()=>{updateShowAnswer( !showAnswer)}}
                    >Reveal Answer
                    </button>
                    <IsCorrectControls
                        handleAnswer={handleAnswer}
                    />
                </>

                :
                <>
                <h2 className="text-2xl text-amber-100 font-bold mb-4">Answer</h2>
                    <p className="text-xl text-amber-200">{answer}</p>

                    <button className="bg-orange-300 text-xl py-2 px-4 mt-10 mb-12 rounded shadow-lg opacity-50"
                            onClick={()=>{updateShowAnswer( !showAnswer)}}
                    >Show Question
                    </button>
                    <IsCorrectControls
                        handleAnswer={handleAnswer}
                    />
                </>
            }

            </div>

    );
}
