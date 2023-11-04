import  { Review } from '../types.ts'
import {useFlashCardState} from "../store.ts";


interface ReviewedCheckboxProps {
    questionsReviewed:Review[];
}

const ReviewedCheckbox = ({questionsReviewed}:ReviewedCheckboxProps) => {
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)

    return (
        <div className="mb-4 flex items-center">
            <label className="inline-flex items-center">
                <input type="checkbox" readOnly
                       checked={questionsReviewed[currentCardIndex] ? questionsReviewed[currentCardIndex].reviewed : false}
                       className="form-checkbox h-5 w-5 text-teal-600"/>
                <span className="ml-2 text-white">Reviewed</span>
            </label>
        </div>)
}

export default ReviewedCheckbox
