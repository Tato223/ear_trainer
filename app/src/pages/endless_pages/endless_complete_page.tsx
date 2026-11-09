import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../auth_context.jsx";

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
  const { token } = useAuth();

  const quizData = location.state;

  async function postHighscore() {
    const url = `http://127.0.0.1:8000/highscore/?category=${quizData?.category}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        value: quizData?.correct,
        category: quizData?.category,
      }),
    });
    return response;
  }

  useEffect(() => {
    postHighscore();
  }, []);

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
      <h1 className="quiz-completion-text">
        You have completed an Endless Mode quiz!
      </h1>
      <h2 className="quiz-completion-subtitle">
        Select an option below to retry or select a new category.
      </h2>

      <h3 className="quiz-score-text">Your Score: {quizData?.correct}</h3>

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
