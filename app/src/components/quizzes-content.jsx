import QuizCard from "./quiz-card";

function QuizzesContent() {
    return(
        <div className="content-container">
        
            <h2 className="instructions">Select a Quiz to get started!</h2>

            <div className="quiz-container">

                <QuizCard name="Pitch Recognition" text="Match the audio with the correct note."/>
                <QuizCard name="Intonation Test" text="Recognize whether a note is sharp, flat, or natural."/>
                <QuizCard name="Major Scales" text="Identify the major scale based on the audio."/>
                <QuizCard name="Intervals" text="Select the interval between two notes"/>
                
            </div>

        </div>
    );
}

export default QuizzesContent