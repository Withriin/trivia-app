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
        if(strategy?.checkAnswer(answerId)){
            console.log('Correct');
        }else{
            console.log('False');
        }

    }

    useEffect(() => {
        setCurrentCard(strategy?.getCard());
    }, [strategy]);

    return (
        <>
            <div>
                <p><DisplayText>{currentCard?.data.question}</DisplayText></p>
                <Button onClick={handlePrevClick}>Previous</Button>
                <DisplayAnswers onAnswerClick={handleAnswerClick} />
                <Button onClick={handleNextClick}>Next</Button>
            </div>
        </>
    );
};
export default Card
