import { useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { createBrowserRouter, Route } from 'react-router'
import { RouterProvider } from 'react-router/dom'


// Page componenents
import './App.css'
import Home from './pages/home'
import Quizzes from './pages/quizzes'
import EndlessPage from './pages/endless_page'
import LeaderboardPage from './pages/leaderboard_page'
import LibraryPage from './pages/library_page'
import SignupPage from './pages/sign_up_page'
import LoginPage from './pages/login_page'

const router = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/quizzes", element: <Quizzes/>},
  {path: "/endless", element: <EndlessPage/>},
  {path: "/leaderboard", element: <LeaderboardPage/>},
  {path: "/library", element: <LibraryPage/>},
  {path: "/auth/signup", element: <SignupPage/>},
  {path: "/auth/login", element: <LoginPage/>}
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App