import {ConcreteTriviaStrategy, StrategyComponent} from "../../gameLogic/StrategyComponent.tsx";
import {Repository} from "../../../utils/Repository.tsx";
jest.mock('../../../utils/Repository.tsx', () => {
    return {
        Repository: jest.fn().mockImplementation(() => ({
            getData: jest.fn().mockReturnValue([
                {
                    question: "First Question",
                    answerList: ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
                },
                {
                    question: "Second Question",
                    answerList: ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
                },
                {
                    question: "Third Question",
                    answerList: ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
                }
            ])
        }))
    };
});
describe('StrategyComponent', () => {
    let strategyComponent: StrategyComponent;
    let strategy: ConcreteTriviaStrategy;
    let repository: Repository;

    beforeEach( () => {
        // Recreate mocks and instances before each test
        strategy = new ConcreteTriviaStrategy();
        repository = new Repository(); // Gets the mocked version
        strategyComponent = new StrategyComponent(repository, strategy);
    });

    it('should use mocked data from Repository', () => {
        // Directly test Repository's mock
        const mockData = repository.getData();
        expect(mockData).toEqual([
            {
                question: "First Question",
                answerList: ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
            },
            {
                question: "Second Question",
                answerList: ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
            },
            {
                question: "Third Question",
                answerList: ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
            }
        ]);
    });

    it('should correctly process data using ConcreteTriviaStrategy',
        () => {
            const correctAnswer = {
                answers: [
                    {id: 1, isCorrect: true, isSelected: false, text: "Correct Answer"},
                    {id: 2, isCorrect: false, isSelected: false, text: "First Wrong Answer"},
                    {id: 3, isCorrect: false, isSelected: false, text: "Second Wrong Answer"},
                    {id: 4, isCorrect: false, isSelected: false, text: "Third Wrong Answer"}
                ],
                id: 1,
                question: "First Question"
            };
            expect(strategyComponent.getCard()?.data).toEqual(correctAnswer);
        });
    it('navigates to the next card correctly', () =>{
        const firstCard = strategyComponent.getCard()?.data;
        strategyComponent.nextCard();
        const secondCard = strategyComponent.getCard()?.data;

        expect(secondCard).not.toEqual(firstCard);
    });

    it('navigates to the previous card correctly', () =>{
        strategyComponent.nextCard();
        const secondCard = strategyComponent.getCard()?.data;

        strategyComponent.prevCard();
        const firstCardAfterPrev = strategyComponent.getCard()?.data;

        expect(firstCardAfterPrev).not.toEqual(secondCard);
    });

    it('should return the current score', () => {
        expect(strategyComponent.getScore()).toBe(0);
    });

    it('should return false if the answer is wrong and not increment score', () => {
        expect(strategyComponent.checkAnswer(2)).toBe(false);
        expect(strategyComponent.getScore()).toBe(0);
    });

    it('should return true if the answer is correct and increment score by 1', () => {
        expect(strategyComponent.checkAnswer(1)).toBe(true);
        expect(strategyComponent.getScore()).toBe(1);
    });

    it('should reset the answers selected value to false', () => {
        strategyComponent.checkAnswer(2);
        strategyComponent.nextCard();
        strategyComponent.checkAnswer(1);
        strategyComponent.reset();
    })
});