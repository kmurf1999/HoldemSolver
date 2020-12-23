import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { colors, makeOpaque } from '../styles';

const InputStyle = styled.div<{ error: string | undefined }>`
    text-align: left;
    .input-label {
        display: block;
        width: 100%;
        color: rgba(0,0,0,0.45);
        margin-bottom: .4em;
        line-height: .8em;
        height: .8em;
    }
    .input-error {
        display: block;
        width: 100%;
        color: ${colors.warning};
        margin-top: .4em;
        line-height: .8em;
        height: .8em;
    }
    > input {
        width: 100%;
        padding: 1em;
        border-radius: 2px;
        border: 2px solid;
        outline: 0;
        font-family: 'Open Sans', 'sans-serif';
        font-size: inherit;
        color: rgba(0, 0, 0, 0.85);
        border-color: ${props => props.error ? colors.warning : 'rgba(0,0,0,0.15)'};
        &::placeholder {
            color: rgba(0, 0, 0, 0.65);
            font-weight: normal;
        }
        &:focus {
            border-color: ${makeOpaque(colors.primary, 0.5)};
        }
    }
`;


type InputProps = {
    placeholder?: string
    value: string,
    label: string,
    name: string,
    className?: string,
    error?: string | undefined
    // TODO include all valid types
    type?: 'email' | 'text' | 'password',
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
};

export default function Input(props: InputProps): React.ReactElement {
    const { error, name, label, onChange, value, className = '', placeholder = '', type = 'text'} = props;
    return (
        <InputStyle error={error} className={className}>
            <label className='input-label' htmlFor={name}>{label}</label>
            <input name={name} onChange={onChange} value={value} placeholder={placeholder} type={type}/>
            <label className='input-error' htmlFor={name}>{error}</label>
        </InputStyle>
    );
}