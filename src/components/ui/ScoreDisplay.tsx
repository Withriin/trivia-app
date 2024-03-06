import {useContext, useEffect, useState} from "react";
import DisplayText from "./DisplayText.tsx";
import strategyContext from "../../context/StrategyContext.tsx";

const ScoreDisplay = () => {
    const strategy = useContext(strategyContext);
    const [currentScore, setCurrentScore] = useState(strategy?.getScore());


    useEffect(() => {
        const updateScore = () => {
            setCurrentScore(strategy?.getScore());
        };

        strategy?.addUpdateListener(updateScore);

        return () => {
            strategy?.removeUpdateListener(updateScore);
        };

    }, [strategy]);
    return (
        <>
            <DisplayText>{currentScore}</DisplayText>
        </>
    )
}
export default ScoreDisplay
