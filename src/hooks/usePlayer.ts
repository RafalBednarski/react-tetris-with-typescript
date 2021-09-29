import { useState, useCallback } from "react";
import { STAGE_WIDTH } from "../setup";
import { isColliding, randomTetromino } from "../gameHelpers";

import { PlayerType, StageType } from "../../src/Types/Types";

export const usePlayer = () => {
    const [player, setPlayer] = useState({} as PlayerType);

    const rotate = (matrix: PlayerType["tetromino"]) => {
        // Make the rows to become cols (transpose)
        const mtrx = matrix.map((_, i) => matrix.map((column) => column[i]));
        // Reverse each row to get a rotated matrix
        return mtrx.map((row) => row.reverse());
    };

    const playerRotate = (stage: StageType): void => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);

        // This one is so the player can't rotate into the walls or other tetrominos that's merged
        const posX = clonedPlayer.pos.x;
        let offset = 1;
        while (isColliding(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > clonedPlayer.tetromino[0].length) {
                clonedPlayer.pos.x = posX;
                return;
            }
        }

        setPlayer(clonedPlayer);
    };

    const updatePlayerPos = ({
        x,
        y,
        collided,
    }: {
        x: number;
        y: number;
        collided: boolean;
    }): void => {
        setPlayer((prev) => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided,
        }));
    };

    const resetPlayer = useCallback(
        (): void =>
            setPlayer({
                pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
                tetromino: randomTetromino().shape,
                collided: false,
            }),
        []
    );

    return { player, updatePlayerPos, resetPlayer, playerRotate };
};
