
interface FlashcardProps {
    question: string,
    answer: string,
    showAnswer: boolean
    setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
}



export default function Flashcard({question , answer, showAnswer, setShowAnswer}: FlashcardProps) {

    return (
            <div className="mb-8 p-8 bg-teal-600 shadow-lg rounded-xl"
                onClick={()=>{setShowAnswer(prev => !prev)}}
                    >

            {!showAnswer ?
                <>
                <h2 className="text-2xl text-amber-100 font-bold mb-4">Question</h2>
                    <p className="text-xl text-amber-100">{question}</p>
                </>
                :
                <>
                <h2 className="text-2xl text-amber-100 font-bold mb-4">Answer</h2>
                    <p className="text-xl text-amber-200">{answer}</p>
                </>
            }
            </div>

    );
}
