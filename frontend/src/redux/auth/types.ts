export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export type AuthState = {
    isLoggedIn: boolean;
    jwt: string | undefined;
    csrf: string | undefined;
};

interface loginAction {
    type: typeof LOGIN;
    payload: {
        jwt: string,
        csrf: string
    }
}

interface logoutAction {
    type: typeof LOGOUT;
}

export type AuthActionTypes =
    | loginAction
    | logoutAction;