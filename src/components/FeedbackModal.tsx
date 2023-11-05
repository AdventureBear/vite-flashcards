import {useFlashCardState} from "../store.ts";
// import {successPhrases} from "../utils/successPhrases.ts";
import {encouragementPhrases, successPhrases} from '../utils/successPhrases.ts'

interface FeedbackModalProps {
    close: () => void,  // close this modal
    handleNext: () => void,
}

const FeedbackModal = ({ close, handleNext }: FeedbackModalProps) => {
    const showFeedbackModal = useFlashCardState((state)=> (state.showFeedbackModal))
    const answeredCorrectly = useFlashCardState((state)=> (state.answeredCorrectly))
    return (
        showFeedbackModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded shadow-lg text-center w-96">
                    {answeredCorrectly ? (
                        <h2 className="text-2xl mb-4 h-20 overflow-hidden">
                            {successPhrases[Math.floor(Math.random() * successPhrases.length)]}
                        </h2>
                    ) : (
                        <h2 className="text-2xl mb-4 h-20 overflow-hidden">
                            {encouragementPhrases[Math.floor(Math.random() * encouragementPhrases.length)]}
                        </h2>
                    )}

                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                            close();
                            handleNext();
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        )
    );
};

export default FeedbackModal;