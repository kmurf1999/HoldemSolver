import React from 'react';
import styled from 'styled-components';
import { colors, shadow, makeOpaque } from '../styles';

const MADE_HAND_CATEGORIES = [
  {
    class: '>= Quads',
    percent: '0.5%',
  },
  {
    class: 'Full house',
    percent: '0.2%',
  },
  {
    class: 'Flush',
    percent: '0.2%',
  },
  { class: 'Straight',
    percent: '0.2%'
  },
  {
    class: 'Set',
    percent: '0.2%',
  },
  {
    class: 'Two pair',
    percent: '0.1%',
  },
  {
    class: 'Overpair',
    percent: '0.01%',
  },
  {
    class: 'Top pair',
    percent: '0.01%',
  },
  {
    class: 'PP below top',
    percent: '0.01%',
  },
  {
    class: 'Middle pair',
    percent: '0.01%',
  },
  {
    class: 'Weak pair',
    percent: '0.01%',
  },
  {
    class: 'Ace high',
    percent: '0.01%',
  },
];

const DRAW_HAND_CATEGORIES = [
  {
    class: '2 card fd',
    percent: '0.02%',
  },
  {
    class: 'Nut fd (1 card)',
    percent: '0.02%',
  },
  {
    class: 'OESD',
    percent: '0.02%',
  },
  {
    class: 'Gutshot',
    percent: '0.02%',
  },
  {
    class: 'Overcards',
    percent: '0.02%',
  },
];

const RangeFilterStyle = styled.div`
  .range-filter-header {
      background: rgba(0, 0, 0, 0.05);
      padding: 0.5em 1em;
      font-size: 12px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.45);
  }
  .range-filter-container {
    background: white;
    box-shadow: ${shadow[0]};
    border-radius: 2px;
  }
  .range-filter-table {
    width: 100%;
    overflow-y: auto;
    .range-filter-table-item {
      font-size: 12px;
      &:hover {
        background: ${makeOpaque(colors.primary, 0.05)};
      }
    }
    .range-filter-table-body {
        overflow-y: auto;
    }
    .range-filter-select {
      > div {
        width: 1em;
        height: 1em;
        border: 2px solid #ccc;
        border-radius: 2px;
      }
    }
    .hand-class-label {
      font-size: 12px;
      background: rgba(0, 0, 0, 0.05);
      padding: 0.6em 1em;
    }
  }
`;

type RangeFilterProps = {
  className?: string;
};

function RangeFilter(props: RangeFilterProps): React.ReactElement {
  const { className = '' } = props;
  return (
    <RangeFilterStyle className={className}>
      <div className="range-filter-container">
        <div className="range-filter-header">
            FILTERS
        </div>
        <table className="range-filter-table">
          <thead>
            <tr>
              <th></th>
              <th>HAND CLASS</th>
              <th>% OF RANGE</th>
            </tr>
          </thead>
          <tbody className="range-filter-table-body">
            <tr>
              <th className="hand-class-label" colSpan={3}>
                MADE HANDS
              </th>
            </tr>
            {MADE_HAND_CATEGORIES.map((h) => (
              <tr key={h.class} className="range-filter-table-item">
                <td className="range-filter-select">
                  <div></div>
                </td>
                <td>{h.class}</td>
                <td>{h.percent}</td>
              </tr>
            ))}
            <tr>
              <th className="hand-class-label" colSpan={3}>
                DRAW HANDS
              </th>
            </tr>
            {DRAW_HAND_CATEGORIES.map((h) => (
              <tr key={h.class} className="range-filter-table-item">
                <td className="range-filter-select">
                  <div></div>
                </td>
                <td>{h.class}</td>
                <td>{h.percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RangeFilterStyle>
  );
}

export default RangeFilter;
