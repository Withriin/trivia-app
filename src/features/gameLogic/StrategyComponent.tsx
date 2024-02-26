import {TriviaCardListObject} from "./TriviaCardListObject.tsx";
import {Repository} from "../../utils/Repository.tsx";
import {TriviaCard, Answer} from "./TriviaInterfaces.ts";

interface TriviaStrategy{
    execute(triviaData: TriviaCardListObject[]): TriviaCardListObject;
}

export class ConcreteTriviaStrategy implements TriviaStrategy{
    private currentCardId = 0;
    execute(triviaData: any[]): TriviaCardListObject {
        const cardLinkedList = new TriviaCardListObject();

        triviaData.forEach((data, index) =>{
            const card: TriviaCard = this.createTriviaCard(data);
            cardLinkedList.addCard(card);
        });
        return cardLinkedList;
    }

    private createTriviaCard(data:any): TriviaCard{
        const cardId = ++this.currentCardId;
        const answers = data.answers.map((answer: string, index: number) => ({
            id: index + 1,
            text: answer,
            isCorrect: index === 0,
            isSelected: false,
        }));

        return{
            id: cardId,
            question: data.question,
            answers: answers,
        };
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
        const cardLinkedList = this.strategy.execute(triviaData);
    }
}