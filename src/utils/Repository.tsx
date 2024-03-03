export class Repository {
    getData() {
        const cards = [{
            "question": "First Question",
            "answerList": ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
            },
            {
                "question": "Second Question",
                "answerList": ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
            },
            {
                "question": "Third Question",
                "answerList": ["Correct Answer", "First Wrong Answer", "Second Wrong Answer", "Third Wrong Answer"]
            }];
        return cards;
    }
}