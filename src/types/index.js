/* @flow */

import type { Store as ReduxStore } from 'redux';

export type Store = ReduxStore;
/* eslint-disable no-use-before-define, no-undef */
export type Dispatch = (action | ThunkAction | PromiseAction | Array) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch, getState) => any;
export type PromiseAction = Promise;
