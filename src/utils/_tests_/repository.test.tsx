import {Repository} from "../Repository.tsx";
describe('Repository', () => {
    let repository: Repository;

    beforeEach(() => {
        repository = new Repository();
    });

    it('returns an array of trivia cards', () => {
        const data = repository.getData();
        expect(Array.isArray(data)).toBe(true);
        data.forEach(card => {
            expect(card).toHaveProperty('question');
            expect(card).toHaveProperty('answerList');
            expect(Array.isArray(card.answerList)).toBe(true);
        });
    });

    it('returns correct trivia data', () => {
        const expectedData = [
            {
                question: "First Question",
                answerList: ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
            },
            {
                question: "Second Question",
                answerList: ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
            },
            {
                question: "Third Question",
                answerList: ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
            }
        ];

        const data = repository.getData();
        expect(data).toEqual(expectedData);
    });
});