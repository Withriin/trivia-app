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
                <DisplayText>Topic - Computer Science</DisplayText> <ScoreDisplay /> <Button onClick={handlePlayAgainClick} variant={'default'}>Play Again</Button>
            </div>
        </>
    )
}
export default TopicBar
