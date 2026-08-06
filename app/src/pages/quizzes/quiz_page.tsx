import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import * as quizLogic from "../../quiz_logic.ts";
import { PitchRecognitionQuestion, NaturalNote} from "../../types.ts";
import { useEffect, useState } from "react";
import * as tone from "tone";
import { Navigate } from "react-router";

const maxPitchRecognitionQuestions = 10;
const noteLength = "4n"; //Quarter note

export default function QuizPage() {
  return (
    <>
      <Header />
      <QuizPageContent />
      <Footer />
    </>
  );
}

export function QuizPageContent() {
  let questionText = "Select an answer choice to identify the note.";
  const [questionsCompleted, setPitchRecognitionQuestionsCompleted] = useState<number>(1);

  const [currentPitchRecognitionQuestion, setCurrentPitchRecognitionQuestion] = useState<PitchRecognitionQuestion>(() =>
    quizLogic.createPitchRecognitionQuestion(questionText),
  );

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // play correct pitch
  useEffect(() => {
    const synth = new tone.Synth().toDestination();
    synth.triggerAttackRelease(currentPitchRecognitionQuestion.correctAnswer + "4", noteLength);

    return () => {
      synth.dispose();
      setIsPlaying(false)
    };
  }, [currentPitchRecognitionQuestion, isPlaying]);

  const [questionsCorrect, setPitchRecognitionQuestionsCorrect] = useState<number>(0);

  const quizData = {
    correct: questionsCorrect,
    numQuestions: maxPitchRecognitionQuestions,
    quizEndpoint: "/pitch_recognition"
  };

  // Navigate to complete page if max questions have been reached
  if (questionsCompleted > maxPitchRecognitionQuestions) {
    return <Navigate to="/quizzes/complete" replace={true} state={quizData} />;
  }

  function handleAnswer(selected: NaturalNote) {
    if (selected === currentPitchRecognitionQuestion.correctAnswer) {
      setPitchRecognitionQuestionsCorrect(questionsCorrect + 1);
    }

    setPitchRecognitionQuestionsCompleted(questionsCompleted + 1);

    setCurrentPitchRecognitionQuestion((prev) => ({
      ...prev,
      isAnswered: true,
      selectedAnswer: selected,
    }));

    nextPitchRecognitionQuestion();
  }

  function nextPitchRecognitionQuestion() {
    setCurrentPitchRecognitionQuestion(quizLogic.createPitchRecognitionQuestion(questionText));
  }

  function toggleIsPlaying() {
    isPlaying? setIsPlaying(false) : setIsPlaying(true)
  };

  return (
    <div className="content-container">
      <h2 className="quiz-text">{currentPitchRecognitionQuestion.text}</h2>

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
        {currentPitchRecognitionQuestion.options.map((note) => (
          <button
            key={note}
            className="quiz-option-btn"
            onClick={() => handleAnswer(note)}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
}
