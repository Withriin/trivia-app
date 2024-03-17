import {useContext, useEffect, useState} from "react";
import DisplayText from "./DisplayText.tsx";
import strategyContext from "../../context/StrategyContext.tsx";

const ScoreDisplay = () => {
    const strategy = useContext(strategyContext);
    const [currentScore, setCurrentScore] = useState(strategy?.getScore());
    const [currentMaxQuestions, setCurrentMaxQuestion] = useState(strategy?.getSize());

    useEffect(() => {
        const updateScore = () => {
            setCurrentScore(strategy?.getScore());
        };

        const updateMaxQuestions = () => {
            setCurrentMaxQuestion(strategy?.getSize());
        };

        strategy?.addUpdateListener(updateMaxQuestions);
        strategy?.addUpdateListener(updateScore);

        return () => {
            strategy?.removeUpdateListener(updateMaxQuestions);
            strategy?.removeUpdateListener(updateScore);
        };

    }, [strategy]);
    return (
        <>
            <DisplayText variant={'game'}>Score: {currentScore} / {currentMaxQuestions}</DisplayText>
        </>
    )
}
export default ScoreDisplay
