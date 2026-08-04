import Header from "../../components/header";
import Footer from "../../components/footer";
import { useNavigate } from "react-router";

export default function EndlessPage() {
    return(
        <div className="page">
            <Header/>
            <EndlessContent/>
            <Footer/>
        </div>
    );
}

export function EndlessContent () {
    return(
        <div className="content-container">
            
            <h2 className="instructions">Select a category to begin the challenge!</h2>

            <div className="endless-container">
                <EndlessCard name="Pitch Recognition" quizEndpoint="pitch_recognition" text="Match the audio with the correct note."/>
                <EndlessCard name="Intonation Test" text="Recognize whether a note is sharp, flat, or natural."/>
                <EndlessCard name="Major Scales" text="Identify the major scale based on the audio."/>
                <EndlessCard name="Intervals" text="Select the interval between two notes"/>
            </div>
        </div>
    );
}

export function EndlessCard(props) {

    const navigate = useNavigate()
    const startEndlessQuiz = (quizEndpoint) => {
        const endPoint = `/endless/${quizEndpoint}`
        navigate(endPoint)
    }

    return(
        <div className="endless-card">
            <h2 className="endless-card__name">{props.name}</h2>
            <p className="endless-card__text">{props.text}</p>
            <button className="endless-card__button" aria-disabled={!props.quizEndpoint} onClick={() => startEndlessQuiz(props.quizEndpoint)}>Select &rarr;</button>
        </div>
    );
}