import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import * as quizLogic from "../../quiz_logic.ts";
import { Note, interval, IntervalQuestion } from "../../types.ts";
import { useEffect, useState } from "react";
import * as tone from "tone";
import { Navigate } from "react-router";

const maxQuestions = 10;
const noteLength = "4n"; //Quarter note
const delayBetweenNotes = .75;

export default function IntervalQuizPage() {
  return (
    <>
      <Header />
      <IntervalQuizContent />
      <Footer />
    </>
  );
}

export function IntervalQuizContent() {
  let questionText = "Select an answer choice to identify the note.";
  const [questionsCompleted, setQuestionsCompleted] = useState<number>(1);

  const [currentQuestion, setCurrentQuestion] = useState<IntervalQuestion>(() =>
    quizLogic.createIntervalQuestion(questionText),
  );

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // play interval notes
  useEffect(() => {
    const synth = new tone.Synth().toDestination();
    const intervalNotes: Note[] = currentQuestion.intervalNotes

    intervalNotes.forEach((note, index) => {
        const scheduledTime = tone.now() + index * delayBetweenNotes;
        synth.triggerAttackRelease(`${note}${currentQuestion.correctAnswer !== 7 ? 4 : 5}`, noteLength, scheduledTime)
    })

    return () => {
      synth.dispose();
      setIsPlaying(false)
    };
  }, [currentQuestion, isPlaying]);

  const [questionsCorrect, setPitchRecognitionQuestionsCorrect] = useState<number>(0);

  const quizData = {
    correct: questionsCorrect,
    numQuestions: maxQuestions,
    quizEndpoint: "/intervals"
  };

  // Navigate to complete page if max questions have been reached
  if (questionsCompleted > maxQuestions) {
    return <Navigate to="/quizzes/complete" replace={true} state={quizData} />;
  }

  function handleAnswer(selected: interval) {
    if (selected.toString() === currentQuestion.correctAnswer) {
      setPitchRecognitionQuestionsCorrect(questionsCorrect + 1);
    }

    setQuestionsCompleted(questionsCompleted + 1);

    setCurrentQuestion((prev) => ({
      ...prev,
      isAnswered: true,
      selectedAnswer: selected,
    }));

    nextQuestion();
  }

  /*
  function getRandomOctave(): number {
    return Math.floor(( Math.random() + 1) * 8);
  }
  */

  function nextQuestion() {
    setCurrentQuestion(quizLogic.createIntervalQuestion(questionText));
  }

  function toggleIsPlaying() {
    isPlaying? setIsPlaying(false) : setIsPlaying(true)
  };

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
          <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124
            28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440
            40v-322q47 22 73.5 66t26.5 96q0 51-26.5
            94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
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
