import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import * as quizLogic from "../quiz_logic.ts";
import { Question, NaturalNote, octave } from "../types";
import { useEffect, useState } from "react";
import * as tone from "tone";
import { Navigate } from "react-router";

const maxQuestions = 10;
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
  const [questionsCompleted, setQuestionsCompleted] = useState<number>(1);

  const [currentQuestion, setCurrentQuestion] = useState<Question>(() =>
    quizLogic.createPitchRecognitionQuestion(questionText),
  );

  useEffect(() => {
    const synth = new tone.Synth().toDestination();
    synth.triggerAttackRelease(currentQuestion.correctAnswer + "4", noteLength);

    return () => {
      synth.dispose();
    };
  }, [currentQuestion]);

  const [questionsCorrect, setQuestionsCorrect] = useState<number>(0)

  // Return to quiz selection if max questions have been reached
  if (questionsCompleted > maxQuestions) {
    return <Navigate to="/quizzes/" replace={true} />;
  }

  function handleAnswer(selected: NaturalNote) {

    if (selected === currentQuestion.correctAnswer) {
      setQuestionsCorrect(questionsCorrect + 1)
    }

    setQuestionsCompleted(questionsCompleted + 1);

    setCurrentQuestion((prev) => ({
      ...prev,
      isAnswered: true,
      selectedAnswer: selected,
    }));

    nextQuestion()
  }

  /*
  function getRandomOctave(): number {
    return Math.floor(( Math.random() + 1) * 8);
  }
  */

  function nextQuestion() {
    setCurrentQuestion(quizLogic.createPitchRecognitionQuestion(questionText));
  }

  return (
    <div className="content-container">
      <h2 className="quiz-text">{currentQuestion.text}</h2>

      <div className="quiz-img-container"></div>

      <div className="quiz-options-container">
        {currentQuestion.options.map((note) => (
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
