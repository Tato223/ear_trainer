import { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { createBrowserRouter, Route } from "react-router";
import { RouterProvider } from "react-router/dom";
import * as Tone from "tone";

//Context Providers
import { AuthProvider } from "./auth_context";

// Page componenents
import "./App.css";
import Home from "./pages/nav_pages/home";
import Quizzes from "./pages/nav_pages/quizzes";
import EndlessPage from "./pages/nav_pages/endless_page";
import EndlessQuizPage from "./pages/endless_pages/endless_pr";
import LeaderboardPage from "./pages/nav_pages/leaderboard_page";
import LibraryPage from "./pages/nav_pages/library_page";
import SignupPage from "./pages/sign_up_page";
import LoginPage from "./pages/login_page";
import QuizPage from "./pages/quizzes/quiz_page";
import ScaleQuizPage from "./pages/quizzes/scale_quiz_page";
import IntervalQuizPage from "./pages/quizzes/interval_quiz_page";
import QuizCompletePage from "./pages/quiz_complete_page";
import EndlessCompletePage from "./pages/endless_pages/endless_complete_page";
import EndlessScalesPage from "./pages/endless_pages/endless_major_scales";
import EndlessIntervalsPage from "./pages/endless_pages/endless_intervals";
import IntonationQuizPage from "./pages/quizzes/intonation_quiz_page";
import EndlessIntonationPage from "./pages/endless_pages/endless_intonation";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  //quizzes
  { path: "/quizzes", element: <Quizzes /> },
  { path: "/quizzes/pitch_recognition/", element: <QuizPage /> },
  { path: "/quizzes/major_scales/", element: <ScaleQuizPage /> },
  { path: "/quizzes/intervals/", element: <IntervalQuizPage /> },
  { path: "/quizzes/intonation/", element: <IntonationQuizPage /> },
  { path: "/quizzes/complete/", element: <QuizCompletePage /> },

  //endless mode
  { path: "/endless/", element: <EndlessPage /> },
  { path: "/endless/pitch_recognition/", element: <EndlessQuizPage /> },
  { path: "/endless/major_scales/", element: <EndlessScalesPage /> },
  { path: "/endless/intervals/", element: <EndlessIntervalsPage /> },
  { path: "/endless/intonation/", element: <EndlessIntonationPage /> },
  { path: "/endless/complete/", element: <EndlessCompletePage /> },

  //leaderboard
  { path: "/leaderboard/", element: <LeaderboardPage /> },

  //library
  { path: "/library/", element: <LibraryPage /> },

  //auth
  { path: "/auth/signup/", element: <SignupPage /> },
  { path: "/auth/login/", element: <LoginPage /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
