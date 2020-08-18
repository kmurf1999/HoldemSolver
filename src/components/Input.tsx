import React from "react";
import styled from "styled-components";

type Props = {
  onChange: (...args: any[]) => void;
  value: string;
  placeholder: string;
  className?: string;
};

const InputStyle = styled.input`
  height: 42px;
  border-radius: 8px;
  border: 0;
  outline: 0;
  font-family: "SF UI Text Regular";
  font-size: 14px;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.85);
  &::placeholder {
    color: rgba(0, 0, 0, 0.65);
    font-weight: normal;
  }
`;

const Input: React.FC<Props> = ({ placeholder, className = "" }) => {
  return <InputStyle className={className} placeholder={placeholder} />;
};

export default Input;
