import React from "react";
import { connect } from "react-redux";
import {
  setComboActive,
  setComboInactive,
  clearRange,
} from "../redux/range/actions";
import styled from "styled-components";

import CardMatrix from "../components/CardMatrix";
import SuitMatrix from "../components/SuitMatrix";
import Button from "../components/Button";
import Input from "../components/Input";
import Slider from "../components/Slider";
import TextArea from "../components/TextArea";
import { ComboState } from "../redux/range/types";

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

// storing ranges
// 13x13 array of objects

type Props = {
  comboNames: string[];
  comboStates: ComboState[];
  suitCombos: Array<{ name?: string; state: ComboState }>[];
  activeComboIndex: number;
  clearRange: () => void;
  setComboActive: (index: number) => void;
  setComboInactive: (index: number) => void;
};
const RangeSelector: React.FC<Props> = ({
  comboNames,
  comboStates,
  suitCombos,
  setComboActive,
  setComboInactive,
  activeComboIndex,
  clearRange,
}) => {
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
      <CardMatrix
        selectElement={setComboActive}
        deselectElement={setComboInactive}
        elements={comboNames}
        states={comboStates}
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
        <SuitMatrix combo={suitCombos[activeComboIndex]} />
      </div>
    </RangeSelectorStyle>
  );
};

const mapStateToProps = (state: any) => {
  return {
    comboNames: state.range.comboNames,
    comboStates: state.range.comboStates,
    suitCombos: state.range.suitCombos,
    activeComboIndex: state.range.activeComboIndex,
  };
};

const mapDispatchToProps = { setComboActive, setComboInactive, clearRange };

export default connect(mapStateToProps, mapDispatchToProps)(RangeSelector);
