import React, { ReactElement, MouseEvent } from 'react';
import styled from 'styled-components';
import { shadow, colors } from '../styles';
import { BeatLoader} from 'react-spinners';

type ButtonProps = {
  variant?: 'default' | 'primary' | 'warning';
  className?: string;
  block?: boolean;
  isLoading?: boolean;
  icon?: ReactElement;
  type?: 'button' | 'submit' | 'reset';
  children: ReactElement | string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ButtonStyle = styled.button<{ block: boolean, variant: string }>`
  text-align: center;
  font-size: 1.2em;
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
  color: ${props => getColor(props.variant)};
  &:hover, &:focus {
    transform: scale(1.01);
    box-shadow: ${shadow[1]};
  }
  > svg {
    margin-left: 0.8em;
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
  const { isLoading = false, type = 'button', block = false, variant = 'default', children, className = '', icon = null, onClick } = props;
  return (
    <ButtonStyle type={type} block={block} onClick={onClick} className={className} variant={variant}>
      { isLoading ? 
        <BeatLoader color={getColor(variant)} margin={0} size={12} />
      : (
        <React.Fragment>
          {children}
          {icon}
        </React.Fragment>
        )
      }
    </ButtonStyle>
  );
}

export default Button;
