import {useContext, useEffect, useState} from "react";
import DisplayText from "./DisplayText.tsx";
import Button from "./Button.tsx";
import DisplayAnswers from "./DisplayAnswers.tsx";
import strategyContext from "../../context/StrategyContext.tsx";
import styles from './Card.module.css'



const Card = () => {
    const strategy = useContext(strategyContext);
    const [currentCard, setCurrentCard] = useState(strategy?.getCard());
    const [postQuestionText, setPostQuestionText] = useState(()  => {return strategy?.getPostQuestionText()});

    const handleNextClick  = () => {
        strategy?.nextCard();
        setCurrentCard(strategy?.getCard());
    };

    const isFirstCard = () : boolean => {
        return !currentCard?.prev;
    }

    const isLastCard = () : boolean => {
        return !currentCard?.next;
    }

    const handlePrevClick = () => {
        strategy?.prevCard();
        setCurrentCard(strategy?.getCard());
    };

    const handleAnswerClick = (answerId: number) => {
       strategy?.checkAnswer(answerId);
       setCurrentCard(strategy?.getCard());
    }

    useEffect(() => {
        setCurrentCard(strategy?.getCard());
        setPostQuestionText(strategy?.getPostQuestionText());
        const updateCard = () => {
            setCurrentCard(strategy?.getCard());
        };

        const updatePostQuestionText = () => {
            setPostQuestionText(strategy?.getPostQuestionText());
        }

        strategy?.addUpdateListener(updateCard);
        strategy?.addUpdateListener(updatePostQuestionText);


        return () => {
            strategy?.removeUpdateListener(updateCard);
            strategy?.removeUpdateListener(updatePostQuestionText);


        };
    }, [strategy]);

    return (
        <>
            <div className={styles.card}>
                <div className={styles.questionSection}>
                    <DisplayText>
                        {`${strategy?.getQuestion()}${strategy?.getIsAnswered() ? `   ${postQuestionText}` : ""}`}
                    </DisplayText>

                </div>
                <div className={styles.answerControlSection}>
                    <div className={styles.controlsLeft}>
                        <Button onClick={handlePrevClick} isDisabled={isFirstCard()}>Previous</Button>
                    </div>
                    <div className={styles.answerBox}>
                        <DisplayAnswers onAnswerClick={handleAnswerClick} />
                    </div>
                    <div className={styles.controlsRight}>
                        <Button onClick={handleNextClick} isDisabled={isLastCard()}>Next</Button>
                    </div>
                </div>

            </div>
        </>
    );
};
export default Card
