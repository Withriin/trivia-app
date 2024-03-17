import Button from "./Button.tsx";
import {useContext, useEffect, useState} from "react";
import strategyContext from "../../context/StrategyContext.tsx";
import {Answer} from "../../features/gameLogic/TriviaInterfaces.ts";
import styles from "./DisplayAnswers.module.css";

interface DisplayAnswersProps {
    onAnswerClick: (answerId: number) => void;
}

const DisplayAnswers : React.FC<DisplayAnswersProps> = ({onAnswerClick}) => {
    const strategy = useContext(strategyContext);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [isAnswered, setIsAnswered] = useState(strategy?.getIsAnswered());

    useEffect(() => {
        {
            setAnswers(strategy?.getAnswerList()!);
        }
        const updateIsAnswered = () => {
            setIsAnswered(strategy?.getIsAnswered());
        };

        strategy?.addUpdateListener(updateIsAnswered);

        return () => {
            strategy?.removeUpdateListener(updateIsAnswered);
        };

    }, [strategy?.getAnswerList(), strategy?.getIsAnswered()]);

    const getButtonVariant = (answer: Answer) => {
        if (answer.isSelected){
            return answer.isCorrect ? 'correctAnswer' : 'incorrectAnswer';
        }
        return 'answer';
    };

    return (
        <>
            <div className={styles.answersContainer}>
                {answers.map((answer) => (
                    <Button
                        key={answer.id}
                        onClick={() => onAnswerClick(answer.id)}
                        isDisabled={isAnswered}
                        variant={getButtonVariant(answer)}
                    >
                        {answer.text}
                    </Button>
                ))}
            </div>
            </>
    );
};
export default DisplayAnswers

// todo update logic when trivia card facade is built