import actionCreatorFactory from 'redux-typescript-actions';
import {Lane} from 'core';
let actionCreator = actionCreatorFactory();

export const laneAdded = actionCreator<{cardinal: string, texture_id: number, length: number, width: number}>('LANE_ADDED');
export const laneRemoved = actionCreator<{cardinal: string, lane_id: number, width: number}>('LANE_REMOVED');