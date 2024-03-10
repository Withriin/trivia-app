import {useContext, useEffect, useState} from "react";
import DisplayText from "./DisplayText.tsx";
import Button from "./Button.tsx";
import DisplayAnswers from "./DisplayAnswers.tsx";
import strategyContext from "../../context/StrategyContext.tsx";
import styles from './Card.module.css'



const Card = () => {
    const strategy = useContext(strategyContext);
    const [currentCard, setCurrentCard] = useState(strategy?.getCard());
    const handleNextClick  = () => {
        strategy?.nextCard();
        setCurrentCard(strategy?.getCard());
    };

    const handlePrevClick = () => {
        strategy?.prevCard();
        setCurrentCard(strategy?.getCard());
    };

    const handleAnswerClick = (answerId: number) => {
       strategy?.checkAnswer(answerId);
    }

    useEffect(() => {
        setCurrentCard(strategy?.getCard());
        const updateCard = () => {
            setCurrentCard(strategy?.getCard());
        };

        strategy?.addUpdateListener(updateCard);

        return () => {
            strategy?.removeUpdateListener(updateCard);
        };
    }, [strategy]);

    return (
        <>
            <div className={styles.card}>
                <div className={styles.questionSection}>
                    <DisplayText>{currentCard?.data.question}</DisplayText>
                </div>
                <div className={styles.answerControlSection}>
                    <div className={styles.controlsLeft}>
                        <Button onClick={handlePrevClick}>Previous</Button>
                    </div>
                    <div className={styles.answerBox}>
                        <DisplayAnswers onAnswerClick={handleAnswerClick} />
                    </div>
                    <div className={styles.controlsRight}>
                        <Button onClick={handleNextClick}>Next</Button>
                    </div>
                </div>

            </div>
        </>
    );
};
export default Card
