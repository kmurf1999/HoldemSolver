import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, shadow } from '../styles';
import { FiX, FiPlusCircle } from 'react-icons/fi';

import Modal from './Modal';
import Button from './Button';
import CreateRangeForm from './CreateRangeForm';

const RangeTableStyle = styled.div<{ className: string }>`
  .range-table-controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5em;
    > * {
      margin-left: 0.5em;
    }
  }
  .range-table-item-icons {
    display: flex;
    align-items: center;
    > svg {
      cursor: pointer;
      width: 1.4em;
      height: 1.4em;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .range-table-container {
    background: #fff;
    border-radius: 2px;
    box-shadow: ${shadow[0]};
  }
  .range-table {
    width: 100%;
    .range-table-item {
      border-bottom: 1px solid #eee;
      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }
  .range-table-footer {
    text-align: center;
    .range-table-add {
      padding: 0.8em 1em;
      cursor: pointer;
      color: ${colors.primary};
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 0 0 2px 2px;
      > svg {
        margin-right: 0.4em;
        width: 1.2em;
        height: 1.2em;
      }
      &:hover {
        background: ${colors.primary};
        color: #fff;
        transform: scale(1.02);
        box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.25);
      }
    }
  }
`;

type RangeTableProps = {
  className?: string;
};

function RangeTable(props: RangeTableProps): React.ReactElement {
  const { className = '' } = props;
  const [modalShown, setModalShown] = useState(false);
  return (
    <RangeTableStyle className={className}>
        <Modal
            title="Add Range"
            shown={modalShown}
            closeModal={() => setModalShown(false)}
            actionButtons={[
                <Button variant="primary" onClick={() => {}}>
                    CREATE RANGE
                </Button>,
            ]}
        >
            <CreateRangeForm/>
        </Modal>
      <div className="range-table-container">
        <table className="range-table">
          <thead>
            <tr>
              <th>POSITION</th>
              <th>TITLE</th>
              <th>EQUITY</th>
            </tr>
          </thead>
          <tbody>
            <tr className="range-table-item">
              <td>CO</td>
              <td>Limp</td>
              <td>32.53%</td>
              <td className="range-table-item-icons">
                <FiX/>
              </td>
            </tr>
            <tr className="range-table-item">
              <td>UTG+1</td>
              <td>Raise first in</td>
              <td>56.64%</td>
              <td className="range-table-item-icons">
                <FiX/>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="range-table-footer">
            <div onClick={() => setModalShown(true)} className="range-table-add">
            <FiPlusCircle/>
            <div>Add Range</div>
          </div>
        </div>
      </div>
    </RangeTableStyle>
  );
}

export default RangeTable;
