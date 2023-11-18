import {useFlashCardState} from "../store.ts";


const SuccessfulAddModal = ( ) => {
    const updateShowQuiz = useFlashCardState((state)=>state.updateShowQuiz)
    const updateShowCard = useFlashCardState((state)=>state.updateShowCard)
    const updateShowConfirmAdd = useFlashCardState((state)=>state.updateShowConfirmAdd)
    const showConfirmAdd = useFlashCardState((state)=>state.showConfirmAdd)



    return (
        // Modal
        (<div className="flex justify-center items-center h-screen">
                {showConfirmAdd &&
                    // Overlay
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        {/*// Modal*/}
                        <div className="bg-white p-8 rounded shadow-lg text-center">
                            <h2 className="text-2xl mb-4">Success!</h2>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                                onClick={()=>{
                                    updateShowConfirmAdd(false)
                                    updateShowCard(true)
                                }}>Add another question
                            </button>

                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    updateShowConfirmAdd(false)
                                    updateShowCard(false)
                                    updateShowQuiz(true)
                            }}>
                                Go to Review
                            </button>
                        </div>
                    </div>
                }
            </div>
        )
    )
};

export default SuccessfulAddModal;