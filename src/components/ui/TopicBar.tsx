import {useContext} from "react";
import DisplayText from "./DisplayText.tsx";
import ScoreDisplay from "./ScoreDisplay.tsx";
import Button from "./Button.tsx";
import strategyContext from "../../context/StrategyContext.tsx";import styles from "./TopicBar.module.css";

const TopicBar = () => {
    const strategy = useContext(strategyContext);

    const handlePlayAgainClick = () =>{
        strategy?.reset();
    }

    return (
        <>
            <div className={styles.topicBar}>
                <div className={styles.topic}>
                    <DisplayText variant={'game'}>Topic - Computer Science</DisplayText>
                </div>
                <div className={styles.scoreDisplay}>
                    <ScoreDisplay />
                </div>
                <div className={styles.playAgainButton}>
                    <Button onClick={handlePlayAgainClick} variant={'default'}>Play Again</Button>
                </div>
            </div>
        </>
    )
}
export default TopicBar
