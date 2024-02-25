import {TriviaCardListObject} from "./TriviaCardListObject.tsx";
import {Repository} from "../../utils/Repository.tsx";

interface TriviaStrategy{
    execute(triviaData: any): void;
}

export class ConcreteTriviaStrategy implements TriviaStrategy{
    execute(triviaData: any) {
    }
}
export class StrategyComponent{
    private repository: Repository;
    private triviaCardListObject: TriviaCardListObject;
    private strategy: TriviaStrategy;

    constructor(repository: Repository, triviaCardListObject: TriviaCardListObject, strategy: TriviaStrategy) {
        this.repository = repository;
        this.triviaCardListObject = triviaCardListObject;
        this.strategy = strategy;
    }

    setStrategy(strategy: TriviaStrategy): void{
        this.strategy = strategy;
    }

    performOperation(): void{
        const triviaData = this.repository.getData();
        this.strategy.execute(triviaData);
    }
}