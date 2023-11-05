import {useFlashCardState} from "../store.ts";

interface SucessfulAddModalProps {
    show: boolean,
    // setShowQuiz: (arg0: boolean) => void,
    close: () => void,  // close this modal
    closeAddCard: ()=>void,  //close add card
}

const SuccessfulAddModal = ({ show, close, closeAddCard}: SucessfulAddModalProps) => {
    const updateShowQuiz = useFlashCardState((state)=>state.updateShowQuiz)

    return (
        // Modal
        (<div className="flex justify-center items-center h-screen">
                {show &&
                    // Overlay
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        {/*// Modal*/}
                        <div className="bg-white p-8 rounded shadow-lg text-center">
                            <h2 className="text-2xl mb-4">Success!</h2>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                                onClick={close}>Add another question</button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    close()
                                    // onClose()
                                    updateShowQuiz(true)
                                    // setShowQuiz(true)
                                    closeAddCard()
                            }}>
                                Return to Quiz
                            </button>
                        </div>
                    </div>
                }
            </div>
        )
    )
};

export default SuccessfulAddModal;