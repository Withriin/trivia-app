import { useState } from 'react'
import './App.css'
import Header from "./components/ui/Header.tsx";
import GameArea from "./pages/GameArea.tsx";
import Footer from "./components/ui/Footer.tsx";
import {ConcreteTriviaStrategy, StrategyComponent} from "./features/gameLogic/StrategyComponent.tsx";
import {Repository} from "./utils/Repository.tsx";


function App() {
  const repository = new Repository();
  const concreteStrategy = new ConcreteTriviaStrategy();
  const strategy = new StrategyComponent(repository, concreteStrategy);
  return (
    <>
      <Header />
        <GameArea />
        <Footer />
        </>
  )
}


export default App
