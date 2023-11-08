import {useFlashCardState} from "../store.ts";
// import {successPhrases} from "../utils/successPhrases.ts";
import {encouragementPhrases, successPhrases} from '../utils/successPhrases.ts'
import Modal from "../templates/Modal.tsx";
import Button from "../templates/Button.tsx";

interface FeedbackModalProps {
    close: () => void,  // close this modal
    handleNext: () => void,
}

const FeedbackModal = ({ close, handleNext }: FeedbackModalProps) => {
    const showFeedbackModal = useFlashCardState((state)=> (state.showFeedbackModal))
    const answeredCorrectly = useFlashCardState((state)=> (state.answeredCorrectly))
    return (
        showFeedbackModal && (
            <>
                <Modal >
                    <h2 className="text-2xl  mt-2 h-20 overflow-hidden">
                        {answeredCorrectly ? (
                          successPhrases[Math.floor(Math.random() * successPhrases.length)]
                        ) : (
                         encouragementPhrases[Math.floor(Math.random() * encouragementPhrases.length)]
                        )}
                    </h2>

                    <Button
                        color={2}
                        onClick={() => {
                            close();
                            handleNext();
                        }}
                    >Next</Button>
                    
                </Modal>

            </>
        )
    );

};

export default FeedbackModal;