import { useState } from 'react'
import './App.css'
import Header from "./components/ui/Header.tsx";
import GameArea from "./pages/GameArea.tsx";
import Footer from "./components/ui/Footer.tsx";

function App() {

  return (
    <>
      <Header />
        <GameArea />
        <Footer />
        </>
  )
}


export default App
