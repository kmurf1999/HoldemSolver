import React, { ReactNode } from 'react';
import { SUIT_TO_CHAR, RANK_TO_CHAR, suitColor } from './redux/range/HandRange';
// board is represented using 52 bit integer
// 13 * suit + rank

export function getCardElement(index: number): ReactNode {
  const suit = Math.floor(index / 13);
  const rank = index % 13;
  //   return `${RANK_TO_CHAR[rank]}${SUIT_TO_CHAR[suit]}`;
  return React.createElement(
    'span',
    { style: { color: suitColor(suit) } },

    RANK_TO_CHAR[rank],
    React.createElement(
      'span',
      {
        style: {
          fontFamily: 'Hiragino Sans',
          fontSize: 14,
        },
      },
      SUIT_TO_CHAR[suit],
    ),
  );
}
