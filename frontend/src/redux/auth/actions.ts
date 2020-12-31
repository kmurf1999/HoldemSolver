import {
    AuthActionTypes,
    LOGIN,
    LOGOUT
} from './types';

export function login(jwt: string, csrf: string): AuthActionTypes {
    return {
        type: LOGIN,
        payload: {
            jwt, csrf
        }
    }
}

export function logout(): AuthActionTypes {
    return {
        type: LOGOUT
    }
}