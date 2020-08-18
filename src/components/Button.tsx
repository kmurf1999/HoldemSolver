import React from "react";
import styled from "styled-components";
import { colors } from "../styles";

type ButtonProps = {
  // 'default', 'primary', 'error', 'warning'
  variant: "default" | "primary" | "warning";
  className?: string;
  onClick: (...args: any[]) => any;
};

const ButtonStyle = styled.button<{ variant: string }>`
  height: 42px;
  text-align: center;
  font-size: 14px;
  font-family: "SF UI Text Regular";
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0 24px;
  border-radius: 8px;
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
        return "rgba(0,0,0,0.85)";
    }
  }};
`;

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className = "",
  onClick,
}) => {
  return (
    <ButtonStyle onClick={onClick} className={className} variant={variant}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
