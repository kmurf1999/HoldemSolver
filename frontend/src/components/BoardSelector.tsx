import React from 'react';
import styled from 'styled-components';

import { AiOutlinePlus } from 'react-icons/ai';

const BoardSelectorStyle = styled.div`
  .board-selector {
    background: #fff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    padding: 1em;
    width: min-content;
    float: right;
  }
  .board-title {
    font-family: 'Roboto', 'sans-serif';
    font-weight: 400;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 1em;
  }
  .board-cards {
    display: grid;
    grid-template-columns: repeat(5, 40px);
    grid-gap: 1em;
  }
  .board-card {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    color: #bbb;
    position: relative;
    &:hover {
      color: #888;
      box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.2);
    }
    > svg {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 30px;
      height: 30px;
    }
  }
`;

type BoardSelectorProps = {
  className?: string;
};

const BoardSelector: React.FC<BoardSelectorProps> = ({ className = '' }) => (
  <BoardSelectorStyle className={className}>
    <div className="board-selector">
      <div className="board-title">BOARD</div>
      <div className="board-cards">
        <div className="board-card">
          <AiOutlinePlus />
        </div>
        <div className="board-card">
          <AiOutlinePlus />
        </div>
        <div className="board-card">
          <AiOutlinePlus />
        </div>
        <div className="board-card">
          <AiOutlinePlus />
        </div>
        <div className="board-card">
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  </BoardSelectorStyle>
);

export default BoardSelector;
