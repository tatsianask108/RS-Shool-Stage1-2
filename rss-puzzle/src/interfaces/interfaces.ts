export interface User {
    name: string;
    surname: string;
}

export type GameConfiguration = {
    sound: boolean;
};

export type Word = {
    audioExample: string;
    id: number;
    textExample: string;
};

export type Round = {
    levelData: {
        name: string;
        author: string;
        year: string;
        imageSrc: string;
    };
    words: Word[];
};

export type Level = {
    rounds: Round[];
};
