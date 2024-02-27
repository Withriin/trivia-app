import {DoubleLinkedList} from "./DoubleLinkedList.tsx";
import {Repository} from "../../utils/Repository.tsx";
import {TriviaCard, Answer} from "./TriviaInterfaces.ts";
import {constructor} from "global-jsdom";

interface TriviaStrategy{
    execute(triviaData: any[]): DoubleLinkedList;
}

export class ConcreteTriviaStrategy implements TriviaStrategy{
    private currentCardId = 0;
    execute(triviaData: any[]): DoubleLinkedList {
        const cardLinkedList = new DoubleLinkedList();

        triviaData.forEach((data) =>{
            const card: TriviaCard = this.createTriviaCard(data);
            cardLinkedList.addCard(card);
        });
        return cardLinkedList;
    }

    private createTriviaCard(data:any): TriviaCard{
        const cardId = ++this.currentCardId;
        const answers: Answer[] = data.answers.map((answer: string, index: number) => ({
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
    private triviaCardLinkedList: DoubleLinkedList = new DoubleLinkedList();
    private strategy: TriviaStrategy;


    constructor(repository: Repository, strategy: TriviaStrategy) {
        this.repository = repository;
        this.strategy = strategy;
    }
    nextCard(){
        this.triviaCardLinkedList.nextCard();
    }
    prevCard(){
        this.triviaCardLinkedList.prevCard();
    }
    getCard(){
        return this.triviaCardLinkedList.getCurrent();
    }
    reset(){
        let i = this.triviaCardLinkedList.getFirstCard();
        while(i){
            this.triviaCardLinkedList.getCurrent()?.data.answers.forEach((answer: Answer) => {
                answer.isSelected = false;
            });
            this.triviaCardLinkedList.nextCard();
        }
    }
    performOperation(): void{
        const triviaData = this.repository.getData();
        const cardLinkedList = this.strategy.execute(triviaData);

    }
}

/*
TODO :
 - Add score handling
 - Optional: Consider a constructor where you lack the second parameter, example App.tsx usage.
 - Optional: Consider renaming StrategyComponent.  It's not a component?
 - Optional: Consider getting a single answer/card id from the "database"
 */