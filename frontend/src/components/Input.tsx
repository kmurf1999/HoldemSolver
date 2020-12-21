import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { shadow, colors, makeOpaque } from '../styles';

const InputStyle = styled.div`
    text-align: left;
    .input-label {
        display: block;
        width: 100%;
        color: rgba(0,0,0,0.45);
        margin-bottom: .4em;
    }
    .input-error {
        display: block;
        width: 100%;
        color: ${colors.warning};
        height: 1em;
    }
    > input {
        padding: 1em;
        width: 100%;
        border-radius: 2px;
        box-sizing: border-box;
        border: 0;
        outline: 0;
        box-shadow: ${shadow[0]};
        font-family: 'Open Sans', 'sans-serif';
        font-size: inherit;
        color: rgba(0, 0, 0, 0.85);
        &::placeholder {
            color: rgba(0, 0, 0, 0.65);
            font-weight: normal;
        }
        &:hover {
            box-shadow: ${shadow[1]};
        }
        // &:focus {
        //     border: 2px solid ${makeOpaque(colors.primary, 0.65)};
        // }
        // &:focus + .input-label {
        //     color: ${makeOpaque(colors.primary, 0.65)};
        // }
    }
`;


type InputProps = {
    placeholder?: string
    value: string,
    label: string,
    name: string,
    className?: string,
    error?: string | null,
    // TODO include all valid types
    type?: 'email' | 'text' | 'password',
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
};

export default function Input(props: InputProps): React.ReactElement {
    const { error, name, label, onChange, value, className = '', placeholder = '', type = 'text'} = props;
    return (
        <InputStyle className={className}>
            <label className='input-label' htmlFor={name}>{label}</label>
            <input name={name} onChange={onChange} value={value} placeholder={placeholder} type={type}/>
            <label className='input-error' htmlFor={name}>{error}</label>
        </InputStyle>
    );
}