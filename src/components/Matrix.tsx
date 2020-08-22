import React, { useState, ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../styles";
import { UIState } from "../lib";

interface MatrixTileProps {
  state: UIState;
  index: number;
}

const MatrixTileStyle = styled.div<{ state: UIState; id: string }>`
  background: ${(props) => {
    switch (props.state) {
      case UIState.INACTIVE:
        return "#fff";
      case UIState.ACTIVE:
      case UIState.PARTIAL:
        return colors.primary;
      case UIState.UNAVAILABLE:
        return "rgba(0,0,0,0.05)";
    }
  }};

  color: ${(props) => {
    switch (props.state) {
      case UIState.PARTIAL:
      case UIState.ACTIVE:
        return "#fff";
      case UIState.INACTIVE:
        return "rgba(0,0,0,0.45)";
      case UIState.UNAVAILABLE:
        return "transparent";
    }
  }};

  ${(props) => {
    if (props.state === UIState.PARTIAL) {
      return `
      &::after {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        background: ${colors.info};
        border-radius: 50%;
        left: 6px;
        bottom: 6px;
      }
      `;
    }
  }}

  * {
    pointer-events: none;
    display: ${(props) =>
      props.state === UIState.UNAVAILABLE ? "none" : "inline"};
  }
  position: relative;
  border-radius: 8px;
  font-family: "SF UI Text Regular";
  font-size: 16px;

  padding: 4px;
  cursor: ${(props) =>
    props.state === UIState.UNAVAILABLE ? "normal" : "pointer"};
`;

const MatrixTile: React.FC<MatrixTileProps> = ({ index, state, children }) => {
  return (
    <MatrixTileStyle state={state} id={index.toString()}>
      {children}
    </MatrixTileStyle>
  );
};

interface MatrixProps {
  cols: number;
  rows: number;
  width: string;
  height: string;
  elements: ReactNode[];
  states: UIState[];
  className?: string;
  selectElement?: (index: number) => void;
  deselectElement?: (index: number) => void;
}

interface MatrixState {
  mouseDown: boolean;
  selecting: boolean;
}

const MatrixStyle = styled.div<{
  width: string;
  height: string;
  rows: number;
  cols: number;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.cols}, 1fr)`};
  grid-template-rows: ${(props) => `repeat(${props.rows}, 1fr)`};
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  user-select: none;
`;

const Matrix: React.FC<MatrixProps> = ({
  elements,
  states,
  rows,
  cols,
  width,
  height,
  selectElement,
  deselectElement,
  className = "",
}) => {
  // used to to show updates
  const [changed, setChanged] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [selecting, setSelecting] = useState(false);
  function onMouseDown(e: any) {
    const tileIndex = Number.parseInt(e.target.id);
    if (Number.isNaN(tileIndex)) return;
    const selecting = !states[tileIndex];
    if (selecting && selectElement) {
      selectElement(tileIndex);
    }
    if (!selecting && deselectElement) {
      deselectElement(tileIndex);
    }
    setChanged(!changed);
    setMouseDown(true);
    setSelecting(selecting);
  }
  function onMouseOver(e: any) {
    const tileIndex = Number.parseInt(e.target.id);
    if (Number.isNaN(tileIndex)) return;
    if (mouseDown) {
      if (selecting && selectElement) {
        selectElement(tileIndex);
      }
      if (!selecting && deselectElement) {
        deselectElement(tileIndex);
      }
      setChanged(!changed);
    }
  }
  function onMouseUp(e: any) {
    setMouseDown(false);
  }
  return (
    <MatrixStyle
      className={className}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseOver={onMouseOver}
      rows={rows}
      cols={cols}
      width={width}
      height={height}
    >
      {elements.map((element: any, index: number) => (
        <MatrixTile key={index} index={index} state={states[index]}>
          {element}
        </MatrixTile>
      ))}
    </MatrixStyle>
  );
};

export default Matrix;
