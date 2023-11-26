import ReviewDeck from "./ReviewDeck.tsx";
import Button from "../templates/Button.tsx";
import ConfirmReopenDashboard from "./ConfirmReopenDashboard.tsx";
import {useFlashCardState} from "../flashCardStore.ts";

interface QuizAreaProps  {
    handleAnswer: (cardIndex: number, isCorrect: boolean) => void;
    handlePrev: ()=> void,
    handleNext: ()=> void,
    handleOpenDashboard: ()=> void
}

export default function QuizArea({handleAnswer, handlePrev, handleNext, handleOpenDashboard}: QuizAreaProps) {
    const confirmDashboardShow = useFlashCardState((state)=>state.confirmDashboardShow)
    const updateConfirmDashboardShow = useFlashCardState((state)=>state.updateConfirmDashboardShow)

    return (
        <>
            <ReviewDeck
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
