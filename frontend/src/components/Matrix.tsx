import React, { useState, ReactNode, MouseEvent } from 'react';
import styled from 'styled-components';
import { shadow, colors } from '../styles';
import { UIState } from '../lib';

type MatrixTileProps = {
  state: UIState;
  index: number;
  children: ReactNode;
};

const MatrixTileStyle = styled.div<{ state: UIState; id: string }>`
  background: ${(props) => {
    switch (props.state) {
      case UIState.PARTIAL:
      case UIState.INACTIVE:
        return '#fff';
      case UIState.ACTIVE:
        return colors.primary;
      case UIState.UNAVAILABLE:
        return 'rgba(0,0,0,0.05)';
    }
  }};

  color: ${(props) => {
    switch (props.state) {
      case UIState.PARTIAL:
      case UIState.ACTIVE:
        return '#fff';
      case UIState.INACTIVE:
        return 'rgba(0,0,0,0.55)';
      case UIState.UNAVAILABLE:
        return 'transparent';
    }
  }};

  .triangle {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: ${(props) => (props.state === UIState.PARTIAL ? 'normal' : 'none')};
  }

  .matrix-tile-children {
    position: relative;
  }

  * {
    pointer-events: none;
    display: ${(props) => (props.state === UIState.UNAVAILABLE ? 'none' : 'inline')};
  }

  &:hover {
    box-shadow: ${shadow[1]};
    z-index: 999;
  }

  box-shadow: ${(props) => (props.state === UIState.UNAVAILABLE ? 'none !important' : shadow[0])};

  overflow: hidden;
  position: relative;
  border-radius: 2px;
  font-family: 'Open Sans', 'sans-serif';
  font-weight: 300;
  font-size: inherit;

  padding: 0.2em 0.4em;

  cursor: ${(props) => (props.state === UIState.UNAVAILABLE ? 'normal' : 'pointer')};
`;

function MatrixTile(props: MatrixTileProps): React.ReactElement {
  const { state, index, children } = props;
  return (
    <MatrixTileStyle state={state} id={index.toString()}>
      <svg className="triangle" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="m 0 0 L 100 0 M 100 0 Q 80 80 0 100 L 0 0" fill={colors.primary} />
      </svg>
      <div className="matrix-tile-children">{children}</div>
    </MatrixTileStyle>
  );
}

type MatrixProps = {
  cols: number;
  rows: number;
  elements: ReactNode[];
  states: UIState[];
  className?: string;
  selectElement?: (index: number) => void;
  deselectElement?: (index: number) => void;
};

const MatrixStyle = styled.div<{
  rows: number;
  cols: number;
}>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.cols}, 1fr)`};
  grid-template-rows: ${(props) => `repeat(${props.rows}, 1fr)`};
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  user-select: none;
`;

function Matrix(props: MatrixProps): React.ReactElement {
  const { elements, states, rows, cols, selectElement, deselectElement, className = '' } = props;
  // used to to show updates
  const [changed, setChanged] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [selecting, setSelecting] = useState(false);
  function onMouseDown(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    const id = (e.target as HTMLDivElement).id;
    const tileIndex = Number.parseInt(id);
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
  function onMouseOver(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    const id = (e.target as HTMLDivElement).id;
    const tileIndex = Number.parseInt(id);
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
  function onMouseUp(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
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
    >
      {elements.map((element: ReactNode | string, index: number) => (
        <MatrixTile key={index} index={index} state={states[index]}>
          {element}
        </MatrixTile>
      ))}
    </MatrixStyle>
  );
}

export default Matrix;
