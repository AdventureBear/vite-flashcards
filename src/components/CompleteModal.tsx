import {useFlashCardState} from "../store.ts";

interface CompleteModalProps {

    onClose: ()=>void,
}

function CompleteModal({  onClose }:CompleteModalProps):  JSX.Element {
    const correct = useFlashCardState((state)=> state.correct)
    const incorrect = useFlashCardState((state)=> state.incorrect)
    const showComplete = useFlashCardState((state)=>state.showComplete)

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${showComplete ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Great Job, you're a rockstar!</h2>
                <div className="flex justify-center mb-4">
                    {/* Display your pie chart or graphic here */}
                    {/* Example: <img src="your_graphic_url.png" alt="Pie Chart" /> */}
                </div>
                <p className="text-lg mb-4">Correct: {correct}, Incorrect: {incorrect}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default CompleteModal