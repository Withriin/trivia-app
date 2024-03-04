import Button from "./Button.tsx";
import {useContext, useEffect, useState} from "react";
import strategyContext from "../../context/StrategyContext.tsx";
import {Answer} from "../../features/gameLogic/TriviaInterfaces.ts";

interface DisplayAnswersProps {
    onAnswerClick: (answerId: number) => void;
}

const DisplayAnswers : React.FC<DisplayAnswersProps> = ({onAnswerClick}) => {
    const strategy = useContext(strategyContext);
    const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>([]);
    const shuffleAnswers = (array: Answer[]) : Answer[] => {
        const shuffled = [...array];
        for(let i = shuffled.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        if(strategy?.getCard()?.data.answers) {
            setShuffledAnswers(shuffleAnswers(strategy?.getCard()?.data.answers));
        }
    }, [strategy?.getCard()?.data.answers]);

    return (
        <>
            {shuffledAnswers.map((answer) => (
                <Button key={answer.id} onClick={() => onAnswerClick(answer.id)}>{answer.text}</Button>
            ))}
            </>
    );
};
export default DisplayAnswers
