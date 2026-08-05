import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import * as quizLogic from "../../quiz_logic.ts";
import { Scale, MajorScaleQuestion, Note, orderedNotes } from "../../types.ts";
import { useEffect, useState } from "react";
import * as tone from "tone";
import { useNavigate } from "react-router";

const noteLength = "8n"; //Eighth note
const defaultOctave = 3;
const indexOfBb = 15;

export default function EndlessScalesPage() {
  return (
    <>
      <Header />
      <EndlessScalesPageContent />
      <Footer />
    </>
  );
}

export function EndlessScalesPageContent() {
  let questionText = "Select an answer choice to identify the Major Scale.";

  const [currentQuestion, setCurrentQuestion] =
    useState<MajorScaleQuestion>(() =>
      quizLogic.createMajorScaleQuestion(questionText),
    );

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const navigate = useNavigate()

  const playScale = useEffect(() => {
    
      const synth = new tone.Synth().toDestination();
      const correctScaleNotes: Note[] = currentQuestion.correctAnswer.Notes;
  
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

  const [questionsCorrect, setQuestionsCorrect] =
    useState<number>(0);

  const quizData = {
    correct: questionsCorrect,
    quizEndpoint: "/major_scales",
  };

  function handleAnswer(selected: Scale): void {

    const isAnswerCorrect: boolean = (selected == currentQuestion.correctAnswer)

    // end quiz if an answer is correct
    if (!isAnswerCorrect) {
        navigate("/endless/complete", {replace: true, state: quizData})
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

  /*
  function getRandomOctave(): number {
    return Math.floor(( Math.random() + 1) * 8);
  }
  */

  function nextQuestion() {
    setCurrentQuestion(
      quizLogic.createMajorScaleQuestion(questionText),
    );
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
