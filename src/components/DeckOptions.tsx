
interface DeckOptionsProps {
    deckName: string;
    onClose: ()=>void;
    reviewDeck: ()=>void;
    addQuestions: () => void;
}

const DeckOptions = ({onClose, deckName, reviewDeck, addQuestions} :DeckOptionsProps) => {

    return (
        <>
            <div className={`bg-amber-50 p-8`}>
                <div className="max-w-xl mx-auto bg-teal-800 rounded-lg p-8 shadow-lg">

                    <div
                        className="bg-orange-300 w-full text-xl py-2 px-2 mb-4 rounded-xl cursor-pointer shadow-gray-500 shadow-l hover:shadow-xl hover:scale-105"
                    >
                        <h2>{deckName}</h2>
                    </div>

                    <p className="font-bold  mb-2">
                        <span className="text-amber-100">What would you like to do?</span>
                    </p>

                        <div className="flex justify-around">

                            <button
                                onClick={reviewDeck}
                                className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg mb-8 shadow-green-800 w-96`}>
                                Review Deck
                            </button>
                        </div>
                    <div className="flex justify-around">
                            <button
                                onClick={addQuestions}
                                className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg mb-8 shadow-green-800 w-96`}>
                                Add or Modify Cards
                            </button>
                </div>
                    <div className="flex justify-around">
                            <button
                                onClick={()=>{
                                }}
                                className={`hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500 px-8 py-2 rounded shadow-lg mb-8 shadow-green-800 w-96`}>
                                Archive Deck
                            </button>
                        </div>

                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>


                </div>
            </div>
        </>
    )
};

export default DeckOptions;