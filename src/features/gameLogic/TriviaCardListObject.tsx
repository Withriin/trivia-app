interface Answer{
    id: number;
    text: string;
    isCorrect: boolean;
}
interface TriviaCard{
    id: number;
    question: string;
    answers: Answer[];
    isSelected: boolean;
}
class Node {
    data: any; // Consider using a more specific type for your data
    next: Node | null = null;
    prev: Node | null = null;

    constructor(data: any) {
        this.data = data;
    }
}
export class TriviaCardListObject{
    private head: Node | null;
    private tail: Node | null;
    private count: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    // Add a new card to the end of the list
    addCard(data: any){
        const newNode = new Node(data);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }else{
            newNode.prev = this.tail;
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        this.count++;
    }

    nextCard(currentNode: Node){
        return currentNode.next;
    }
    findCard(criteria: any){
        let current = this.head;
        while(current !== null){
            if (current.data === criteria){
                return current;
            }
            current = current.next;
        }
        return null; // If no card matches the criteria
    }
    prevCard(currentNode: Node){
        return currentNode.prev;
    }
    getFirstCard(){
        return this.head;
    }
    getLastCard(){
        return this.tail;
    }
    isEmpty(){
        return this.head === null;
    }
    size(){
        return this.count;
    }
}