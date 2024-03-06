import {useContext, useEffect, useState} from "react";
import DisplayText from "./DisplayText.tsx";
import Button from "./Button.tsx";
import DisplayAnswers from "./DisplayAnswers.tsx";
import strategyContext from "../../context/StrategyContext.tsx";



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

    //Todo Remove unneeded divs, replace with proper CSS.
    return (
        <>
            <div>
                <div><DisplayText>{currentCard?.data.question}</DisplayText></div>
                <Button onClick={handlePrevClick}>Previous</Button>
                <DisplayAnswers onAnswerClick={handleAnswerClick} />
                <Button onClick={handleNextClick}>Next</Button>
            </div>
        </>
    );
};
export default Card
