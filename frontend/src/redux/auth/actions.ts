import { AuthActionTypes, LOGIN_REQUEST, REGISTER_REQUEST } from './types';

export function login(email: string, password: string): AuthActionTypes {
    return {
        type: LOGIN_REQUEST,
        payload: {
            email,
            password
        }
    };
}


export function register(email: string, password: string): AuthActionTypes {
    return {
        type: REGISTER_REQUEST,
        payload: {
            email,
            password
        }
    };
}