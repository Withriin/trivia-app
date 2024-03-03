import {DoubleLinkedList} from '../../gameLogic/DoubleLinkedList.tsx'

describe('DoubleLinkedList', () => {
    let list: DoubleLinkedList;

    beforeEach(() => {
        list = new DoubleLinkedList();
    });

    it('should be empty when created', () => {
        expect(list.isEmpty()).toBe(true);
        expect(list.size()).toBe(0);
    });

    it('should add a card correctly', () => {
        const card = 'First card';
        list.addCard(card);
        expect(list.isEmpty()).toBe(false);
        expect(list.size()).toBe(1);
        expect(list.getFirstCard()?.data).toBe(card);
        expect(list.getLastCard()?.data).toBe(card);
    });

    it('should handle the next and previous card references correctly', () => {
        const firstCardData = 'First card';
        const secondCardData = 'Second card'
        list.addCard(firstCardData);
        list.addCard(secondCardData);

        const firstCard = list.getFirstCard();
        const secondCard = list.nextCard();

        expect(firstCard?.data).toBe(firstCardData);
        expect(secondCard?.data).toBe(secondCardData);
        expect(list.prevCard()).toBe(firstCard);
    });

    it('should find a card by criteria', () => {
        const trueCard = 'Find me';
        const falseCard = 'Not me';
        list.addCard(trueCard);
        list.addCard(falseCard);

        const foundCard = list.findCard(trueCard);
        expect(foundCard?.data).toBe(trueCard);
        expect(list.findCard('Non-existent')).toBeNull();
    });
    it('should return the current card', () =>{
       const firstCard = 'First Card';
       const secondCard = 'Second Card';
       list.addCard(firstCard);
       list.addCard(secondCard);
       expect(list.getCurrent()?.data).toBe(firstCard);
       list.nextCard();
       expect(list.getCurrent()?.data).toBe(secondCard);
    });
    it('should return the correct count', () =>{
        for (let i = 0; i < 3; i++){
            list.addCard('A Card');
        }
        expect(list.size()).toBe(3)
    });
});

