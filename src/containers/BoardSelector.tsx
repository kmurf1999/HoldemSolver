import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { colors } from "../styles";

import { toggleCard } from "../redux/board/actions";

import { getCardElement } from "../Board";

const BoardSelectorStyle = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(13, 1fr);
  grid-row-gap: 4px;
  grid-column-gap: 4px;
  .board-select-tile {
    width: 42px;
    height: 42px;
    line-height: 42px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.05);
    text-align: center;
    font-family: "SF UI Text Regular";
    font-size: 16px;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;
    position: relative;
  }
  .board-select-tile-selected::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 8px;
    border: 2px solid ${colors.primary};
  }
`;

type Props = {
  board?: number[];
  toggleCard?: (cardIndex: number) => void;
};

const BoardSelector: React.FC<Props> = ({
  board = [],
  toggleCard = () => null,
}) => {
  return (
    <BoardSelectorStyle>
      {board.map((card, index) => (
        <div
          key={index}
          onClick={() => toggleCard(index)}
          className={[
            "board-select-tile",
            card ? "board-select-tile-selected" : null,
          ].join(" ")}
        >
          {getCardElement(index)}
        </div>
      ))}
    </BoardSelectorStyle>
  );
};

const mapDispatchToProps = {
  toggleCard,
};

const mapStateToProps = (state: any) => {
  return {
    board: state.board.board,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardSelector);
