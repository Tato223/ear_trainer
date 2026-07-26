import EndlessCard from "./endless-card";

function EndlessContent () {
    return(
        <div className="content-container">
            
            <h2 className="instructions">Select a category to begin the challenge!</h2>

            <div className="endless-container">
                <EndlessCard name="Pitch Recognition" text="Match the audio with the correct note."/>
                <EndlessCard name="Intonation Test" text="Recognize whether a note is sharp, flat, or natural."/>
                <EndlessCard name="Major Scales" text="Identify the major scale based on the audio."/>
                <EndlessCard name="Intervals" text="Select the interval between two notes"/>
            </div>
        </div>
    );
}

export default EndlessContent;