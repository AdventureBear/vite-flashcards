import {useFlashCardState} from "../flashCardStore.ts";

interface ConfirmReopenDashboardModalProps {
    handleOpenDashboard: ()=> void
}
const ConfirmReopenDashboardModal = ({ handleOpenDashboard}: ConfirmReopenDashboardModalProps) => {
    const updateConfirmDashboardShow = useFlashCardState((state)=>(state.updateConfirmDashboardShow))

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}>
            <div className="bg-teal-800 p-8 rounded-lg shadow-lg text-center w-96">
                 <div className={`bg-amber-50 p-8 h-60 overflow-hidden`}>
                     <h2 className="text-2xl mb-6">
                        Confirm Action:
                     </h2>
                     <p className="mb-6">Open Dashboard and Lose Current Progress?</p>
                     <button className= "bg-green-500 text-white px-4 py-2 rounded mr-6"
                         onClick={handleOpenDashboard}
                     >
                         Confirm
                     </button>
                     <button
                         className= "bg-green-500 text-white px-4 py-2 rounded"
                         onClick={()=>updateConfirmDashboardShow(false)}
                     >
                         Cancel
                     </button>


                 </div>
            </div>
        </div>
    )
};

export default ConfirmReopenDashboardModal;