import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { UIState } from "../lib";

import {
  ComboType,
  getComboName,
  getSuitComboName,
  getSuitComboState,
  OFFSUITED_MASK,
  SUITED_MASK,
  PAIR_MASK,
} from "../HandRange";
import {
  setComboActive,
  setComboInactive,
  setSuitComboActive,
  setSuitComboInactive,
  clearRange,
} from "../redux/range/actions";

import Matrix from "../components/Matrix";
import Button from "../components/Button";
import Input from "../components/Input";
import Slider from "../components/Slider";
import TextArea from "../components/TextArea";

const RangeSelectorStyle = styled.div`
  .range-selector-top-bar {
    display: flex;
    margin-bottom: 24px;
    width: 624px;
    .range-selector-top-bar-item {
      &:first-child {
        flex-grow: 1;
      }
      &:not(:first-child) {
        margin-left: 8px;
      }
    }
  }

  .range-selector-bottom-bar {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    width: 624px;
  }

  .range-selector-controls {
    flex-grow: 1;
    margin-right: 24px;
    .range-selector-controls-buttons {
      margin: 8px 0;
      display: flex;
      justify-content: space-between;
    }
  }
`;

type Props = {
  rangeCombos: number[];
  rangeTypes: ComboType[];
  activeComboIndex: number;
  setComboActive: (index: number) => void;
  setComboInactive: (index: number) => void;
  setSuitComboActive: (index: number) => void;
  setSuitComboInactive: (index: number) => void;
  clearRange: () => void;
};
const RangeSelector: React.FC<Props> = ({
  rangeCombos,
  rangeTypes,
  setComboActive,
  setComboInactive,
  setSuitComboActive,
  setSuitComboInactive,
  clearRange,
  activeComboIndex,
}) => {
  const comboNames: string[] = rangeCombos.map((_, index) =>
    getComboName(index)
  );
  const comboStates: UIState[] = rangeCombos.map((combo, index) => {
    switch (rangeTypes[index]) {
      case ComboType.OFFSUITED:
        return combo === OFFSUITED_MASK ? UIState.ACTIVE : UIState.INACTIVE;
      case ComboType.SUITED:
        return combo === SUITED_MASK ? UIState.ACTIVE : UIState.INACTIVE;
      case ComboType.PAIR:
        return combo === PAIR_MASK ? UIState.ACTIVE : UIState.INACTIVE;
      default:
        return UIState.INACTIVE;
    }
  });
  const suitCombos = new Array(16)
    .fill(0)
    .map((_, i) => getSuitComboName(activeComboIndex, i));
  const suitStates = new Array(16)
    .fill(0)
    .map((_, i) =>
      getSuitComboState(
        rangeTypes[activeComboIndex],
        rangeCombos[activeComboIndex],
        i
      )
    );
  return (
    <RangeSelectorStyle>
      <div className="range-selector-top-bar">
        <Input
          className="range-selector-top-bar-item"
          onChange={() => {}}
          value={""}
          placeholder={"Select Range"}
        />
        <Button
          className="range-selector-top-bar-item"
          variant="primary"
          onClick={() => {}}
        >
          Save
        </Button>
        <Button
          className="range-selector-top-bar-item"
          variant="warning"
          onClick={() => {}}
        >
          Delete
        </Button>
      </div>
      <Matrix
        elements={comboNames}
        states={comboStates}
        selectElement={setComboActive}
        deselectElement={setComboInactive}
        width={"624px"}
        height={"624px"}
        rows={13}
        cols={13}
      />
      <div className="range-selector-bottom-bar">
        <div className="range-selector-controls">
          <Slider leftValue={0} rightValue={0.5} />
          <div className="range-selector-controls-buttons">
            <Button variant="default" onClick={() => {}}>
              All
            </Button>
            <Button variant="default" onClick={() => {}}>
              Broadway
            </Button>
            <Button variant="warning" onClick={clearRange}>
              Clear
            </Button>
          </div>
          <TextArea
            rows={4}
            cols={4}
            placeholder={""}
            onChange={() => {}}
            value={""}
          />
        </div>
        <Matrix
          selectElement={setSuitComboActive}
          deselectElement={setSuitComboInactive}
          elements={suitCombos}
          states={suitStates}
          width="200px"
          height="200px"
          rows={4}
          cols={4}
        />
        {/* <SuitMatrix
        //   selectElement={setSuitActive}
        //   deselectElement={setSuitInactive}
        //   combo={suitCombos[activeComboIndex]}
        // /> */}
      </div>
    </RangeSelectorStyle>
  );
};

const mapStateToProps = (state: any) => {
  return {
    rangeCombos: state.range.combos,
    rangeTypes: state.range.types,
    activeComboIndex: state.range.activeComboIndex,
  };
};

const mapDispatchToProps = {
  setComboActive,
  setComboInactive,
  clearRange,
  setSuitComboActive,
  setSuitComboInactive,
};

export default connect(mapStateToProps, mapDispatchToProps)(RangeSelector);
