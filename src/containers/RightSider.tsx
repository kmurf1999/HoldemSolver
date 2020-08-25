import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Modal from "./Modal";
import BoardSelector from "./BoardSelector";

import { getCardElement } from "../Board";

import { colors } from "../styles";

const RangeListItemStyle = styled.li<{ active: boolean }>`
  font-family: "SF UI Text Medium";
  font-size: 14px;
  position: relative;
  width: 100%;
  height: 66px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  /* padding-top: 12px; */
  /* padding-bottom: 12px; */
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  ${(props) => {
    if (props.active) {
      return `
          &:after {
              position: absolute;
              content: '';
              height: 32px;
              width: 4px;
              border-radius: 4px;
              background: ${colors.primary};
              left: 0px;
              top: 0;
              bottom: 0;
              margin: auto;
          }
          `;
    }
  }}
  .range-list-item-position {
    width: 42px;
    height: 42px;
    background: ${(props) =>
      props.active ? colors.primary : "rgba(0,0,0,0.05)"};
    color: ${(props) => (props.active ? "#fff" : "rgba(0,0,0,0.85)")};
    text-align: center;
    line-height: 42px;
    border-radius: 8px;
    margin-right: 16px;
  }
  .range-list-item-text {
    flex-grow: 1;
    position: relative;
    height: 42px;
    /* padding: 4px 0; */
    .range-list-item-title {
      position: absolute;
      left: 0;
      top: 0;
      color: ${(props) => (props.active ? colors.primary : "rgba(0,0,0,0.85)")};
    }
    .range-list-item-stats {
      position: absolute;
      left: 0;
      bottom: 0;
      color: rgba(0, 0, 0, 0.25);
      font-size: 13px;
      font-family: "SF UI Text Regular";
      .range-list-item-stats-bold {
        font-family: "SF UI Text SemiBold";
        color: ${colors.info};
      }
    }
  }
`;

const RangeListItem: React.FC<{ className?: string; active?: boolean }> = ({
  className = "",
  active = false,
}) => {
  return (
    <RangeListItemStyle active={active} className={className}>
      <div className="range-list-item-position">BB</div>
      <div className="range-list-item-text">
        <span className="range-list-item-title">3.5bb RFI bb vs sb</span>
        <span className="range-list-item-stats">
          <span className="range-list-item-stats-bold">18.4%</span> Equity
        </span>
      </div>
    </RangeListItemStyle>
  );
};

const RightSiderStyle = styled.div`
  background: #fff;
  padding-top: 24px;
  .range-list-header {
    margin-bottom: 24px;
    margin-left: 24px;
  }
  .range-list {
    list-style-type: none;
    .range-list-item {
      /* margin-bottom: 24px; */
    }
  }
  .board-header {
    margin-left: 24px;
    margin-top: 24px;
    margin-bottom: 24px;
  }
  .board-selector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
  }
  .board-selector-tile {
    width: 42px;
    height: 42px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.05);
    cursor: pointer;
    color: red;
    line-height: 42px;
    font-family: "SF UI Text Regular";
    text-align: center;
    font-size: 16px;
    .board-selector-tile-suit {
      font-family: "Hiragino Sans";
      font-size: 14px;
    }
  }
`;

type Props = {
  className?: string;
  board?: boolean[];
};

const RightSider: React.FC<Props> = ({ className = "", board = [] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  let activeCards: number[] = [];
  board.forEach((c, i) => {
    if (c) {
      activeCards.push(i);
    }
  });
  return (
    <RightSiderStyle className={className}>
      <div className="header range-list-header">Ranges</div>
      <ul className="range-list">
        <RangeListItem active className="range-list-item" />
        <RangeListItem className="range-list-item" />
      </ul>
      <div className="header board-header">Board</div>
      <Modal open={modalOpen} closeModal={() => setModalOpen(false)}>
        <BoardSelector />
      </Modal>
      <div className="board-selector">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            onClick={() => setModalOpen(true)}
            className="board-selector-tile"
          >
            {activeCards.length > i ? getCardElement(activeCards[i]) : ""}
          </div>
        ))}
      </div>
    </RightSiderStyle>
  );
};

const mapStateToProps = (state: any) => {
  return {
    board: state.board.board,
  };
};

export default connect(mapStateToProps, null)(RightSider);
