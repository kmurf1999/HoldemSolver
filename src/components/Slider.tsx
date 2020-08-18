import React from "react";
import styled from "styled-components";

import { colors } from "../styles";

type Props = {
  leftValue: number;
  rightValue: number;
};

const SliderStyle = styled.div<{ leftValue: number; rightValue: number }>`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  font-family: "SF UI Text Medium";
  width: 100%;
  .slider-label {
    background: #fff;
    border-radius: 8px;
    width: 50px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
  }
  .slider-slider {
    flex-grow: 1;
    margin: 0 8px;
    .slider-line {
      height: 4px;
      background: rgba(0, 0, 0, 0.25);
      border-radius: 2px;
      position: relative;
      .slider-line-active {
        border-radius: 4px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: ${(props) => `${props.leftValue * 100}%`};
        margin: auto;
        height: 8px;
        background: ${colors.primary};
        width: ${(props) =>
          `calc(${(props.rightValue - props.leftValue) * 100}% + 8px)`};
      }
      .slider-circle {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 16px;
        height: 16px;
        border: 2px solid ${colors.primary};
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
      }
      .slider-circle-left {
        left: ${(props) => `calc(${props.leftValue * 100}%)`};
      }
      .slider-circle-right {
        left: ${(props) => `calc(${props.rightValue * 100}%)`};
      }
    }
  }
`;

const Slider: React.FC<Props> = ({ leftValue, rightValue }) => {
  return (
    <SliderStyle leftValue={leftValue} rightValue={rightValue}>
      <div className="slider-label">0%</div>
      <div className="slider-slider">
        <div className="slider-line">
          <div className="slider-line-active" />
          <div className="slider-circle slider-circle-right" />
          <div className="slider-circle slider-circle-left" />
        </div>
      </div>
      <div className="slider-label">50%</div>
    </SliderStyle>
  );
};

export default Slider;
