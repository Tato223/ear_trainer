import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import SubmitQuestionButton from "../../components/submit_question_btn.jsx";
import * as quizLogic from "../../quiz_logic.ts";
import * as types from "../../types.ts";
import { useEffect, useState } from "react";
import * as tone from "tone";
import { Navigate } from "react-router";
import SpeakerButton from "../../components/speaker_button.jsx";
import * as audioConfig from "../../audio_config.ts";

export default function QuizPage() {
  return (
    <>
      <Header />
      <QuizPageContent
        quizType={types.PitchRecognitionQuiz}
        maxQuestions={10}
      />
      <Footer />
    </>
  );
}

export function QuizPageContent({
  quizType,
  maxQuestions = 10,
}: types.QuizProps) {
  const [questionsCompleted, setQuestionsCompleted] = useState<number>(1);
  const [questionsCorrect, setQuestionsCorrect] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<
    typeof quizType.optionsType | null
  >(null);

    const questionCreationFunctions = {
    PitchRecognitionQuiz: quizLogic.createPitchRecognitionQuestion,
    MajorScalesQuiz: quizLogic.createMajorScaleQuestion,
    IntervalsQuiz: quizLogic.createIntervalQuestion,
    IntonationQuiz: quizLogic.createIntonationQuestion,
  };

  type QuizName = keyof typeof questionCreationFunctions;

  function getQuestionCreationFunction(quizName: QuizName): any {
    if (quizName in questionCreationFunctions) {
      return questionCreationFunctions[quizName];
    }
  }

  let createQuestion = getQuestionCreationFunction(quizType.name);
  
  const [currentQuestion, setCurrentQuestion] = useState<any>(() =>
    createQuestion(quizType.questionText),
  );

  // play correct pitch
  useEffect(() => {
    if (quizType.name == "PitchRecognitionQuiz") {
      audioConfig.playSingleNote(
        currentQuestion,
        setIsPlaying,
        quizType.defaultOctave,
        quizType.noteLength,
      );
    }

    if (quizType.name === "MajorScalesQuiz") {
      const synth = new tone.Synth().toDestination();
      const correctScaleNotes: types.Note[] =
        currentQuestion.correctAnswer.Notes;

      let prevOrderedIndex: number | null = null;
      const seenBorBb: types.Note[] = [];
      const seenNotes: types.Note[] = [];

      correctScaleNotes.forEach((note: types.Note, index: number) => {
        audioConfig.playScale(
          seenBorBb,
          seenNotes,
          note,
          prevOrderedIndex,
          index,
          synth,
          quizType.defaultOctave,
          quizType.noteLength,
        );
      });
    }

    if (quizType.name === "IntervalsQuiz") {
      const synth = new tone.Synth().toDestination();
      const intervalNotes: types.Note[] = currentQuestion.intervalNotes;
      let octave: types.octave = quizType.defaultOctave;
      let prevOrderedIndex: null | number = null;

      intervalNotes.forEach((note, index) => {
        audioConfig.playInterval(
          note,
          prevOrderedIndex,
          index,
          octave,
          synth,
          quizType.noteLength,
        );
      });
    }

    // Add expressions for all other playback function types
  }, [currentQuestion, isPlaying]);

  const quizData = {
    correct: questionsCorrect,
    numQuestions: maxQuestions,
    quizEndpoint: quizType.quizEndpoint,
  };

  // Navigate to complete page if max questions have been reached
  if (questionsCompleted > maxQuestions) {
    return (
      <Navigate to={"/quizzes/complete/"} replace={true} state={quizData} />
    );
  }

  function handleAnswer() {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setQuestionsCorrect(questionsCorrect + 1);
    }

    setQuestionsCompleted(questionsCompleted + 1);
    setCurrentQuestion((prev: any) => ({
      ...prev,
      isAnswered: true,
      selectedAnswer: selectedAnswer,
    }));

    nextQuestion();
    setSelectedAnswer(null);
  }

  function nextQuestion() {
    setCurrentQuestion(
      quizLogic.createPitchRecognitionQuestion(quizType.questionText),
    );
  }
  function toggleIsPlaying() {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  }

  return (
    <div className="content-container">
      <div className="quiz-text__container">
        <h2 className="quiz-text">{currentQuestion.text}</h2>
        <SubmitQuestionButton
          className={
            selectedAnswer
              ? "question-submit-btn-active"
              : "question-submit-btn-inactive"
          }
          onClick={selectedAnswer ? handleAnswer : null}
        />
      </div>

      <SpeakerButton onClick={toggleIsPlaying} />

      <div className="quiz-options-container">
        {currentQuestion.options.map((option: any) => (
          <button
            key={option}
            className={
              option === selectedAnswer
                ? "quiz-option-btn__selected"
                : "quiz-option-btn"
            }
            onClick={() =>
              selectedAnswer === option
                ? setSelectedAnswer(null)
                : setSelectedAnswer(option)
            }
          >
            {option.toString()}
          </button>
        ))}
      </div>
    </div>
  );
}

// Make variants for different playback types, then assign the audio function based on the quizType above
