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
    "You're on fire!",
    "You're crushing it!",
    "Nailed it!",
    "You're on fire!",
    "Way to go, rockstar!",
    "Crushing goals!",
    "Doing the happy dance!",
    "You're a superstar!",
    "You're unstoppable!",
    "You're a legend!",
    "Winning at life!",
    "Doing the victory dance!",
    "You're the boss!",
    "High fives all around!",
    "You're on a roll!",
    "Winning like a champ!",
    "Living the dream!",
    "Making it happen!",
    "You're a wizard!",
    "You're a rockstar!",
    "You're golden!",
    "Keep it up, champ!",
    "You're a genius!",
    "Living your best life!",
    "You're dynamite!",
    "Kicking butt and taking names!",
    "You're a pro!",
    "You're the bee's knees!",
    "You're a legend in the making!",
    "You're a shining star!",
    "You're a superhero!",
    "You're on the road to success!",
    "You're a total winner!",
];

const encouragementPhrases: string[] = [
    "You're making progress, keep it up!",
    "You've got this!",
    "Believe in yourself!",
    "Keep pushing forward!",
    "Every step counts!",
    "You're doing great, don't give up!",
    "You're stronger than you think!",
    "You're on the right track!",
    "Keep going, you're almost there!",
    "You're capable of amazing things!",
    "Stay positive and keep moving forward!",
    "You're doing awesome, keep it up!",
    "You're making a difference!",
    "You're one in a million!",
    "You're an inspiration!",
    "Keep chasing your dreams!",
    "You're capable of anything!",
    "Don't stop until you're proud!",
    "You're a force to be reckoned with!",
    "You're doing better than you think!",
    "You're a warrior!",
    "Keep up the good work!",
    "You're a shining star!",
    "You're a beacon of light!",
    "You're destined for greatness!",
    "You're making waves!",
    "You're a true champion!",
    "Keep on shining!",
    "You're a ray of sunshine!",
    "You're a spark of brilliance!",
    "You're a true gem!",
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



const FeedbackModal = ({ show, close, handleNext, answeredCorrectly }: FeedbackModalProps) => {
    return (
        show && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded shadow-lg text-center w-96">
                    {answeredCorrectly ? (
                        <h2 className="text-2xl mb-4 h-20 overflow-hidden">
                            {successPhrases[Math.floor(Math.random() * successPhrases.length)]}
                        </h2>
                    ) : (
                        <h2 className="text-2xl mb-4 h-20 overflow-hidden">
                            {encouragementPhrases[Math.floor(Math.random() * encouragementPhrases.length)]}
                        </h2>
                    )}

                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                            close();
                            handleNext();
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        )
    );
};

export default FeedbackModal;