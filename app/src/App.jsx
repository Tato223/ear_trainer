import { useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { createBrowserRouter, Route } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import * as Tone from 'tone'


// Page componenents
import './App.css'
import Home from './pages/nav_pages/home'
import Quizzes from './pages/nav_pages/quizzes'
import EndlessPage from './pages/nav_pages/endless_page'
import EndlessQuizPage from './pages/endless_pages/endless_pr'
import LeaderboardPage from './pages/nav_pages/leaderboard_page'
import LibraryPage from './pages/nav_pages/library_page'
import * as SignupPage from './pages/sign_up_page'
import LoginPage from './pages/login_page'
import QuizPage from './pages/quizzes/quiz_page'
import ScaleQuizPage from './pages/quizzes/scale_quiz_page'
import QuizCompletePage from './pages/quiz_complete_page'
import EndlessCompletePage from './pages/endless_pages/endless_complete_page'

const router = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/quizzes", element: <Quizzes/>},
  {path: "/quizzes/pitch_recognition", element: <QuizPage/>},
  {path: "/quizzes/major_scales", element: <ScaleQuizPage/>},
  {path: "/quizzes/complete", element: <QuizCompletePage/>},
  {path: "/endless", element: <EndlessPage/>},
  {path: "/endless/pitch_recognition", element: <EndlessQuizPage/>},
  {path: "/endless/complete", element: <EndlessCompletePage/>},
  {path: "/leaderboard", element: <LeaderboardPage/>},
  {path: "/library", element: <LibraryPage/>},
  {path: "/auth/signup", element: <SignupPage/>},
  {path: "/auth/login", element: <LoginPage/>}
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App