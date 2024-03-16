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
        author: string;
        cutSrc: string;
        id: string;
    };
    words: Word[];
};

export type Level = {
    rounds: Round[];
};
