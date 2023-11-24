// import  { Review } from '../types.ts'
import {useFlashCardState} from "../store.ts";


// interface ReviewedCheckboxProps {
//     questionsReviewed:Review[];
// }

const ReviewedCheckbox = () => {
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)
    const deck = useFlashCardState((state)=>state.deck)

    return (
        <div className="mb-4 flex items-center">
            <label className="inline-flex items-center">
                <input type="checkbox" readOnly
                       checked={deck.cards[currentCardIndex].reviewed}
                       className="form-checkbox h-5 w-5 text-teal-600"/>
                <span className="ml-2 text-white">Reviewed</span>
            </label>
        </div>)
}

export default ReviewedCheckbox
