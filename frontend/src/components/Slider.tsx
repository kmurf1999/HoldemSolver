import React from "react";
import styled from "styled-components";

type Props = {
  leftValue: number;
  rightValue: number;
};

const SliderStyle = styled.div`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  font-family: "SF UI Text Medium";
  width: 100%;
`;

const Slider: React.FC<Props> = ({ leftValue, rightValue }) => {
  return (
    <SliderStyle>
      <input type="range" min="0" max="100" value="50" />
    </SliderStyle>
  );
};

export default Slider;
