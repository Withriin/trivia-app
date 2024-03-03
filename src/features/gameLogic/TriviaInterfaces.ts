// TriviaInterfaces.ts
export interface Answer {
    id: number;
    text: string;
    isCorrect: boolean;
    isSelected: boolean;
}

export interface TriviaCard {
    id: number;
    question: string;
    answers: Answer[];
}
