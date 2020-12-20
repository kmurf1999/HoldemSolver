import { REGISTER_REQUEST, AuthActionTypes, LOGIN_REQUEST } from "./types";
import { takeLatest } from 'redux-saga/effects';

function* register(action: AuthActionTypes) {
    const { email, password } = action.payload;
}

function* registerWatcher() {
    yield takeLatest(REGISTER_REQUEST, register);
}

function* loginWatcher() {
    yield takeLatest(LOGIN_REQUEST, login);
}

function* login(action: AuthActionTypes) {
    const { email, password } = action.payload;
}

export default function*() {
    yield [
        loginWatcher(),
        registerWatcher()
    ];
}