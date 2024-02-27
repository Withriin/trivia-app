import {DoubleLinkedList} from "../../gameLogic/DoubleLinkedList.tsx";
import {ConcreteTriviaStrategy, StrategyComponent} from "../../gameLogic/StrategyComponent.tsx";
import {Repository} from "../../../utils/Repository.tsx";
jest.mock('../../../utils/Repository.tsx', () => {
    return {
        Repository: jest.fn().mockImplementation(() => ({
            getData: jest.fn().mockReturnValue([
                {
                    question: "First Question",
                    answerList: ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
                }
            ])
        }))
    };
});
describe('StrategyComponent', () => {
    let strategyComponent: StrategyComponent;
    let strategy: ConcreteTriviaStrategy;
    let triviaCardListObject: DoubleLinkedList;
    let repository: Repository;

    beforeEach(() => {
        // Recreate mocks and instances before each test
        strategy = new ConcreteTriviaStrategy();
        triviaCardListObject = new DoubleLinkedList();
        repository = new Repository(); // Gets the mocked version
        strategyComponent = new StrategyComponent(repository, triviaCardListObject, strategy);
    });

    it('should use mocked data from Repository', () => {
        // Directly test Repository's mock
        const mockData = repository.getData();
        expect(mockData).toEqual([
            {
                question: "First Question",
                answerList: ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
            },
        ]);
    });

    it('should correctly process data using ConcreteTriviaStrategy', () => {
        strategyComponent.performOperation();
        expect(triviaCardListObject.isEmpty()).toBe(false);
    })

});