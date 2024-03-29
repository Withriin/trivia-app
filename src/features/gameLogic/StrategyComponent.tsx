import {DoubleLinkedList} from "./DoubleLinkedList.tsx";
import {Repository} from "../../utils/Repository.tsx";
import {TriviaCard, Answer} from "./TriviaInterfaces.ts";

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
        const answers: Answer[] = data.answerList.map((answer: string, index: number) => ({
            id: index + 1,
            text: answer,
            isCorrect: index === 0,
            isSelected: false,
        }));

        return{
            id: cardId,
            question: data.question,
            answers: answers.sort(() => Math.random() - 0.5),
            isAnswered: false
        };
    }
}

export class StrategyComponent{
    private repository: Repository;
    private triviaCardLinkedList: DoubleLinkedList = new DoubleLinkedList();
    private strategy: ConcreteTriviaStrategy;
    private score = 0;
    private updateListeners: (() => void)[] = [];


    constructor(repository: Repository, strategy: ConcreteTriviaStrategy) {
        this.repository = repository;
        this.strategy = strategy;
        this.initialize();
    }
    initialize(){
        this.triviaCardLinkedList = this.strategy.execute(this.repository.getData());
    }

    addUpdateListener(listener: () => void) {
        this.updateListeners.push(listener);
    }
    removeUpdateListener(listener: () =>void){
        const index = this.updateListeners.indexOf(listener);
        if (index > -1){
            this.updateListeners.splice(index, 1);
        }
    }
    notifyUpdate() {
        this.updateListeners.forEach(listener => listener());
    }
    nextCard(){
        this.triviaCardLinkedList.nextCard();
        this.notifyUpdate();
    }
    prevCard(){
        this.triviaCardLinkedList.prevCard();
        this.notifyUpdate();
    }
    getCard(){
        return this.triviaCardLinkedList.getCurrent();
    }
    reset(){
        let currentCard = this.triviaCardLinkedList.getFirstCard();
        while(currentCard){
            currentCard.data.isAnswered = false;
            currentCard.data.answers.forEach((answer: Answer) => {
                answer.isSelected = false;
            });
            if(currentCard.next) {
                currentCard = currentCard.next;
            }else{
                break;
            }
        }
        this.triviaCardLinkedList.resetToFirstCard();
        this.score = 0;
        this.notifyUpdate();
    }
    getScore(){
        return this.score;
    }
    getSize(): number{
        return this.triviaCardLinkedList.size();
    }
    checkAnswer(answerId: number){
        const currentCard = this.triviaCardLinkedList.getCurrent()?.data as TriviaCard;
        this.triviaCardLinkedList.getCurrent()!.data.isAnswered = true;
        if(currentCard){
            const selectedAnswer = currentCard.answers.find(answer => answer.id === answerId)!;
            selectedAnswer.isSelected = true;
            if(selectedAnswer && selectedAnswer.isCorrect){
                this.score++;
                this.notifyUpdate();
                return true;
            }
            else{
                this.notifyUpdate();
                return false;
            }
        }
    }
}

/*
TODO :
 - Optional: Consider renaming StrategyComponent.  It's not a component?
 */