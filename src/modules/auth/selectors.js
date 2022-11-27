import {createSelector} from 'reselect';

export const getToken = state => state.auth.token;
export const getCode = state => state.auth.code;
