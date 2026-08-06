import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import * as quizLogic from "../../quiz_logic.ts";
import {
  Note,
  IntervalQuestion,
  interval,
  octave,
  orderedNotes,
} from "../../types.ts";
import { useEffect, useState } from "react";
import * as tone from "tone";
import { useNavigate } from "react-router";

const noteLength = "4n"; //Quarter note
const delayBetweenNotes = 0.75;
const defaultOctave: octave = 3;

export default function EndlessIntervalsPage() {
  return (
    <>
      <Header />
      <EndlessIntervalsContent />
      <Footer />
    </>
  );
}

export function EndlessIntervalsContent() {
  let questionText = "Select an answer choice to identify the note.";

  const [currentQuestion, setCurrentQuestion] = useState<IntervalQuestion>(() =>
    quizLogic.createIntervalQuestion(questionText),
  );

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const navigate = useNavigate();

  // play scale notes
  useEffect(() => {
    const synth = new tone.Synth().toDestination();
    const intervalNotes: Note[] = currentQuestion.intervalNotes;
    let octave: octave = defaultOctave;
    let prevOrderedIndex: null | number = null;

    // Play each note of the interval. Ensure the second note is always a higher pitch
    intervalNotes.forEach((note, index) => {

      let currOrderedIndex = orderedNotes.indexOf(note);
      prevOrderedIndex && currOrderedIndex < prevOrderedIndex ? octave++ : null;

      const scheduledTime = tone.now() + index * delayBetweenNotes;
      synth.triggerAttackRelease(`${note}${octave}`, noteLength, scheduledTime);

      prevOrderedIndex = currOrderedIndex;
      
    });

    return () => {
      synth.dispose();
      setIsPlaying(false);
    };
  }, [currentQuestion, isPlaying]);

  const [questionsCorrect, setQuestionsCorrect] = useState<number>(0);

  const quizData = {
    correct: questionsCorrect,
    quizEndpoint: "/intervals",
  };

  function handleAnswer(selected: interval): void {
    const isAnswerCorrect: boolean =
      selected.toString() == currentQuestion.correctAnswer;

    // end quiz if an answer is correct
    if (!isAnswerCorrect) {
      navigate("/endless/complete", { replace: true, state: quizData });
      return;
    }

    // count correct answers
    else {
      setQuestionsCorrect(questionsCorrect + 1);

      setCurrentQuestion((prev) => ({
        ...prev,
        isAnswered: true,
        selectedAnswer: selected,
      }));

      nextQuestion();
    }
  }

  function nextQuestion() {
    setCurrentQuestion(quizLogic.createIntervalQuestion(questionText));
  }

  function toggleIsPlaying() {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  }

  return (
    <div className="content-container">
      <h2 className="quiz-text">{currentQuestion.text}</h2>

      <div className="quiz-img-container" onClick={toggleIsPlaying}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path
            d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124
            28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440
            40v-322q47 22 73.5 66t26.5 96q0 51-26.5
            94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"
          />
        </svg>
      </div>

      <div className="quiz-options-container">
        {currentQuestion.options.map((interval) => (
          <button
            key={interval.toString()}
            className="quiz-option-btn"
            onClick={() => handleAnswer(interval)}
          >
            {interval.toString()}
          </button>
        ))}
      </div>
    </div>
  );
}
