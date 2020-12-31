import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { shadow, colors } from '../styles';
import { login } from '../redux/auth/actions';
import Button from '../components/Button';
import Input from '../components/Input';

const LOGIN = gql`
  mutation AuthMutation($email: String!, $password: String!) {
    auth {
        login(input: { email: $email, password: $password }) {
            jwt,
            csrf
        }
    }
  }
`;

const LoginStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-container {
        width: 400px;
        background: #fff;
        border-radius: 2px;
        margin: auto;
        box-shadow: ${shadow[0]};
        display: flex;
        flex-direction: column;
        padding: 3em;
        position: relative;
        .login-error {
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
    @media only screen and (max-width: 500px) {
        .login-container {
            width: 100%;
            border-radius: 0;
        }
    }
`;


const mapDispatchToProps = {
    login
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function Login(props: Props): React.ReactElement {
    const { login: setCredentials } = props;
    let history = useHistory();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        login,
        { loading }
      ] = useMutation(LOGIN, {
          onCompleted(res) {
              const { jwt, csrf } = res.auth.login;
              // set auth keys
              setCredentials(jwt, csrf);
              // push to home
              history.push('/home');
          },
          onError({ message }) {
              setError(message);
          }
      });

    function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        setEmail(value);
    }
    function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const value = (e.target as HTMLInputElement).value;
        setPassword(value);
    }
    function onSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setError('');
        if (email && password)
            login({ variables: { email, password }});
    }
    return (
        <LoginStyle>
            <form className="login-container">
                <h1>Login</h1>
                <p className="login-error">{error}</p>
                <Input className="login-field" label="Email" name="email" onChange={onEmailChange} value={email}/>
                <Input className="login-field" type="password" label="Password" name="password" onChange={onPasswordChange} value={password}/>
                <Button size="lg" isLoading={loading} onClick={onSubmit} type="submit" className="login-btn" block variant="primary">Login</Button>
                <p>Don't have an account? <Link to="/register">Sign up</Link></p>
            </form>
        </LoginStyle>
    );
}

export default connector(Login);
