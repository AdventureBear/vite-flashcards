interface FeedbackModalProps {
    show: boolean,
    close: () => void,  // close this modal
    handleNext: () => void,
    answeredCorrectly: boolean
}

const successPhrases: string[] = [
    "Great job!",
    "Excellent!",
    "Well done!",
    "Awesome!",
    "Fantastic!",
    "Superb!",
    "You got it!",
    "Perfect!",
    "Impressive!",
    "Outstanding!",
    "Bravo!",
    "Terrific!",
    "Nice work!",
    "Keep it up!",
    "Right on!",
    "Way to go!",
    "Splendid!",
    "Super job!",
    "Amazing!",
    "You're on fire!"
];

const encouragementPhrases: string[] = [
    "That's okay, keep going!",
    "No worries, you'll get it next time!",
    "Mistakes happen, keep trying!",
    "Don't give up, you're doing great!",
    "You're making progress, keep it up!",
    "Learning is a journey, keep moving forward!",
    "You're on the right track, keep going!",
    "Every mistake is a step towards learning!",
    "You're doing better than you think, keep it up!",
    "You're doing great, keep pushing through!",
    "Keep trying, you're getting closer!",
    "You're doing awesome, don't be discouraged!",
    "You're making excellent progress, keep it up!",
    "Believe in yourself, you've got this!",
    "You're doing fantastic, keep up the good work!"
];



const FeedbackModal = ({ show, close, handleNext, answeredCorrectly}: FeedbackModalProps) => {
    return (
        // Modal
        (<div className="flex justify-center items-center h-screen">
                {show &&
                    // Overlay
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        {/*// Modal*/}
                        <div className="bg-white p-8 rounded shadow-lg text-center">
                            {answeredCorrectly ?
                                <h2 className="text-2xl mb-4">{successPhrases[Math.floor(Math.random() * successPhrases.length)]}</h2>
                            :
                                <h2 className="text-2xl mb-4">{encouragementPhrases[Math.floor(Math.random() * encouragementPhrases.length)]}</h2>

                            }

                                <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    close()
                                    handleNext()
                                }}>
                               Next
                            </button>
                        </div>
                    </div>
                }
            </div>
        )
    )
};

export default FeedbackModal;