// import  { Review } from '../types.ts'
import {useFlashCardState} from "../flashCardStore.ts";
// import {InReviewData} from "../types.ts";


// interface ReviewedCheckboxProps {
//   // inReviewData: InReviewData[]
// }

const ReviewedCheckbox = () => {
    const currentCardIndex = useFlashCardState((state)=>state.currentCardIndex)
    const inReviewData = useFlashCardState((state)=>state.inReviewData)

    // const deck = useFlashCardState((state)=>state.deck)

    return (
        <div className="mb-4 flex items-center">
            <label className="inline-flex items-center">
                <input type="checkbox" readOnly
                       checked={inReviewData[currentCardIndex].reviewed}
                       className="form-checkbox h-5 w-5 text-teal-600"/>
                <span className="ml-2 text-white">Reviewed</span>
            </label>
        </div>)
}

export default ReviewedCheckbox
