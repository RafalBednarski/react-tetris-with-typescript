import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

import { PlayerType, StageCellType, StageType } from "../../src/Types/Types";

export const useStage = (player: PlayerType, resetPlayer: () => void) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        if (!player.pos) return;

        setRowsCleared(0);

        const sweepRows = (newStage: StageType): StageType => {
            return newStage.reduce((ack, row) => {
                // If no 0, it means that the row is full and should be cleared
                if (row.findIndex((cell) => cell[0] === 0) === -1) {
                    setRowsCleared((prev) => prev + 1);
                    // Create an empty row at the beginning of the array to push the Tetrominos down
                    // instead of returning the cleared row
                    ack.unshift(
                        new Array(newStage[0].length).fill([
                            0,
                            "clear",
                        ]) as StageCellType[]
                    );
                    return ack;
                }

                ack.push(row);
                return ack;
            }, [] as StageType);
        };

        const updateStage = (prevStage: StageType): StageType => {
            // First flush the stage
            // If it says "clear" but don't have a 0 it means that it's the players move and should be cleared
            const newStage = prevStage.map(
                (row) =>
                    row.map((cell) =>
                        cell[1] === "clear" ? [0, "clear"] : cell
                    ) as StageCellType[]
            );

            // Then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? "merged" : "clear"}`,
                        ];
                    }
                });
            });

            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }

            return newStage;
        };

        setStage((prev) => updateStage(prev));
    }, [player.collided, player.pos?.x, player.pos?.y, player.tetromino]);

    return { stage, setStage, rowsCleared };
};
