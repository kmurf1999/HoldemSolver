import React, { useState } from "react";
import styled from "styled-components";
import { ComboState } from "../redux/range/types";
import { colors } from "../styles";

interface MatrixTileProps {
  state: ComboState;
  index: number;
}

const MatrixTileStyle = styled.div<{ state: ComboState; id: string }>`
  background: ${(props) => {
    switch (props.state) {
      case 0:
        return "#fff";
      case 1:
        return colors.primary;
      case 3:
        return "rgba(0,0,0,0.05)";
      default:
        return "#fff";
    }
  }};

  color: ${(props) => {
    switch (props.state) {
      case 1:
        return "#fff";
      default:
        return "rgba(0,0,0,0.45)";
    }
  }};

  border-radius: 8px;
  font-family: "SF UI Text Regular";
  font-size: 16px;

  padding: 4px;
  cursor: pointer;
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
  elements: Array<any>;
  states: ComboState[];
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
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseOver={onMouseOver}
      rows={rows}
      cols={cols}
      width={width}
      height={height}
    >
      {elements.map((value: any, index: number) => (
        <MatrixTile key={index} index={index} state={states[index]}>
          {value}
        </MatrixTile>
      ))}
    </MatrixStyle>
  );
};

export default Matrix;
