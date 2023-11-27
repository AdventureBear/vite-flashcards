import {useFlashCardState} from "../flashCardStore.ts";
import {Stats} from "../types.ts";

interface CompleteModalStats {
    stats: Stats[]
}


function CompleteModal({stats}:CompleteModalStats) {


    const updateShowComplete = useFlashCardState((state)=> state.updateShowComplete)
    const deck = useFlashCardState((state)=> state.deck)

    const correct = deck.cards.filter((card) => card.correct).length
    const incorrect = deck.cards.filter((card) => !card.correct).length


        function handleSaveStats() {
            const today = new Date()
            const formattedDate = today.toISOString();
            deck.cards.forEach((card) => {
                // console.log("Card: ", card)
                // const deckStats = stats.filter((stat) =>(stat.deckId===deck.id))
                // console.log("deck stats: ", deckStats)
                // let newStat = {}
                let newReviews = []
                const cardStats = stats.filter((stat: Stats) => (stat.cardId === card.id && stat.deckId === deck.id))
                if (cardStats.length>0) {

                    console.log("Add to existing stats: ", cardStats)
                    newReviews = cardStats[0].reviews
                    const reviewToAdd = {
                        deckId: deck.id,
                        cardId: card.id,
                        reviews: [...newReviews, {
                            date: formattedDate,
                            correct: card.correct,
                            confidence: 3
                        }]
                    }
                    console.log(reviewToAdd)
                } else {
                    console.log("new stat to save")
                    const reviewToAdd = {
                        deckId: deck.id,
                        cardId: card.id,
                        reviews: [ {
                            date: formattedDate,
                            correct: card.correct,
                            confidence: 3
                        }]
                    }
                    console.log(reviewToAdd)
                }
            })
        }


    return (
        <div className={`fixed inset-0 flex items-center justify-center`}>
            <div className="bg-white rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Great Job, you're a rockstar!</h2>

                <p className="flex justify-center text-lg mb-4">Correct: {correct}, Incorrect: {incorrect}</p>
                <button className="bg-teal-300 text-black px-4 py-2 rounded" onClick={()=>{handleSaveStats()}}>Save Stats</button>

                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=> updateShowComplete(false)}>Close</button>
            </div>
        </div>
    );
}

export default CompleteModal