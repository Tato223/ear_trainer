import SubmitQuestionButton from "../components/submit_question_btn.jsx";
import * as quizLogic from "../quiz_logic.ts";
import * as types from "../types.ts";
import { useEffect, useState } from "react";
import * as tone from "tone";
import { Navigate } from "react-router";
import SpeakerButton from "../components/speaker_button.jsx";
import * as audioConfig from "../audio_config.ts";

export default function QuizPageContent({
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

    if (isPlaying) return;

    const synth = new tone.Synth().toDestination();

    if (quizType.name == "PitchRecognitionQuiz" && !isPlaying) {
      audioConfig.playSingleNote(
        currentQuestion,
        setIsPlaying,
        quizType.defaultOctave,
        quizType.noteDurationSeconds,
      );
      
    } else if (quizType.name === "MajorScalesQuiz" && !isPlaying) {

      const correctScaleNotes: types.Note[] =
        currentQuestion.correctAnswer.Notes;

      let seenBorBb: types.Note[] = []
      let seenNotes: types.Note[] = []

      correctScaleNotes.forEach((note: types.Note, index: number) => {
        audioConfig.playScale(
          note,
          index,
          quizType.defaultOctave,
          quizType.noteDurationSeconds,
          seenBorBb,
          seenNotes,
          setIsPlaying
        );}
    )
      
    } else if (quizType.name === "IntervalsQuiz" && !isPlaying) {
      const intervalNotes: types.Note[] = currentQuestion.intervalNotes;
      let octave: types.octave = quizType.defaultOctave;
      let prevOrderedIndex: null | number = 0;

      intervalNotes.forEach((note, index) => {
        audioConfig.playInterval(
          note,
          prevOrderedIndex,
          index,
          octave,
          synth,
          quizType.noteDurationSeconds,
        );
      });

    } else if (quizType.name === "IntonationQuiz" && !isPlaying) {
      audioConfig.playNoteWithPitchModifer(
        synth,
        currentQuestion,
        setIsPlaying,
        quizType.defaultOctave,
        quizType.noteDurationSeconds,
      );
    }

    return () => {
      synth.dispose()
      setIsPlaying(false)
    }
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
    setCurrentQuestion(createQuestion());
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
            {typeof option === typeof types.A_Major_Scale
              ? option.Name
              : option.toString()}
          </button>
        ))}
      </div>
    </div>
  );
}
