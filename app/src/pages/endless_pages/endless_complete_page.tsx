import Header from "../../components/header";
import Footer from "../../components/footer";
import { Navigate, useLocation, useNavigate } from "react-router";

export default function EndlessCompletePage() {
  return (
    <>
      <Header />
      <EndlessQuizCompleteContent />
      <Footer />
    </>
  );
}

export function EndlessQuizCompleteContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const quizData = location.state;

  if (quizData === null) {
    return <Navigate to="/endless/" replace />;
  }

  const retryQuiz = () => {
    navigate(`/endless${quizData?.quizEndpoint}/`);
  };

  const returnToQuizSelect = () => {
    navigate("/endless");
  };

  return (
    <div className="content-container">
      <h1 className="quiz-completion-text">You have completed an Endless Mode quiz!</h1>
      <h2 className="quiz-completion-subtitle">
        Select an option below to retry or select a new category.
      </h2>

      <h3 className="quiz-score-text">
        Your Score: {quizData?.correct}
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
