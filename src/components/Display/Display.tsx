import React from "react";
import { StyledDisplay } from "./Display.styles";

type LocalType = {
    gameOver?: boolean;
    text: string;
};

export const Display = ({ gameOver, text }: LocalType) => (
    <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);
