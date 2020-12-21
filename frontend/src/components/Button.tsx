import React, { ReactElement, MouseEvent } from 'react';
import styled from 'styled-components';
import { shadow, colors } from '../styles';

type ButtonProps = {
  variant?: 'default' | 'primary' | 'warning';
  className?: string;
  block?: boolean;
  icon?: ReactElement;
  children: ReactElement | string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ButtonStyle = styled.button<{ block: boolean, variant: string }>`
  text-align: center;
  font-size: 1em;
  font-family: 'Roboto', 'sans-serif';
  outline: none;
  border: none;
  cursor: pointer;
  padding: .8em 1.2em;
  box-shadow: ${shadow[0]};
  border-radius: 2px;
  width: ${props => props.block ? '100%': 'fit-content'};
  transition: transform .1s ease;
  background: ${(props) => {
    switch (props.variant) {
      case 'primary':
        return colors.primary;
      case 'warning':
        return colors.warning;
      default:
        return '#eee';
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
  &:hover {
    transform: scale(1.01);
    box-shadow: ${shadow[1]};
  }
  > svg {
    margin-left: 0.8em;
  }
`;

function Button(props: ButtonProps): React.ReactElement {
  const { block = false, variant = 'default', children, className = '', icon = null, onClick } = props;
  return (
    <ButtonStyle block={block} onClick={onClick} className={className} variant={variant}>
      {children}
      {icon}
    </ButtonStyle>
  );
}

export default Button;
