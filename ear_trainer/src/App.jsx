import { useState } from 'react'
import Header from './components/header'
import Content from './components/content'
import Footer from './components/footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Content/>
      <Footer/>
    </>
  )
}

export default App
