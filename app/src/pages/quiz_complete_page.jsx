import Header from "../components/header";
import Footer from "../components/footer";
import { Navigate, useNavigate } from "react-router";

export default function QuizCompletePage() {
  return (
    <>
      <Header />
      <QuizCompleteContent />
      <Footer />
    </>
  );
}

export function QuizCompleteContent(quizScore, totalQuestions, numCorrect) {
  const navigate = useNavigate();

  const retryQuiz = () => {
    navigate("/quizzes/pitch_recognition");
  };

  const returnToQuizSelect = () => {
    navigate("/quizzes");
  };

  return (
    <div className="content-container">
      <h1 className="quiz-completion-text">You have completed a quiz!</h1>
      <h2 className="quiz-completion-subtitle">
        Select an option below to retry or select a new quiz.
      </h2>

      <h3 className="quiz-score-text">Your Score: insert score here</h3>
      <h3 className="correct-questions-text">
        numcorrect out of totalquestions correct.
      </h3>

      <div className="quiz-complete-btns-container">
        <button className="quiz-retry-btn" onClick={retryQuiz}>
          Retry
        </button>

        <button className="quiz-return-btn" onClick={returnToQuizSelect}>
          Select a different Quiz
        </button>
      </div>
    </div>
  );
}
