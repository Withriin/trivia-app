//import { useState } from 'react'
import './App.css'
import Header from "./components/ui/Header.tsx";
import GameArea from "./pages/GameArea.tsx";
import Footer from "./components/ui/Footer.tsx";
import StrategyProvider from "./context/StrategyProvider.tsx";


function App() {
  return (
      <StrategyProvider>
        <div className="app-container">
          <Header />
          <GameArea />
          <Footer />
        </div>
      </StrategyProvider>
  )
}


export default App
