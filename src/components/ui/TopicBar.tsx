import {useContext} from "react";
import DisplayText from "./DisplayText.tsx";
import ScoreDisplay from "./ScoreDisplay.tsx";
import Button from "./Button.tsx";
import strategyContext from "../../context/StrategyContext.tsx";

const TopicBar = () => {
    const strategy = useContext(strategyContext);

    const handlePlayAgainClick = () =>{
        strategy?.reset();
    }

    return (
        <>
            <div>
                <DisplayText>Computer Science</DisplayText> <ScoreDisplay /> <Button onClick={handlePlayAgainClick} >Play Again</Button>
            </div>
        </>
    )
}
export default TopicBar
