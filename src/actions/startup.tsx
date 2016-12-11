import actionCreatorFactory from 'redux-typescript-actions';
import {LaneMap} from 'core';

let actionCreator = actionCreatorFactory();

export const startupDataLoaded = actionCreator<{data: LaneMap}>('STARTUP_DATE_LOADED');
