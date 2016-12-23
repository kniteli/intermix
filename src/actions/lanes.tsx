import actionCreatorFactory from 'redux-typescript-actions';
import {Texture} from 'pixi.js';
let actionCreator = actionCreatorFactory();

export const startDragEntity = actionCreator<{texture_id: number}>('ENTITY_STARTED_CREATE');
export const dropDragEntity = actionCreator<{texture_id: number}>('ENTITY_DRAG_DROP');
export const laneResizeStarted = actionCreator<{id: number, resize_start_width: number, resize_start_pos: number}>('LANE_RESIZE_START');
export const laneResizeEnded = actionCreator<{}>('LANE_RESIZE_END');
export const laneResizeMove = actionCreator<{id: number, new_width: number, cardinal: string}>('LANE_RESIZE_MOVE');