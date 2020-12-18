import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles';
import { FaTrash } from 'react-icons/fa';
import { AiOutlinePlusCircle } from 'react-icons/ai';

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
    > svg {
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .range-table-container {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
  .range-table {
    width: 100%;
    .range-table-item {
      border-bottom: 1px solid #eee;
      &:hover {
        color: #fff;
        background: ${colors.primary};
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
      border-radius: 0 0 2px 2px;
      > svg {
        margin-left: 0.4em;
        width: 1.2em;
        height: 1.2em;
      }
      &:hover {
        background: #fff;
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
  return (
    <RangeTableStyle className={className}>
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
                <FaTrash />
              </td>
            </tr>
            <tr className="range-table-item">
              <td>UTG+1</td>
              <td>Raise first in</td>
              <td>56.64%</td>
              <td className="range-table-item-icons">
                <FaTrash />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="range-table-footer">
          <div className="range-table-add">
            <div>Create range</div>
            <AiOutlinePlusCircle />
          </div>
        </div>
      </div>
    </RangeTableStyle>
  );
}

export default RangeTable;
