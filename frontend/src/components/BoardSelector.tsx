import React, { useState } from 'react';
import styled from 'styled-components';
import { shadow, colors } from '../styles';

import { AiOutlinePlus } from 'react-icons/ai';

import { RANK_TO_CHAR, SUIT_TO_CHAR, TEXT_SUIT_TO_CHAR, suitColor } from '../redux/range/HandRange';

import Modal from './Modal';

const BoardSelectorStyle = styled.div`
  .board-selector {
    background: #fff;
    border-radius: 2px;
    box-shadow: ${shadow[0]};
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
  .cards {
      display: grid;
      grid-template-rows: repeat(4, auto);
      grid-template-columns: repeat(13, auto);
      grid-template-areas:
          'twos threes fours fives sixs sevens eights nines tens jacks queens kings aces'
          'twoh threeh fourh fiveh sixh sevenh eighth nineh tenh jackh queenh kingh aceh'
          'twoc threec fourc fivec sixc sevenc eightc ninec tenc jackc queenc kingc acec'
          'twod threed fourd fived sixd sevend eightd nined tend jackd queend kingd aced';
      grid-gap: 1em;
      .card {
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.05);
        line-height: 40px;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
        margin: 0 auto;
        &:hover {
            box-shadow: ${shadow[1]};
        }
      }
      .card-selected {
          background: ${colors.primary};
          color: #fff;
      }
  }
  @media only screen and (max-width: 800px) {
      .cards {
        grid-template-rows: repeat(13, auto);
        grid-template-columns: repeat(4, auto);
        grid-gap: .5em;
        grid-template-areas:
            'twos twoh twoc twod'
            'threes threeh threec threed'
            'fours fourh fourc fourd'
            'fives fiveh fivec fived'
            'sixs sixh sixc sixd'
            'sevens sevenh sevenc sevend'
            'eights eighth eightc eightd'
            'nines nineh ninec nined'
            'tens tenh tenc tend'
            'jacks jackh jackc jackd'
            'queens queenh queenc queend'
            'kings kingh kingc kingd'
            'aces aceh acec aced';
      }
  }
`;

function rankToString(rank: number): string {
    switch(rank) {
        case 0: return 'two';
        case 1: return 'three';
        case 2: return 'four';
        case 3: return 'five';
        case 4: return 'six';
        case 5: return 'seven';
        case 6: return 'eight';
        case 7: return 'nine';
        case 8: return 'ten';
        case 9: return 'jack';
        case 10: return 'queen';
        case 11: return 'king';
        case 12: return 'ace';
        default: return '';
    }
}

function Cards(): React.ReactElement {
    return (
        <div className="cards">
            {new Array(52).fill(0).map((_, index) => {
                const rank = index % 13;
                const suit = Math.floor(index / 13);
                const gridArea = `${rankToString(rank)}${TEXT_SUIT_TO_CHAR[suit]}`;
                return (
                    <div key={index} className="card" style={{ gridArea }}>
                      <span>
                      {RANK_TO_CHAR[rank]}
                      </span>
                      <span style={{ fontFamily: 'Hiragino Sans', color: suitColor(suit) }}>
                        {SUIT_TO_CHAR[suit]}
                      </span>
                  </div>
                );
            })}
        </div>
    );
}

type BoardSelectorProps = {
  className?: string;
};

function BoardSelector(props: BoardSelectorProps): React.ReactElement {
  const { className = '' } = props;
  const [modalShown, setModalShown] = useState(false);
  return (
    <BoardSelectorStyle className={className}>
      <Modal
          title="Set Board"
          shown={modalShown}
          closeModal={() => setModalShown(false)}
      >
        <Cards/>
      </Modal>
      <div className="board-selector">
        <div className="board-title">BOARD</div>
        <div className="board-cards">
          <div onClick={() => setModalShown(true)} className="board-card">
            <AiOutlinePlus />
          </div>
          <div onClick={() => setModalShown(true)} className="board-card">
            <AiOutlinePlus />
          </div>
          <div onClick={() => setModalShown(true)} className="board-card">
            <AiOutlinePlus />
          </div>
          <div onClick={() => setModalShown(true)} className="board-card">
            <AiOutlinePlus />
          </div>
          <div onClick={() => setModalShown(true)} className="board-card">
            <AiOutlinePlus />
          </div>
        </div>
      </div>
    </BoardSelectorStyle>
  );
}

export default BoardSelector;
