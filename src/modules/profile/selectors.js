import {createSelector} from 'reselect';

export const getProfile = state => state.profile;
export const getProfileSuccess = state => state.profile.set_profile_success;
export const getUUID = state => state.profile.uuid;
