import React, { ReactElement, MouseEvent } from 'react';
import styled from 'styled-components';
import { shadow, colors } from '../styles';
import { BeatLoader } from 'react-spinners';

type ButtonProps = {
  variant?: 'default' | 'primary' | 'warning';
  size?: 'md' | 'lg';
  className?: string;
  block?: boolean;
  isLoading?: boolean;
  icon?: ReactElement;
  type?: 'button' | 'submit' | 'reset';
  children: ReactElement | string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ButtonStyle = styled.button<{ size: string; block: boolean, variant: string }>`
  text-align: center;
  font-family: 'Roboto', 'sans-serif';
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: ${shadow[0]};
  transition: transform .1s ease;
  width: ${props => props.block ? '100%': 'fit-content'};
  font-size: ${props => {
      switch(props.size) {
          case 'lg': return '1.2em';
          case 'md':
          default: return 'inherit';
      }
  }};
  padding: ${props => {
      switch(props.size) {
          case 'lg': return '.8em 1.2em';
          case 'md':
          default: return '.8em 1.2em';
      }
  }};
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
  color: ${props => getColor(props.variant)};
  &:hover, &:focus {
    transform: translateY(-2px);
    box-shadow: ${shadow[1]};
  }
  > svg {
    margin-right: 0.6em;
  }
`;

function getColor(variant: string): string {
    switch (variant) {
      case 'primary':
      case 'warning':
        return '#fff';
      default:
        return 'rgba(0,0,0,0.65)';
    }
}

function Button(props: ButtonProps): React.ReactElement {
  const {
    size = 'md',
    isLoading = false,
    type = 'button',
    block = false,
    variant = 'default',
    children,
    className = '',
    icon = null,
    onClick
  } = props;
  return (
    <ButtonStyle size={size} type={type} block={block} onClick={onClick} className={className} variant={variant}>
      { isLoading ? 
        <BeatLoader color={getColor(variant)} margin={0} size={12} />
      : (
        <React.Fragment>
          {icon}
          {children}
        </React.Fragment>
        )
      }
    </ButtonStyle>
  );
}

export default Button;
