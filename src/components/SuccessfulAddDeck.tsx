import {useFlashCardState} from "../flashCardStore.ts";


const SuccessfulAddDeckModal = () => {

    const updateShowDashboard = useFlashCardState((state)=>state.updateShowDashboard)
    const updateShowAddDeck = useFlashCardState((state)=>state.updateShowAddDeck)
    // const updateShowCard = useFlashCardState((state)=>state.updateShowCard)
    const updateShowConfirmAddDeck = useFlashCardState((state)=>state.updateShowConfirmAddDeck)
    // const showConfirmAddDeck = useFlashCardState((state)=>state.showConfirmAddCard)



    return (
        // Modal
        (<div className="flex justify-center items-center h-screen">
                {/*{showConfirmAddDeck &&*/}
                    // Overlay
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        {/*// Modal*/}
                        <div className="bg-white p-8 rounded shadow-lg text-center">
                            <h2 className="text-2xl mb-4">Success!</h2>
                            {/*<button*/}
                            {/*    className="bg-blue-500 text-white px-4 py-2 rounded mr-4"*/}
                            {/*    onClick={()=>{*/}
                            {/*        updateShowCard(true)*/}
                            {/*        updateShowAddDeck(false)*/}
                            {/*        updateShowConfirmAddDeck(false)*/}
                            {/*    }}>Add Questions</button>*/}
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                                onClick={()=>{
                                    updateShowDashboard(true)
                                    updateShowAddDeck(false)
                                    updateShowConfirmAddDeck(false)
                                }}>Back to Dashboard</button>

                        </div>
                    </div>
                {/*}*/}
            </div>
        )
    )
};

export default SuccessfulAddDeckModal;