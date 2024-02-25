import {TriviaCardListObject} from '../../gameLogic/TriviaCardListObject.tsx'

describe('TriviaCardListObject', () => {
    let list: TriviaCardListObject;

    beforeEach(() => {
        list = new TriviaCardListObject();
    });

    it('should be empty when created', () => {
        expect(list.isEmpty()).toBe(true);
        expect(list.size()).toBe(0);
    });

    it('should add a card correctly', () => {
        list.addCard('First card');
        expect(list.isEmpty()).toBe(false);
        expect(list.size()).toBe(1);
        expect(list.getFirstCard()?.data).toBe('First card');
        expect(list.getLastCard()?.data).toBe('First card');
    });

    it('should handle the next and previous card references correctly', () => {
        list.addCard('First card');
        list.addCard('Second Card');

        const firstCard = list.getFirstCard();
        const secondCard = list.nextCard(firstCard!);

        expect(firstCard?.data).toBe('First card');
        expect(secondCard?.data).toBe('Second Card');
        expect(list.prevCard(secondCard!)).toBe(firstCard);
    });

    it('should find a card by criteria', () => {
        list.addCard('Find me');
        list.addCard('Not me');

        const foundCard = list.findCard('Find me');
        expect(foundCard?.data).toBe('Find me');
        expect(list.findCard('Non-existent')).toBeNull();
    });
});

