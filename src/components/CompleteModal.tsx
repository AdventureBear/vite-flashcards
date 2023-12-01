import {useFlashCardState} from "../flashCardStore.ts";
import {Deck, Stats} from "../types.ts";
import {handleAddNewCardReview, handleUpdateCardReview} from "../rest/httpStats.ts";
import {getNextStatUid} from "../utils/deckLogic.ts";
import {useQueryClient} from "react-query";

interface CompleteModalStats {
    stats: Stats[]
}


function CompleteModal({stats}:CompleteModalStats) {
    const updateShowComplete = useFlashCardState((state)=> state.updateShowComplete)
    const deckId = useFlashCardState((state)=> state.deckId)
    const updateShowDashboard = useFlashCardState((state)=> state.updateShowDashboard)
    const updateShowQuiz = useFlashCardState((state)=> state.updateShowQuiz)
    const inReviewData = useFlashCardState((state)=> state.inReviewData)

    const queryClient = useQueryClient()
    const deck: Deck | undefined = queryClient.getQueryData(['getDeck', deckId]);

    if (!deck) return null

    const correct = inReviewData.filter((card) => card.correct).length
    const incorrect = inReviewData.filter((card) => !card.correct).length


        function handleSaveStats() {
            const today = new Date()
            const formattedDate = today.toISOString();
            deck?.cards.forEach((card, i) => {
                let newReviews = []
                const cardStats = stats.filter((stat: Stats) => (stat.cardId === card.id && stat.deckId === deck.id))
                if (cardStats.length>0) {
                    newReviews = cardStats[0].reviews

                    const reviewToAdd = {
                        nextReviewDate: formattedDate,
                        reviews: [...newReviews, {
                            date: formattedDate,
                            correct: inReviewData[i].correct,
                            confidence: 3
                        }]
                    }
                    console.log("Update review to add: ", reviewToAdd)

                    handleUpdateCardReview(reviewToAdd, cardStats[0].id)

                } else {
                    // console.log("New stat to save")
                    const id =    getNextStatUid(stats)
                    const reviewToAdd = {
                        id: id,
                        deckId: deck.id,
                        cardId: card.id,
                        nextReviewDate: formattedDate,
                        reviews: [ {
                            date: formattedDate,
                            correct:  inReviewData[i].correct,
                            confidence: 3
                        }]
                    }
                    console.log("New Review to add: ", reviewToAdd)

                    handleAddNewCardReview(reviewToAdd)
                }
            })
        }


    return (
        <div className={`fixed inset-0 flex items-center justify-center`}>
            <div className="bg-white rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Great Job, you're a rockstar!</h2>

                <p className="flex justify-center text-lg mb-4">Correct: {correct}, Incorrect: {incorrect}</p>
                <button className="bg-teal-300 text-black px-4 py-2 rounded" onClick={()=>{
                    handleSaveStats()
                    updateShowComplete(false)
                    updateShowQuiz(false)
                    updateShowDashboard(true)
                }}>Save Stats</button>

                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=> updateShowComplete(false)}>Close</button>
            </div>
        </div>
    );
}

export default CompleteModal