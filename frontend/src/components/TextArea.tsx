import React, { useState, useEffect } from "react";
import styled from "styled-components";

type Props = {
  onChange: (...args: any[]) => void;
  value: string;
  placeholder?: string;
  rows: number;
  cols: number;
  className?: string;
};

const TextAreaStyle = styled.textarea<{
  rows: number;
  cols: number;
  className: string;
  placeholder: string;
  spellcheck: boolean;
}>`
  width: 100%;
  resize: none;
  border-radius: 2px;
  box-sizing: border-box;
  border: 0;
  outline: 0;
  padding: 16px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  font-family: 'Open Sans', 'sans-serif';
  font-size: inherit;
  color: rgba(0, 0, 0, 0.85);
  &::placeholder {
    color: rgba(0, 0, 0, 0.65);
    font-weight: normal;
  }
`;

const TextArea: React.FC<Props> = ({
  rows,
  cols,
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  const [typeTimeout, setTypeTimeout] = useState(setTimeout(() => {}, 100));
  const [focus, setFocus] = useState(false);
  const [textValue, setTextValue] = useState(value);
  const onTextChange = (e: any) => {
    const val = e.target.value;
    if (typeTimeout) {
      clearTimeout(typeTimeout);
    }
    setTextValue(val);
    setTypeTimeout(
      setTimeout(() => {
        onChange(val);
      }, 500)
    );
  };
  useEffect(() => {
    if (!focus) {
      setTextValue(value);
    }
  }, [focus, value]);
  return (
    <TextAreaStyle
      spellcheck={false}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
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
