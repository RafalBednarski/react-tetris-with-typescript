export type PlayerType = {
    pos: {
        x: number;
        y: number;
    };
    tetromino: (string | number)[][];
    collided: boolean; // element colision check
};

export type StageCellType = [string | number, string];

export type StageType = StageCellType[][];
