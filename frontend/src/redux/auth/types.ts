export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGUSTER_SUCCESS = 'REGISTER_SUCCESS';

interface loginAction {
    type: typeof LOGIN_REQUEST;
    payload: { email: string, password: string }
}

interface registerAction {
    type: typeof REGISTER_REQUEST;
    payload: { email: string, password: string }
}

export type AuthActionTypes = loginAction | registerAction;