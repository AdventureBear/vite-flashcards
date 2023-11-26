// import  { Review } from '../types.ts'
import {useFlashCardState} from "../flashCardStore.ts";


// interface ShowArchivedCheckboxProps {
//     questionsReviewed:Review[];
// }

const ShowArchivedCheckbox = () => {
    const showArchived = useFlashCardState((state)=>state.showArchived)
    const updateShowArchived = useFlashCardState((state)=>state.updateShowArchived)

    return (
        <div className="mb-4 flex items-center">
            <label className="inline-flex items-center">
                <input
                    type="checkbox"
                    title="show archived decks"
                    checked={showArchived}
                    onChange={()=>updateShowArchived(!showArchived)}
                    className="form-checkbox h-5 w-5 text-teal-600"/>
                <span className="ml-2 text-white">Show Archived Decks</span>
            </label>
        </div>)
}

export default ShowArchivedCheckbox
