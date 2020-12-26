import { UIState } from '../../lib';

export const COMBO_COUNT = 169;
export const SUIT_COUNT = 4;
export const SUIT_TO_CHAR = ['♠', '♥', '♣', '♦'];
export const TEXT_SUIT_TO_CHAR = ['s', 'h', 'c', 'd'];
export const RANK_TO_CHAR = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

export const PAIR_MASK = 0b0000100011001110;
export const SUITED_MASK = 0b1000010000100001;
export const OFFSUITED_MASK = 0b0111101111011110;

export enum ComboType {
  OFFSUITED,
  SUITED,
  PAIR,
}

export function ranks(comboIndex: number): number[] {
  const firstRank = 12 - Math.floor(comboIndex / 13);
  const secondRank = 12 - (comboIndex % 13);
  return [firstRank, secondRank];
}

export function suits(suitIndex: number): number[] {
  const firstSuit = Math.floor(suitIndex / 4);
  const secondSuit = suitIndex % 4;
  return [firstSuit, secondSuit];
}

function comboType(comboIndex: number): ComboType {
  const [firstRank, secondRank] = ranks(comboIndex);
  if (firstRank < secondRank) {
    return ComboType.OFFSUITED;
  } else if (firstRank > secondRank) {
    return ComboType.SUITED;
  } else {
    return ComboType.PAIR;
  }
}

function comboName(comboIndex: number): string {
  const [firstRank, secondRank] = ranks(comboIndex);
  const type = comboType(comboIndex);
  switch (type) {
    case ComboType.OFFSUITED:
      return `${RANK_TO_CHAR[secondRank]}${RANK_TO_CHAR[firstRank]}o`;
    case ComboType.SUITED:
      return `${RANK_TO_CHAR[firstRank]}${RANK_TO_CHAR[secondRank]}s`;
    case ComboType.PAIR:
      return `${RANK_TO_CHAR[firstRank]}${RANK_TO_CHAR[secondRank]}`;
  }
}

export const COMBO_TYPES = new Array(COMBO_COUNT).fill(0).map((_, index) => comboType(index));
export const COMBO_NAMES = new Array(COMBO_COUNT).fill(0).map((_, index) => comboName(index));

export function bitCount(n: number): number {
  n = n - ((n >> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
  return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
}

export function charToSuit(c: string): number | undefined {
  switch (c.toLowerCase()) {
    case 's':
      return 0;
    case 'h':
      return 1;
    case 'c':
      return 2;
    case 'd':
      return 3;
    default:
      return;
  }
}

export function charToRank(c: string): number {
  switch (c.toUpperCase()) {
    case 'A':
      return 12;
    case 'K':
      return 11;
    case 'Q':
      return 10;
    case 'J':
      return 9;
    case 'T':
      return 8;
    default:
      return Number(c) - 2;
  }
}

export function suitColor(suitIndex: number): string {
  switch (suitIndex) {
    case 0:
      return 'black';
    case 1:
      return '#eb4b4b';
    case 2:
      return '#5cd15c';
    case 3:
      return '#5999e3';
  }
  return 'inherit';
}

export default class HandRange extends Array<number> {
  static cache: Record<string, HandRange> = {};
  /**
   * Creates a new empty hand range
   */
  constructor() {
    super();
    Object.setPrototypeOf(this, Object.create(HandRange.prototype));
    Object.assign(this, new Array(COMBO_COUNT).fill(0));
  }
  /**
   * Returns number of combos in range
   */
  comboCount(): number {
    return this.reduce((acc, c) => (acc + bitCount(c)), 0);
  }
  /**
   * Returns the UIState of each combo in range
   */
  comboStates(): UIState[] {
    const comboStates: UIState[] = this.map((combo, index) => {
      switch (COMBO_TYPES[index]) {
        case ComboType.OFFSUITED:
          return combo === OFFSUITED_MASK ? UIState.ACTIVE : combo > 0 ? UIState.PARTIAL : UIState.INACTIVE;
        case ComboType.SUITED:
          return combo === SUITED_MASK ? UIState.ACTIVE : combo > 0 ? UIState.PARTIAL : UIState.INACTIVE;
        case ComboType.PAIR:
          return combo === PAIR_MASK ? UIState.ACTIVE : combo > 0 ? UIState.PARTIAL : UIState.INACTIVE;
        default:
          return UIState.INACTIVE;
      }
    });
    return comboStates;
  }
  private addSuitCombo(rank1: number, rank2: number, suit1: number, suit2: number) {
    let comboIndex: number;
    let suitIndex: number;
    if (suit1 === suit2) {
      comboIndex = (12 - rank1) * 13 + (12 - rank2);
    } else {
      comboIndex = (12 - rank2) * 13 + (12 - rank1);
    }
    if (suit2 > suit1) {
      suitIndex = suit1 * 4 + suit2;
    } else {
      suitIndex = suit2 * 4 + suit1;
    }
    this[comboIndex] |= 1 << suitIndex;
  }
  private addCombo(rank1: number, rank2: number, type: string, plus: boolean) {
    switch (type) {
      case 'o': {
        const index = (12 - rank2) * 13 + (12 - rank1);
        this[index] = OFFSUITED_MASK;
        break;
      }
      case 's': {
        const index = (12 - rank1) * 13 + (12 - rank2);
        this[index] = SUITED_MASK;
        break;
      }
      default:
        if (rank1 === rank2) {
          const index = (12 - rank1) * 13 + (12 - rank2);
          this[index] = PAIR_MASK;
        } else {
          const offsuitIndex = (12 - rank2) * 13 + (12 - rank1);
          const suitedIndex = (12 - rank1) * 13 + (12 - rank2);
          this[offsuitIndex] = OFFSUITED_MASK;
          this[suitedIndex] = SUITED_MASK;
        }
        break;
    }
    if (plus && rank1 === rank2 && rank1 < 12) {
      this.addCombo(rank1 + 1, rank1 + 1, type, plus);
    }
    if (plus && rank2 < rank1 - 1) {
      this.addCombo(rank1, rank2 + 1, type, plus);
    }
  }
  static fromString(rangeStr: string): HandRange {
    if (rangeStr in HandRange.cache) {
      return HandRange.cache[rangeStr];
    }

    let range = new HandRange();
    const re = /(([2-9TJQAK]{2})(S|O)?(\+)?)|(([2-9TJQKA])([SHCD])([2-9TJQKA])([SHCD]))/;
    const elements = rangeStr.toUpperCase().split(',');
    elements.forEach((element) => {
      const components = re.exec(element);
      if (!components) return;
      if (components[1]) {
        // not suit specific
        const type = components[3] ? components[3].toLowerCase() : '';
        const rank1 = charToRank(components[2][0]);
        const rank2 = charToRank(components[2][1]);
        const plus = components[4] ? true : false;
        range.addCombo(rank1, rank2, type, plus);
      }
      if (components[5]) {
        const rank1 = charToRank(components[6]);
        const rank2 = charToRank(components[8]);
        const suit1 = charToSuit(components[7]);
        const suit2 = charToSuit(components[9]);
        if (typeof suit1 !== undefined || typeof suit2 !== undefined) {
          range.addSuitCombo(rank1, rank2, suit1 as number, suit2 as number);
        }
      }
    });
    HandRange.cache[rangeStr] = range;
    return range as HandRange;
  }
  toString(): string {
    const fullCombos: boolean[] = this.map((c, index) => {
      switch(COMBO_TYPES[index]) {
        case ComboType.OFFSUITED:
          return c === OFFSUITED_MASK;
        case ComboType.SUITED:
          return c === SUITED_MASK;
        case ComboType.PAIR:
          return c === PAIR_MASK;
      }
      return false;
    });
    // combine pairs
    let pairs = [];
    let gap = false;
    for (let i=0; i < 13; ++i) {
      let j = i * 13 + i;
      if (fullCombos[j]) {
        if (gap) {
          let pair = `${RANK_TO_CHAR[12 - i]}${RANK_TO_CHAR[12 - i]}`;
          pairs.push(pair);
          continue;
        }
        let start = i;
        while(fullCombos[j]) {
          i++;
          j = i * 13 + i;
        }
        let end = i - 1;
        let pair = `${RANK_TO_CHAR[12 - end]}${RANK_TO_CHAR[12 - end]}` + (start === end ? '' : '+');
        pairs.push(pair);
      }
      gap = true;
    }
    // combine offsuits
    let offsuited: Record<string, boolean> = {};
    for (let col=0; col < 13; ++col) {
      let gap = false;
      for (let row=col+1; row < 13; ++row) {
        if (fullCombos[row * 13 + col]) {
          if (gap) {
            const c = `${RANK_TO_CHAR[12 - col]}${RANK_TO_CHAR[12 - row]}o`;
            offsuited[c] = true;
            continue;
          }
          let start = row;
          while (fullCombos[row * 13 + col] && row < 13) {
            ++row;
          }
          let end = row - 1;
          const c = `${RANK_TO_CHAR[12 - col]}${RANK_TO_CHAR[13 - row]}${start === end ? 'o' : 'o+'}`;
          offsuited[c] = true;
        }
        gap = true;
      }
    }
    // combined suited
    let suited: Record<string, boolean> = {};
    for (let row=0; row < 13; ++row) {
      let gap = false;
      for (let col=row+1; col < 13; ++col) {
        if (fullCombos[row * 13 + col]) {
          if (gap) {
            const c = `${RANK_TO_CHAR[12 - row]}${RANK_TO_CHAR[12 - col]}s`;
            suited[c] = true;
            continue;
          }
          let start = col;
          while (fullCombos[row * 13 + col] && col < 13) {
            ++col;
          }
          let end = col - 1;
          const c = `${RANK_TO_CHAR[12 - row]}${RANK_TO_CHAR[13 - col]}${start === end ? 's' : 's+'}`;
          suited[c] = true;
        }
        gap = true;
      }
    }

    // combined suited and offsuited
    let rangeArr: Array<string> = [];
    rangeArr.push.apply(rangeArr, pairs);

    Object.keys(suited).forEach(s => {
      if (s in offsuited) {
        rangeArr.push(s.replace('s', ''));
      } else {
        rangeArr.push(s);
      }
    });
    Object.keys(offsuited).forEach(o => {
      if (!(o in suited)) {
        rangeArr.push(o);
      }
    });

    // add not full combos ex: ah2s
    this.forEach((c, index) => {
      if (c) {
        switch(COMBO_TYPES[index]) {
          case ComboType.PAIR:
            if (c === PAIR_MASK)
              return;
            break;
          case ComboType.SUITED:
            if (c === SUITED_MASK)
              return;
            break;
          case ComboType.OFFSUITED:
            if (c === OFFSUITED_MASK)
              return
            break;
        }
        const [firstRank, secondRank] = ranks(index);
        for (let i=0; i < 16; ++i) {
          if (c & (1 << i)) {
            const [firstSuit, secondSuit] = suits(i);
            rangeArr.push(`${RANK_TO_CHAR[firstRank]}${TEXT_SUIT_TO_CHAR[firstSuit]}${RANK_TO_CHAR[secondRank]}${TEXT_SUIT_TO_CHAR[secondSuit]}`);
          }
        }
      }
    });

    return rangeArr.join(',');
  }
  setComboInactive(comboIndex: number): HandRange {
    let newRange = HandRange.from(this);
    Object.setPrototypeOf(newRange, Object.create(HandRange.prototype));
    newRange[comboIndex] = 0;
    return newRange as HandRange;
  }
  setComboActive(comboIndex: number): HandRange {
    let newRange = HandRange.from(this);
    Object.setPrototypeOf(newRange, Object.create(HandRange.prototype));
    switch(COMBO_TYPES[comboIndex]) {
      case ComboType.OFFSUITED:
        newRange[comboIndex] = OFFSUITED_MASK;
        break;
      case ComboType.SUITED:
        newRange[comboIndex] = SUITED_MASK;
        break;
      case ComboType.PAIR:
        newRange[comboIndex] = PAIR_MASK;
    }
    return newRange as HandRange;
  }
  static all(): HandRange {
    let range = new HandRange().map((_, index) => {
      switch (COMBO_TYPES[index]) {
        case ComboType.SUITED:
          return SUITED_MASK;
        case ComboType.OFFSUITED:
          return OFFSUITED_MASK;
        case ComboType.PAIR:
          return PAIR_MASK;
        default:
          return 0;
      }
    });
    return range as HandRange;
  }
  setPairs(): HandRange {
    let newRange = HandRange.from(this);
    Object.setPrototypeOf(newRange, Object.create(HandRange.prototype));
    for (let i=0; i < 13; ++i) {
      const j = i * 13 + i;
      newRange[j] = PAIR_MASK;
    }
    return newRange as HandRange;
  }
  setBroadway(): HandRange {
    let newRange = HandRange.from(this);
    Object.setPrototypeOf(newRange, Object.create(HandRange.prototype));
    for (let i=0; i < 5; ++i) {
      for (let j=0; j < 5; ++j) {
        switch(COMBO_TYPES[i * 13 + j]) {
          case ComboType.PAIR:
            newRange[i * 13 + j] = PAIR_MASK;
            break;
          case ComboType.OFFSUITED:
            newRange[i * 13 + j] = OFFSUITED_MASK;
            break;
          case ComboType.SUITED:
            newRange[i * 13 + j] = SUITED_MASK;
            break;
        }
      }
    }
    return newRange as HandRange;
  }
  comboState(comboIndex: number): UIState[] {
    const combo = this[comboIndex];
    let states = [];
    for (let i=0; i < 16; i++) {
      const j = 1 << i;
      switch(COMBO_TYPES[comboIndex]) {
        case ComboType.PAIR:
          if (!(j & PAIR_MASK)) {
            states.push(UIState.UNAVAILABLE);
            continue;
          }
          break;
        case ComboType.OFFSUITED:
          if (!(j & OFFSUITED_MASK)) {
            states.push(UIState.UNAVAILABLE);
            continue
          }
          break;
        case ComboType.SUITED:
          if (!(j & SUITED_MASK)) {
            states.push(UIState.UNAVAILABLE);
            continue;
          }
          break;
      }
      if (j & combo) {
        states.push(UIState.ACTIVE);
      } else {
        states.push(UIState.INACTIVE);
      }
    }
    return states;
  }
  setSuitComboActive(comboIndex: number, suitIndex: number): HandRange {
    let newRange = HandRange.from(this);
    Object.setPrototypeOf(newRange, Object.create(HandRange.prototype));
    switch(COMBO_TYPES[comboIndex]) {
      case ComboType.OFFSUITED:
        newRange[comboIndex] |= (OFFSUITED_MASK & (1 << suitIndex));
        break;
      case ComboType.SUITED:
        newRange[comboIndex] |= (SUITED_MASK & (1 << suitIndex));
        break;
      case ComboType.PAIR:
        newRange[comboIndex] |= (PAIR_MASK & (1 << suitIndex));
    }
    return newRange as HandRange;
  }
  setSuitComboInactive(comboIndex: number, suitIndex: number): HandRange {
    let newRange = HandRange.from(this);
    Object.setPrototypeOf(newRange, Object.create(HandRange.prototype));
    switch(COMBO_TYPES[comboIndex]) {
      case ComboType.OFFSUITED:
        newRange[comboIndex] &= ~(1 << suitIndex);
        break;
      case ComboType.SUITED:
        newRange[comboIndex] &= ~(1 << suitIndex);
        break;
      case ComboType.PAIR:
        newRange[comboIndex] &= ~(1 << suitIndex);
    }
    return newRange as HandRange;
  }
}