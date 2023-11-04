import  { Review } from '../App.tsx'


interface ReviewedCheckboxProps {
    questionsReviewed:Review[];
    currentCardIndex: number;
}

const ReviewedCheckbox = ({questionsReviewed, currentCardIndex}:ReviewedCheckboxProps) => (
    <div className="mb-4 flex items-center">
    <label className="inline-flex items-center">
        <input type="checkbox" readOnly checked={questionsReviewed[currentCardIndex]? questionsReviewed[currentCardIndex].reviewed: false} className="form-checkbox h-5 w-5 text-teal-600" />
        <span className="ml-2 text-white">Reviewed</span>
    </label>
</div>)

export default ReviewedCheckbox
