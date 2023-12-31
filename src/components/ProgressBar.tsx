import {Deck} from '../types.ts'
// import {useFlashCardState} from "../flashCardStore.ts";

interface ProgressBarProps {
    deck: Deck,
    // progressBarWidth: string
}

const ProgressBar = ({ deck}: ProgressBarProps) => {

    // const deck = useFlashCardState((state)=>state.deck)
    const cardsReviewed = deck.cards.filter((card)=> card.reviewed).length

    const progressBarWidth = `${(cardsReviewed / deck.cards.length) * 100}%`;


    return (
        <div className="w-full  mx-auto mt-4 bg-gray-500 rounded-lg p-4 shadow-lg flex justify-between items-center">
            <div>
                <p className="text-lg font-bold ml-2"><span
                    className="text-amber-100 mr-2">Progress:</span>
                </p>
            </div>
            <div className="flex-1">
                <div className="bg-gray-600 h-4 rounded-full ">
                    <div className="bg-teal-500 h-full rounded-full " style={{width: progressBarWidth}}></div>
                </div>
            </div>
            <div>
                <p className="text-lg font-bold ml-2"><span
                    className="text-amber-100">{cardsReviewed}</span> / {deck.cards.length}
                </p>
            </div>
        </div>

    )
}

export default ProgressBar
