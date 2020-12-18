import React from "react";
import styled from "styled-components";
import { colors } from "../styles";

type ButtonProps = {
  // 'default', 'primary', 'error', 'warning'
  variant?: "default" | "primary" | "warning";
  className?: string;
  icon?: any;
  onClick: (...args: any[]) => any;
};

const ButtonStyle = styled.button<{ variant: string }>`
  text-align: center;
  font-size: 0.9em;
  font-family: 'Roboto', 'sans-serif';
  outline: none;
  border: none;
  cursor: pointer;
  padding: .8em 1em;
  border-radius: 2px;
  background: ${(props) => {
    switch (props.variant) {
      case "primary":
        return colors.primary;
      case "warning":
        return colors.warning;
      default:
        return "#fff";
    }
  }};
  color: ${(props) => {
    switch (props.variant) {
      case "primary":
      case "warning":
        return "#fff";
      default:
        return "rgba(0,0,0,0.65)";
    }
  }};
  > svg {
    margin-left: .8em;
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  children,
  className = "",
  icon = null,
  onClick,
}) => {
  return (
    <ButtonStyle onClick={onClick} className={className} variant={variant}>
      {children}
      {icon}
    </ButtonStyle>
  );
};

export default Button;
