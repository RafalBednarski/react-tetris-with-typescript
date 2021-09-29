import React from "react";
import { StyledStartButton } from "./StartButton.styles";

type LocalType = {
    callback: () => void;
};

export const StartButton = ({ callback }: LocalType) => (
    <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
);
