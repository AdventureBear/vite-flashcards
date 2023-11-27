import ReviewDeck from "./ReviewDeck.tsx";
import Button from "../templates/Button.tsx";
import ConfirmReopenDashboard from "./ConfirmReopenDashboard.tsx";
import {useFlashCardState} from "../flashCardStore.ts";
import {Stats} from "../types.ts";

interface QuizAreaProps  {
    handleAnswer: (cardIndex: number, isCorrect: boolean) => void;
    handlePrev: ()=> void,
    handleNext: ()=> void,
    handleOpenDashboard: ()=> void
    stats: Stats[]
}

export default function QuizArea({stats,handleAnswer, handlePrev, handleNext, handleOpenDashboard}: QuizAreaProps) {
    const confirmDashboardShow = useFlashCardState((state)=>state.confirmDashboardShow)
    const updateConfirmDashboardShow = useFlashCardState((state)=>state.updateConfirmDashboardShow)

    return (
        <>
            <ReviewDeck
                stats={stats}
                handleAnswer={handleAnswer}
                handleNext={handleNext}
                handlePrev={handlePrev}
            />


            <Button
                onClick={()=>{
                    updateConfirmDashboardShow(true)
                }}>
                Show Dashboard
            </Button>

            {confirmDashboardShow &&
                <ConfirmReopenDashboard
                    handleOpenDashboard={handleOpenDashboard}
                />
            }
        </>
    );
}
