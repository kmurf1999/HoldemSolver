import React, { useState, useEffect } from "react";
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
  const [typeTimeout, setTypeTimeout] = useState(setTimeout(() => {}, 100));
  const [lastEdited, setLastEdited] = useState(0);
  const [textValue, setTextValue] = useState(value);
  const onTextChange = (e: any) => {
    const val = e.target.value;
    if (typeTimeout) {
      clearTimeout(typeTimeout);
    }
    setLastEdited(new Date().getTime());
    setTextValue(val);
    setTypeTimeout(
      setTimeout(() => {
        onChange(val);
      }, 500)
    );
  };
  useEffect(() => {
    const time = new Date().getTime();
    if (value !== textValue && time > lastEdited + 1000) {
      setTextValue(value);
    }
  }, [value, textValue, lastEdited]);
  return (
    <TextAreaStyle
      onChange={onTextChange}
      rows={rows}
      cols={cols}
      className={className}
      placeholder={placeholder}
      value={textValue}
    />
  );
};

export default TextArea;
