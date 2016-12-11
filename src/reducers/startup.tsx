import {Action as ReduxAction} from 'redux';
import {isType, Action} from 'redux-typescript-actions';
import {startupDataLoaded} from 'actions';
import {LaneMap} from 'core';

type startupState = {data: LaneMap};

const startupReducer = (state: startupState, action: ReduxAction): startupState => {
    if(isType(action, startupDataLoaded)) {
        return {...state, data: action.payload.data};
    }
    return state;
}

export default startupReducer;