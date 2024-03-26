import TopicBar from "../components/ui/TopicBar.tsx";
import TriviaGameCard from "../components/ui/TriviaGameCard.tsx";
import styles from "./GameArea.module.css";
import FlashCard from "../components/ui/FlashCard.tsx";

const GameArea = () => {
       return(
        <>
            <div className={styles.topicBar}>
                <TopicBar />
            </div>
            <TriviaGameCard />
        </>
    );
};
export default GameArea
