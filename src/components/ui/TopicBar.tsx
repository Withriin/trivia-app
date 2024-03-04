import {useContext} from "react";
import DisplayText from "./DisplayText.tsx";
import ScoreDisplay from "./ScoreDisplay.tsx";
import Button from "./Button.tsx";
import strategyContext from "../../context/StrategyContext.tsx";

const TopicBar = () => {
    const strategy = useContext(strategyContext);
    return (
        <>
            <div>
                <DisplayText>Topic</DisplayText> <ScoreDisplay /> <Button onClick={strategy?.reset} >Reset</Button>
            </div>
        </>
    )
}
export default TopicBar
