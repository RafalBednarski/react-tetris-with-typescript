import React from "react";
import Cell from "../Cell/Cell";
import { StyledStage } from "./Stage.styles";
import { TETROMINOS } from "../../setup";

type StageCellLocalType = [keyof typeof TETROMINOS, string];
type StageLocalType = StageCellLocalType[][];
type localType = {
    stage: StageLocalType;
};

export const Stage = ({ stage }: localType) => (
    <StyledStage>
        {stage.map((row) =>
            row.map((cell, x) => <Cell key={x} type={cell[0]} />)
        )}
    </StyledStage>
);
