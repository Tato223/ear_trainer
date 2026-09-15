import Header from "../../components/header.jsx";
import QuizPageContent from "../../components/quiz_page_content.tsx";
import Footer from "../../components/footer.jsx";
import * as types from "../../types.ts";

export default function PitchRecognitionQuizPage() {
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