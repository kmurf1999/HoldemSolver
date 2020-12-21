import React, { ChangeEvent, MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { shadow } from '../styles';

import Button from '../components/Button';
import Input from '../components/Input';

// export const REGISTER = gql`
//   mutation accounts {
//       
//   }
// `;


const LoginStyle = styled.div`
    .login-container {
        width: 400px;
        background: #fff;
        margin: auto;
        box-shadow: ${shadow[0]};
        display: flex;
        flex-direction: column;
        padding: 3em;
        > h1 {
            color: rgba(0, 0, 0, 0.85);
            margin-bottom: 1.5em;
        }
        .login-field {
            margin-bottom: 2em;
        }
    }
`;

export default function Login(): React.ReactElement {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        setEmail(value);
    }
    function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        setPassword(value);
    }
    function onClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
    }
    return (
        <LoginStyle>
            <div className="login-container">
                <h1>Please Login</h1>
                <Input className="login-field" type="email" label="Email" name="email" onChange={onEmailChange} value={email}/>
                <Input className="login-field" type="password" label="Password" name="password" onChange={onPasswordChange} value={password}/>
                <Button onClick={onClick} className="login-btn" block variant="primary" >LOGIN</Button>
            </div>
        </LoginStyle>
    );
}