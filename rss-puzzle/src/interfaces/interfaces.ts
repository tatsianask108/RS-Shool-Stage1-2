export interface IUser {
    name: string;
    surname: string;
}

export interface IGameConfiguration {
    sound: boolean;
}

export interface IWord {
    audioExample: string;
    id: number;
    textExample: string;
}

export interface IRound {
    levelData: {
        name: string;
        author: string;
        year: string;
        imageSrc: string;
    };
    words: IWord[];
}

export interface ILevel {
    rounds: IRound[];
}
