import {useFlashCardState} from "../flashCardStore.ts";


const SuccessfulAddModal = ( ) => {
    const updateShowDeckOptions = useFlashCardState((state)=>state.updateShowDeckOptions)
    const updateShowCard = useFlashCardState((state)=>state.updateShowCard)
    const updateShowConfirmAdd = useFlashCardState((state)=>state.updateShowConfirmAddCard)
    const showConfirmAddCard = useFlashCardState((state)=>state.showConfirmAddCard)

    return (
        // Modal
        (<div className="flex justify-center items-center h-screen">
                {showConfirmAddCard &&
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
                                    updateShowDeckOptions(true)
                            }}>
                                Go to Deck Options
                            </button>
                        </div>
                    </div>
                }
            </div>
        )
    )
};

export default SuccessfulAddModal;