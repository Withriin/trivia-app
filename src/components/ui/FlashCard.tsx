import { useContext, useEffect, useState } from "react";
import strategyContext from "../../context/StrategyContext.tsx";
import styles from './Card.module.css';
import Button from "./Button.tsx";
import DisplayText from "./DisplayText.tsx";
// Import additional styles for flipping effect


const Card = () => {
    const strategy = useContext(strategyContext);
    const [currentCard, setCurrentCard] = useState(strategy?.getCard());
    const [isFlipped, setIsFlipped] = useState(false);

    // Toggle function to flip the card
    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };
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
    useEffect(() => {

    },);
    return (
        <div className={styles.container}>
            <div className={styles.controlsLeft}>
                <Button onClick={handlePrevClick} isDisabled={isFirstCard()}>Previous</Button>
            </div>
            <div className={`${styles.flipCard} ${isFlipped ? 'is-flipped' : ''}`} onClick={toggleFlip}>
                <div className={styles.flipCardInner}>
                    <div className={`${styles.cardFront} ${styles.card}`}>
                        {/* Render question here */}
                        <div className={styles.questionSection}>
                            <DisplayText>
                                {strategy?.getQuestion()}
                            </DisplayText>
                        </div>
                    </div>
                    <div className={`${styles.cardBack} ${styles.card}`}>
                        {/* Render answer here */}
                        <div className={styles.flashAnswerSection}>
                           <DisplayText>
                               {strategy?.getCorrectAnswerText()}
                           </DisplayText>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.controlsRight}>
                <Button onClick={handleNextClick} isDisabled={isLastCard()}>Next</Button>
            </div>
        </div>
    );
};

export default Card;