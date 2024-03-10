import TopicBar from "../components/ui/TopicBar.tsx";
import Card from "../components/ui/Card.tsx";
import styles from "./GameArea.module.css";

const GameArea = () => {
       return(
        <>
            <div className={styles.topicBar}>
                <TopicBar />
            </div>
            <Card />
        </>
    );
};
export default GameArea
