import { useState } from 'react'
import Header from './components/header'
import Content from './components/home-content'
import Footer from './components/footer'
import { createBrowserRouter, Route } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import './App.css'
import Home from './pages/home'
import Quizzes from './pages/quizzes'
import EndlessPage from './pages/endless_page'

const router = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/quizzes", element: <Quizzes/>},
  {path: "/endless", element: <EndlessPage/>},
  {path: "/leaderboard", element: <Home/>},
  {path: "/library", element: <Home/>}
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App