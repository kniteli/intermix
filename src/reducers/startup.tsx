import {Action as ReduxAction} from 'redux';
import {isType, Action} from 'redux-typescript-actions';
import {startupDataLoaded} from 'actions';
import {Intersection} from 'core';

type startupState = {data: Intersection};

const startupReducer = (state: startupState = {data: null}, action: ReduxAction): startupState => {
    return state;
}

export default startupReducer;
