import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import SubmitQuestionButton from "../../components/submit_question_btn.jsx";
import * as quizLogic from "../../quiz_logic.ts";
import { PitchRecognitionQuestion, NaturalNote } from "../../types.ts";
import { useEffect, useState } from "react";
import * as tone from "tone";
import { Navigate } from "react-router";
import SpeakerButton from "../../components/speaker_button.jsx";

const maxPitchRecognitionQuestions = 10;
const noteLength = "4n"; //Quarter note

export default function QuizPage() {
  return (
    <>
      <Header />
      <QuizPageContent/>
      <Footer />
    </>
  );
}

export function QuizPageContent() {
  let questionText = "Select an answer choice to identify the note.";
  const [questionsCompleted, setQuestionsCompleted] = useState<number>(1);

  const [currentQuestion, setCurrentQuestion] =
    useState<PitchRecognitionQuestion>(() =>
      quizLogic.createPitchRecognitionQuestion(questionText),
    );

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [selectedAnswer, setSelectedAnswer] = useState<NaturalNote | null>(
    null,
  );

  // play correct pitch
  useEffect(() => {
    const synth = new tone.Synth().toDestination();
    synth.triggerAttackRelease(currentQuestion.correctAnswer + "4", noteLength);

    return () => {
      synth.dispose();
      setIsPlaying(false);
    };
  }, [currentQuestion, isPlaying]);

  const [questionsCorrect, setPitchRecognitionQuestionsCorrect] =
    useState<number>(0);

  const quizData = {
    correct: questionsCorrect,
    numQuestions: maxPitchRecognitionQuestions,
    quizEndpoint: "/pitch_recognition",
  };

  // Navigate to complete page if max questions have been reached
  if (questionsCompleted > maxPitchRecognitionQuestions) {
    return <Navigate to="/quizzes/complete" replace={true} state={quizData} />;
  }

  //TODO: Change logic to only check correctness after a submit
  function handleAnswer() {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setPitchRecognitionQuestionsCorrect(questionsCorrect + 1);
    }

    setQuestionsCompleted(questionsCompleted + 1);

    setCurrentQuestion((prev) => ({
      ...prev,
      isAnswered: true,
      selectedAnswer: selectedAnswer,
    }));

    nextQuestion();

    setSelectedAnswer(null);
  }

  function nextQuestion() {
    setCurrentQuestion(quizLogic.createPitchRecognitionQuestion(questionText));
  }

  function toggleIsPlaying() {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  }

  return (
    <div className="content-container">
      <div className="quiz-text__container">
        <h2 className="quiz-text">{currentQuestion.text}</h2>
        <SubmitQuestionButton className={selectedAnswer? "question-submit-btn-active" : "question-submit-btn-inactive"}
        onClick={selectedAnswer ? handleAnswer : null} />
      </div>

      <SpeakerButton onClick={toggleIsPlaying}/>

      <div className="quiz-options-container">
        {currentQuestion.options.map((note) => (
          <button
            key={note}
            className={
              note === selectedAnswer ? "quiz-option-btn__selected" : "quiz-option-btn"}
            onClick={() => selectedAnswer === note? setSelectedAnswer(null) : setSelectedAnswer(note)}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
}
