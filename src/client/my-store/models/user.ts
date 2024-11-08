'use client';

import { Action, createStore, createTypedHooks, persist, Thunk } from 'easy-peasy';
import { action, thunk } from 'easy-peasy';
import Ajax from 'tools/Ajax';
import axios from 'axios';
//import { reactLocalStorage } from 'reactjs-localstorage';

export interface UserRequest {
    username: string;
    password: string;
}

export interface User {
    username: string;
}

export interface UserModel {
    token: string | null;
    username: string | null;
    setUsername: Action<UserModel, string>;
    signIn: Thunk<UserModel, UserRequest>;
    userLoading: boolean;
    setUserLoading: Action<UserModel, boolean>;
    userError: any;
    setUserError: Action<UserModel, any>;
    signUp: Thunk<UserModel, UserRequest>;
    loadTokenToMemory: Action<UserModel>;
    removeTokenFromStorage: Action<UserModel>;
    saveTokenToStorage: Action<UserModel, string>;
    logOut: Action<UserModel>;
    getToken: Action<UserModel>;
}

const user: UserModel = {
    token: null,
    username: null,
    setUsername: action((state, payload) => {
        sessionStorage.setItem('username', payload);
        state.username = payload;
    }),
    signIn: thunk(async (actions, payload: UserRequest) => {
        console.log('signIn', payload);
        const controller = new AbortController();

        const data = await axios.post('http://localhost:8000/api/auth/signin', payload, { signal: controller.signal });

        console.log('data', data);
        actions.saveTokenToStorage(data.data.accessToken);
        return {data: data, controller: controller};
    }),
    userLoading: false,
    setUserLoading: action((state, payload) => {
        state.userLoading = payload;
    }),
    userError: null,
    setUserError: action((state, payload) => {
        state.userError = payload;
    }),
    signUp: thunk(async (actions, payload: UserRequest) => {
        await Ajax.post(`auth/signup`, payload);
    }),
    loadTokenToMemory: action((state, actions) => {
        state.token = localStorage.getItem('token');
    }),
    removeTokenFromStorage: action((state, actions) => {
        localStorage.removeItem('token');
    }),
    saveTokenToStorage: action((state, payload) => {
        localStorage.setItem('token', payload);
    }),
    getToken: action((state: any, actions) => {
        return localStorage.getItem('token');
    }),
    logOut: action((state: any, actions) => {
        state.username = '';
        sessionStorage.removeItem('token');
    })
};

export default user;
