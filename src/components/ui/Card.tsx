import {useContext, useEffect, useState} from "react";
import DisplayText from "./DisplayText.tsx";
import Button from "./Button.tsx";
import DisplayAnswers from "./DisplayAnswers.tsx";
import strategyContext from "../../context/StrategyContext.tsx";
import {Answer} from "../../features/gameLogic/TriviaInterfaces.ts";



const Card = () => {
    const strategy = useContext(strategyContext);
    const [currentCard, setCurrentCard] = useState(strategy?.getCard());
    const [currentSelected, setCurrentSelected] = useState(false);
    const handleNextClick  = () => {
        strategy?.nextCard();
        setCurrentCard(strategy?.getCard());
    };

    const handlePrevClick = () => {
        strategy?.prevCard();
        setCurrentCard(strategy?.getCard());
    };

    const handleAnswerClick = (answerId: number) => {
        const checkedAnswer = strategy?.checkAnswer(answerId);
        setCurrentSelected(strategy?.getCard()?.data.answers.find((currentAnswer : Answer) => {currentAnswer.id === answerId}).isSelected);
        if(checkedAnswer){
            console.log(checkedAnswer);
        }else{
            console.log(checkedAnswer)
        }

    }

    useEffect(() => {
        setCurrentCard(strategy?.getCard());

        //
        // strategy?.addUpdateListener(updateScore);
        //
        // return () => {
        //     strategy?.removeUpdateListener(updateScore);
        // };
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
