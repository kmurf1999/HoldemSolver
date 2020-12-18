import React, { ReactElement, MouseEvent } from 'react';
import styled from 'styled-components';
import { colors } from '../styles';

type ButtonProps = {
  variant?: 'default' | 'primary' | 'warning';
  className?: string;
  icon?: ReactElement;
  children: ReactElement;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ButtonStyle = styled.button<{ variant: string }>`
  text-align: center;
  font-size: 0.9em;
  font-family: 'Roboto', 'sans-serif';
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.8em 1em;
  border-radius: 2px;
  background: ${(props) => {
    switch (props.variant) {
      case 'primary':
        return colors.primary;
      case 'warning':
        return colors.warning;
      default:
        return '#fff';
    }
  }};
  color: ${(props) => {
    switch (props.variant) {
      case 'primary':
      case 'warning':
        return '#fff';
      default:
        return 'rgba(0,0,0,0.65)';
    }
  }};
  > svg {
    margin-left: 0.8em;
  }
`;

function Button(props: ButtonProps): React.ReactElement {
  const { variant = 'default', children, className = '', icon = null, onClick } = props;
  return (
    <ButtonStyle onClick={onClick} className={className} variant={variant}>
      {children}
      {icon}
    </ButtonStyle>
  );
}

export default Button;
