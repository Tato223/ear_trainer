import Header from "../../components/header";
import Footer from "../../components/footer";
import * as quizLogic from "../../quiz_logic.ts";
import { PitchModifier, IntonationQuestion, octave } from "../../types.ts";
import { useEffect, useState } from "react";
import * as tone from "tone";
import { Navigate } from "react-router";
import SubmitQuestionButton from "../../components/submit_question_btn.jsx";

const maxQuestions = 10;
const noteLength = "4n"; //Quarter note
const defaultOctave: octave = 3;

export default function IntonationQuizPage() {
  return (
    <>
      <Header />
      <IntonationQuizContent />
      <Footer />
    </>
  );
}

export function IntonationQuizContent() {
  const questionText = "Select an answer choice to identify the major scale.";
  const [questionsCompleted, setQuestionsCompleted] = useState<number>(1);

  const [currentQuestion, setCurrentQuestion] = useState<IntonationQuestion>(
    () => quizLogic.createIntonationQuestion(questionText),
  );

  currentQuestion.text = `The intended note is ${currentQuestion.noteToPlay}. Determine whether it is Sharp, Flat, or In Tune.`

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  //play note
  useEffect(() => {
    const synth = new tone.Synth().toDestination();

    // Determines how to adjust the pitch depending on the correct answer
    let modifier = 0;
    if (currentQuestion.correctAnswer === "Flat") {
      modifier = -40;
    } else if (currentQuestion.correctAnswer === "Sharp") {
      modifier = +40;
    }

    //adjust the pitch using the modifier
    synth.detune.value = modifier

    synth.triggerAttackRelease(
      currentQuestion.noteToPlay + defaultOctave,
      noteLength,
    );

    return () => {
      synth.dispose();
      setIsPlaying(false);
    };
  }, [currentQuestion, isPlaying]);

  const [questionsCorrect, setQuestionsCorrect] = useState<number>(0);

  const quizData = {
    correct: questionsCorrect,
    numQuestions: maxQuestions,
    quizEndpoint: "/intonation/",
  };

  // Return to quiz selection if max questions have been reached
  if (questionsCompleted > maxQuestions) {
    return <Navigate to="/quizzes/complete" replace={true} state={quizData} />;
  }

  function handleAnswer(selected: PitchModifier) {
    if (selected === currentQuestion.correctAnswer) {
      setQuestionsCorrect(questionsCorrect + 1);
    }

    setQuestionsCompleted(questionsCompleted + 1);

    setCurrentQuestion((prev) => ({
      ...prev,
      isAnswered: true,
      selectedAnswer: selected,
    }));

    nextQuestion();
  }

  function nextQuestion() {
    setCurrentQuestion(quizLogic.createIntonationQuestion(questionText));
  }

  function toggleIsPlaying() {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  }

  return (
    <div className="content-container">
      <div className="quiz-text__container">
        <h2 className="quiz-text">{currentQuestion.text}</h2>
        <SubmitQuestionButton onClick={currentQuestion.selectedAnswer? nextQuestion : null}/>
      </div>

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
        {currentQuestion.options.map((pitchModifier) => (
          <button
            key={pitchModifier}
            className="quiz-option-btn"
            onClick={() => handleAnswer(pitchModifier)}
          >
            {pitchModifier}
          </button>
        ))}
      </div>
    </div>
  );
}
