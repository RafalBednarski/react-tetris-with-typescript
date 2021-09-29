import React from "react";
import { StyledCell } from "./Cell.styles";
import { TETROMINOS } from "../../setup";

type LocalType = {
    type: keyof typeof TETROMINOS;
};

const Cell = ({ type }: LocalType) => (
    <StyledCell type={type} color={TETROMINOS[type].color} />
);

export default React.memo(Cell); //if cell not change, we will not render twice same data
