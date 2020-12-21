import React, { ChangeEvent, MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { shadow } from '../styles';

import Button from '../components/Button';
import Input from '../components/Input';

export const REGISTER = gql`
  mutation AuthMutation($email: String!, $password: String!) {
    auth {
        register(input: { email: $email, password: $password }) {
            jwt,
            csrf
        }
    }
  }
`;

type CREDS = {
    jwt: string;
    csrf: string
}


const RegisterStyle = styled.div`
    .register-container {
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
        .register-field {
            margin-bottom: 2em;
        }
    }
`;

type FieldErrors = {
    email: string | null;
    password: string | null;
    passwordAgain: string | null;
}

export default function Register(): React.ReactElement {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    
    const [fieldErrors, setFieldErrors] = useState({ email: null, password: null, passwordAgain: null } as FieldErrors);
    
    const [
        register,
        { loading, error }
      ] = useMutation(REGISTER, {
          onCompleted(res) {
              const auth = res.auth as CREDS;
              console.log(auth);
          },
          onError(err) {
              console.log(err);
              // handle and set erros
          }
      });

    function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        setEmail(value);
        // TODO validate with regex
    }
    function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const value = (e.target as HTMLInputElement).value;
        setPassword(value);
        // TODO validate with regex
    }
    function onPasswordAgainChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const value = (e.target as HTMLInputElement).value;
        setPasswordAgain(value);
        // client side validation
        if (value === password) {
            setFieldErrors({ ...fieldErrors, passwordAgain: null });
        } else {
            setFieldErrors({ ...fieldErrors, passwordAgain: 'Passwords must match' });
        }
    }
    function onClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (Object.values(fieldErrors).every(e => !e)) {
            register({ variables: { email, password }});
        }
    }
    return (
        <RegisterStyle>
            <div className="register-container">
                <h1>Please Register</h1>
                <Input className="register-field" error={fieldErrors.email} type="email" label="Email" name="email" onChange={onEmailChange} value={email}/>
                <Input className="register-field" error={fieldErrors.password} type="password" label="Password" name="password" onChange={onPasswordChange} value={password}/>
                <Input className="register-field" error={fieldErrors.passwordAgain} type="password" label="Password (again)" name="password_again" onChange={onPasswordAgainChange} value={passwordAgain}/>
                <Button onClick={onClick} className="register-btn" block variant="primary" >LOGIN</Button>
            </div>
        </RegisterStyle>
    );
}