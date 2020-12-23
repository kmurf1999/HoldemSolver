import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { shadow, colors } from '../styles';

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

const RegisterStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .register-container {
        width: 400px;
        background: #fff;
        margin: auto;
        box-shadow: ${shadow[0]};
        display: flex;
        flex-direction: column;
        padding: 3em;
        position: relative;
        .register-error {
            color: ${colors.warning};
            height: 1em;
            line-height: 1em;
        }
        > h1 {
            color: rgba(0, 0, 0, 0.85);
            margin-bottom: .5em !important;
        }
        > *:not(:last-child) {
            margin-bottom: 1.5em;
        }
    }
`;

type FieldErrors = {
    email: string | undefined;
    password: string | undefined;
    passwordAgain: string | undefined;
}

const validators = {
    email: function(email: string): string | undefined {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            return;
        }
        return 'Must be a valid email';
    },
    password: function(password: string): string | undefined {
        const re = /^[^\s]{8,}$/;
        if (re.test(password)) {
            return;
        }
        return 'Password must be atleast 8 characters';
    },
    passwordAgain: function(password: string, passwordAgain: string): string | undefined {
        if (password === passwordAgain) {
            return;
        }
        return 'Passwords must match';
    }
};

export default function Register(): React.ReactElement {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    
    const [fieldErrors, setFieldErrors] = useState({ email: undefined, password: undefined, passwordAgain: undefined } as FieldErrors);
    
    const [
        register,
        { loading }
      ] = useMutation(REGISTER, {
          onCompleted(res) {
              const { jwt, csrf } = res.auth.register;
              // set auth keys
              localStorage.setItem('jwt', jwt);
              localStorage.setItem('csrf', csrf);
          },
          onError({ message }) {
              setError(message);
          }
      });

    function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        setEmail(value);
        // TODO validate with regex
        setFieldErrors({ ...fieldErrors, email: validators['email'](value) });
    }
    function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const value = (e.target as HTMLInputElement).value;
        setPassword(value);
        // validate with regex
        setFieldErrors({ ...fieldErrors, password: validators['password'](value) });
    }
    function onPasswordAgainChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const value = (e.target as HTMLInputElement).value;
        setPasswordAgain(value);
        // client side validation
        setFieldErrors({ ...fieldErrors, passwordAgain: validators['passwordAgain'](value, password) });
    }
    function onSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setError('');
        setFieldErrors({ ...fieldErrors, email: validators['email'](email) });
        setFieldErrors({ ...fieldErrors, password: validators['password'](password) });
        setFieldErrors({ ...fieldErrors, passwordAgain: validators['passwordAgain'](password, passwordAgain) });
        if (Object.values(fieldErrors).every(e => typeof e !== undefined)) {
            register({ variables: { email, password }});
        }
    }
    return (
        <RegisterStyle>
            <form className="register-container">
                <h1>Register</h1>
                <p className="register-error">{error}</p>
                <Input className="register-field" error={fieldErrors.email} label="Email" name="email" onChange={onEmailChange} value={email}/>
                <Input className="register-field" error={fieldErrors.password} type="password" label="Password" name="password" onChange={onPasswordChange} value={password}/>
                <Input className="register-field" error={fieldErrors.passwordAgain} type="password" label="Repeat Password" name="password_again" onChange={onPasswordAgainChange} value={passwordAgain}/>
                <Button isLoading={loading} onClick={onSubmit} type="submit" className="register-btn" block variant="primary">Register</Button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </RegisterStyle>
    );
}