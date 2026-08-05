import Header from "../../components/header";
import Footer from "../../components/footer";
import * as quizLogic from "../../quiz_logic.ts";
import { Scale, MajorScaleQuestion, orderedNotes, Note } from "../../types.ts";
import { useEffect, useState } from "react";
import * as tone from "tone";
import { Navigate } from "react-router";

const maxQuestions = 10;
const noteLength = "8n"; //Eighth note
const defaultOctave = 3;
const indexOfBb = 15;

export default function ScaleQuizPage() {
  return (
    <>
      <Header />
      <ScaleQuizPageContent />
      <Footer />
    </>
  );
}

export function ScaleQuizPageContent() {
  const quizType = "Major Scale";

  const questionText = "Select an answer choice to identify the major scale.";
  const [questionsCompleted, setQuestionsCompleted] = useState<number>(1);

  const [currentQuestion, setCurrentQuestion] = useState<MajorScaleQuestion>(
    () => quizLogic.createMajorScaleQuestion(questionText),
  );

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playScale = useEffect(() => {
    const synth = new tone.Synth().toDestination();
    const correctScaleNotes: Note[] = currentQuestion.correctAnswer.Notes;

    /*
    1. Store the current note's index in orderedNotes as currOrderedIndex
    2. Compare currOrderedIndex to prev ordered index (if any)
    3. if currOrderedIndex < prevOrderedIndex -> raise the octave for all future notes

    problem: Inside a for each loop, How can I preserve a value from past iterations?

    Solution: Check whether a note has been visited, if B or Bb has been visited,
    and if the current index is less than Bb's index in the static orderNotes array.
    If so, raise the octave by one.
    */

    let prevOrderedIndex: number | null = null;
    const seenBorBb: Note[] = [];
    const seenNotes: Note[] = [];

    correctScaleNotes.forEach((note, index) => {

      let octave = defaultOctave;
      let currOrderedIndex = orderedNotes.indexOf(note);

      if (
        (prevOrderedIndex && currOrderedIndex < prevOrderedIndex) ||
        (currOrderedIndex < indexOfBb && seenBorBb.length > 0) ||
        seenNotes.includes(note)
      ) {
        octave++;
        
      } else {
        octave = defaultOctave;
      }

      prevOrderedIndex = currOrderedIndex;

      const scheduledTime = tone.now() + index * 0.25;

      synth.triggerAttackRelease(`${note}${octave}`, noteLength, scheduledTime);

      if (note === "B" || note === "Bb") {
        seenBorBb.push(note);
      }

      seenNotes.push(note);
    });

    return () => {
      synth.dispose();
      setIsPlaying(false);
    };
  }, [currentQuestion, isPlaying]);

  const [questionsCorrect, setQuestionsCorrect] = useState<number>(0);

  const quizData = {
    correct: questionsCorrect,
    numQuestions: maxQuestions,
    quizEndpoint: "/major_scales/",
  };

  // Return to quiz selection if max questions have been reached
  if (questionsCompleted > maxQuestions) {
    return <Navigate to="/quizzes/complete" replace={true} state={quizData} />;
  }

  function handleAnswer(selected: Scale) {
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

  /*
  function getRandomOctave(): number {
    return Math.floor(( Math.random() + 1) * 8);
  }
  */

  function nextQuestion() {
    setCurrentQuestion(quizLogic.createMajorScaleQuestion(questionText));
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
        {currentQuestion.options.map((scale) => (
          <button
            key={scale.Name}
            className="quiz-option-btn"
            onClick={() => handleAnswer(scale)}
          >
            {scale.Name}
          </button>
        ))}
      </div>
    </div>
  );
}
