class Node {
    data: any; // Consider using a more specific type for your data
    next: Node | null;
    prev: Node | null;


    constructor(data: any) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
export class DoubleLinkedList {
    private head: Node | null;
    private tail: Node | null;
    private current: Node | null | undefined;
    private count: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
        this.count = 0;
    }

    // Add a new card to the end of the list
    addCard(data: any){
        const newNode = new Node(data);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
            this.current = newNode; // initialize current node to first node in list
        }else{
            newNode.prev = this.tail;
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        this.count++;
    }
    getCurrent(){
        return this.current
    }

    nextCard(){
        if(this.current?.next){
            this.current = this.current?.next;
        }
        return this.current;
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
    prevCard(){
        if(this.current?.prev){
            this.current = this.current?.prev;
        }
        return this.current;
    }
    resetToFirstCard() {
        this.current = this.head;
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
