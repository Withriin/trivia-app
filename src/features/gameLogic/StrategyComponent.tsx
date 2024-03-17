import {DoubleLinkedList} from "./DoubleLinkedList.tsx";
import {Repository} from "../../utils/Repository.tsx";
import {TriviaCard, Answer} from "./TriviaInterfaces.ts";

interface TriviaStrategy{
    execute(triviaData: any[]): DoubleLinkedList<TriviaCard>;
}

export class ConcreteTriviaStrategy implements TriviaStrategy{
    private currentCardId = 0;
    execute(triviaData: any[]): DoubleLinkedList<TriviaCard> {
        const cardLinkedList = new DoubleLinkedList<TriviaCard>();

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
    private triviaCardLinkedList: DoubleLinkedList<TriviaCard> = new DoubleLinkedList();
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
        // todo refactor when trivia card facade is implemented
        this.triviaCardLinkedList.nextCard();
        this.notifyUpdate();
    }
    prevCard(){
        // todo refactor when trivia card facade is implemented
        this.triviaCardLinkedList.prevCard();
        this.notifyUpdate();
    }
    getCard(){
        // todo refactor when trivia card facade is implemented
        return this.triviaCardLinkedList.getCurrent();
    }
    reset(){
        // todo refactor when trivia card facade is implemented
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
        // todo refactor when trivia card facade is implemented
        return this.triviaCardLinkedList.size();
    }
    checkAnswer(answerId: number){
        // todo refactor when trivia card facade is implemented
        const current = this.triviaCardLinkedList.getCurrent();
        // handle case where there is no current card
        if(!current){
            return false;
        }

        const updatedCardData = {...current.data};
        updatedCardData.isAnswered = true;
        const selectedAnswer = updatedCardData.answers.find(answer => answer.id === answerId)!;

        if(!selectedAnswer) {
            // handle case where no matching id is found
            return false
        }

        selectedAnswer.isSelected = true;  // mark the answer as selected
        if(selectedAnswer.isCorrect){
            this.score++;
        }

        this.triviaCardLinkedList.updateCurrent(updatedCardData);
        this.notifyUpdate();
        return selectedAnswer.isCorrect;
    }


    getAnswerList(){
        // todo refactor when trivia card facade is implemented
        return this.triviaCardLinkedList.getCurrent()?.data.answers;
    }
    getIsAnswered(){
        return this.getCard()?.data?.isAnswered;
    }

    getAnswerById(number: number): Answer{
        return this.getAnswerList()?.find((answer: Answer) => answer.id === number)!;
    }
    getIsSelected(){
        const selectedAnswer = this.getAnswerList()?.find((answer: Answer) => answer.isSelected);
        return  selectedAnswer ? selectedAnswer.id : undefined;
    }

    getQuestion(){
        return this.getCard()?.data?.question;
    }
    getIsSelectedCorrect(){
        if(this.getIsAnswered()) {
            const selectedId = this.getIsSelected()!;
            const selectedAnswer = this.getAnswerById(selectedId);
            return selectedAnswer && selectedAnswer.isCorrect;
        }
    }

    getCorrectAnswerText(){
        return this.getAnswerList()?.find((answer: Answer) => answer.isCorrect)?.text!;
    }

    getPostQuestionText(){
        const correctAnswerText = "Correct!";
        const wrongAnswerText = `Incorrect. The correct answer was ${this.getCorrectAnswerText()}`;
        const defaultString = '';
        if(this.getIsSelected()) {
            if (this.getIsSelectedCorrect()) {
                return correctAnswerText;
            }
            return wrongAnswerText;
        }else{
            return defaultString;
        }
    }
}

/*
TODO :
 - Optional: Consider renaming StrategyComponent.  It's not a component?
 - Look up decorator design pattern
 - add functions that access different information in the card object
 - maybe put them in the decorator pattern
 - finish adding conditional display on card when answer is selected
 */