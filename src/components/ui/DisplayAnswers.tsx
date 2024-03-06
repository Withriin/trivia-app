import Button from "./Button.tsx";
import {useContext, useEffect, useState} from "react";
import strategyContext from "../../context/StrategyContext.tsx";
import {Answer} from "../../features/gameLogic/TriviaInterfaces.ts";

interface DisplayAnswersProps {
    onAnswerClick: (answerId: number) => void;
}

const DisplayAnswers : React.FC<DisplayAnswersProps> = ({onAnswerClick}) => {
    const strategy = useContext(strategyContext);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [isAnswered, setIsAnswered] = useState(strategy?.getCard()?.data?.isAnswered);

    useEffect(() => {
        if(strategy?.getCard()?.data.answers) {
            setAnswers(strategy?.getCard()?.data.answers);
        }
        const updateIsAnswered = () => {
            setIsAnswered(strategy?.getCard()?.data.isAnswered);
        };

        strategy?.addUpdateListener(updateIsAnswered);

        return () => {
            strategy?.removeUpdateListener(updateIsAnswered);
        };

    }, [strategy?.getCard()?.data.answers, strategy?.getCard()?.data.isAnswered]);

    return (
        <>
            {answers.map((answer) => (
                <Button
                    key={answer.id}
                    onClick={() => onAnswerClick(answer.id)}
                    isDisabled={isAnswered}
                    //style={add conditional style based on answer.isSelected}
                >
                    {answer.text}
                </Button>
            ))}
            </>
    );
};
export default DisplayAnswers
