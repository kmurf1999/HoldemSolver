import {
    LOGIN,
    LOGOUT,
    AuthActionTypes,
    AuthState
} from './types';

const defaultState = {
    jwt: undefined,
    csrf: undefined,
    isLoggedIn: false
};

function authReducer(state = defaultState, action: AuthActionTypes): AuthState {
    switch(action.type) {
        case LOGIN:
            const { jwt, csrf } = action.payload;
            localStorage.setItem('jwt', jwt);
            localStorage.setItem('csrf', csrf);
            return {
                jwt,
                csrf,
                isLoggedIn: true
            };
        case LOGOUT:
            localStorage.removeItem('jwt');
            localStorage.removeItem('csrf');
            return {
                jwt: undefined,
                csrf: undefined,
                isLoggedIn: false
            };
        default:
            return state;
    }
}

export default authReducer;