import React from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../redux';

import { colors, shadow } from '../styles';

import { logout } from '../redux/auth/actions';

const NavStyle = styled.nav`
    height: 70px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 2em;
    .nav-left {
        .nav-title {
            color: rgba(0, 0, 0, 0.85);
            font-size: 1.4em;
            font-weight: 500;
            text-shadow: 0 1px 0 #fff;
            text-decoration: none;
            background-clip: text;
        }
    }
    .nav-right {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        > * {
            margin-left: 2em;
        }
        .nav-link {
            font-family: 'Roboto';
            text-decoration: none;
            font-size: 1em;
            font-weight: 500;
            color: rgba(0,0,0,0.65);
            padding: .7em 1em;
            border: none;
            background: none;
            cursor: pointer;
        }
        .nav-link-primary {
            color: #fff;
            font-weight: 400;
            background: ${colors.primary};
            box-shadow: ${shadow[0]};
            border-radius: 2px;
        }
    }
`;

function mapStateToProps(state: RootState) {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}

function mapDispatchToProps() {
    return {
        logout
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type NavProps = PropsFromRedux;

function Nav(props: NavProps): React.ReactElement {
    const { isLoggedIn, logout } = props;
    let history = useHistory();
    function onLogout() {
        logout();
        history.push('/');
    }
    return (
        <NavStyle>
            <div className="nav-left">
                <Link to="/" className="nav-title">Holdem Tools</Link>
            </div>
            <div className="nav-right">
                { isLoggedIn ? (
                    <button onClick={onLogout} className="nav-link">Logout</button>
                ) : (
                    <>
                        <Link className="nav-link" to="/login">Sign In</Link>
                        <Link className="nav-link nav-link-primary" to="/register">Sign Up</Link>
                    </>
                )}
            </div>
        </NavStyle>
    );
}

export default connector(Nav);
