import actionCreatorFactory from 'redux-typescript-actions';
import {Lane} from 'core';
let actionCreator = actionCreatorFactory();

export const laneAdded = actionCreator<{cardinal: string, lane: Lane}>('LANE_ADDED');
export const laneRemoved = actionCreator<{cardinal: string, lane: Lane}>('LANE_REMOVED');