import {Card} from '../App.tsx'

interface ProgressBarProps {
    cardsDone: number,
    deck: Card[],
    progressBarWidth: string
}

const ProgressBar = ({cardsDone, deck, progressBarWidth}: ProgressBarProps) =>
    (
        <div className="max-w-xl mx-auto mt-4 bg-gray-500 rounded-lg p-4 shadow-lg flex justify-between items-center">
            <div>
                <p className="text-lg font-bold ml-2"><span
                    className="text-amber-100 mr-2">Reviewed:</span>
                </p>
            </div>
            <div className="flex-1">
                <div className="bg-gray-600 h-4 rounded-full ">
                    <div className="bg-teal-500 h-full rounded-full " style={{width: progressBarWidth}}></div>
                </div>
            </div>
            <div>
                <p className="text-lg font-bold ml-2"><span
                    className="text-amber-100">{cardsDone}</span> / {deck.length}
                </p>
            </div>
        </div>

    )

export default ProgressBar
