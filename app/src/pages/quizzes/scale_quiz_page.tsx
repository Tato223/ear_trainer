import QuizPageContent from "../../components/quiz_page_content.tsx";
import Header from "../../components/header";
import Footer from "../../components/footer";
import * as types from "../../types.ts";

export default function IntonationQuizPage() {
  return (
    <>
      <Header />
      <QuizPageContent
        quizType={types.MajorScalesQuiz}
        maxQuestions={10}
      />
      <Footer />
    </>
  );
}