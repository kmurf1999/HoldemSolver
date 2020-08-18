import React from "react";
import styled from "styled-components";

type Props = {
  onChange: (...args: any[]) => void;
  value: string;
  placeholder: string;
  rows: number;
  cols: number;
  className?: string;
};

const TextAreaStyle = styled.textarea<{
  rows: number;
  cols: number;
  className: string;
  placeholder: string;
}>`
  width: 100%;
  resize: none;
  border-radius: 8px;
  box-sizing: border-box;
  border: 0;
  outline: 0;
  padding: 16px;
  font-family: "SF UI Text Regular";
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  &::placeholder {
    color: rgba(0, 0, 0, 0.65);
    font-weight: normal;
  }
`;

const TextArea: React.FC<Props> = ({
  rows,
  cols,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <TextAreaStyle
      onChange={onChange}
      rows={rows}
      cols={cols}
      className={className}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default TextArea;
