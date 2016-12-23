import {Action as ReduxAction} from 'redux';
import {isType, Action} from 'redux-typescript-actions';
import {laneAdded, dropDragEntity, laneResizeStarted, laneResizeEnded, laneResizeMove} from 'actions';
import {Texture} from 'pixi.js';

export type Lane = {
    texture: number,
    id: number,
    width: number
    length: number
}

type LanesByCardinal = {
    north: number[],
    south: number[],
    east: number[],
    west: number[],
    [propName: string]: number[]
}

type LanesById = {
    [propName: number]: Lane
}

type Lanes = {
    by_cardinal: LanesByCardinal
    by_id: LanesById
    resize_target: number
    resize_start_pos: number
    resize_start_width: number
}

const defaultLanes: Lanes = {
    by_cardinal: {
        north: [0, 1],
        south: [2, 3],
        east: [4, 5],
        west: [6, 7],
    },
    by_id: {
        0: {id: 0, texture: 1, length: 100, width: 100},
        1: {id: 1, texture: 2, length: 100, width: 100},
        2: {id: 2, texture: 1, length: 100, width: 100},
        3: {id: 3, texture: 2, length: 100, width: 100},
        4: {id: 4, texture: 1, length: 100, width: 100},
        5: {id: 5, texture: 2, length: 100, width: 100},
        6: {id: 6, texture: 1, length: 100, width: 100},
        7: {id: 7, texture: 2, length: 100, width: 100}
    },
    resize_target: null,
    resize_start_pos: 0,
    resize_start_width: 0
}

var id_gen = 7;

const streetReducer = (state: Lanes = defaultLanes, action: ReduxAction): Lanes => {
    if(isType(action, laneAdded)) {
        let new_lane = action.payload;
        id_gen++;
        return {...state,
            by_cardinal: {
                ...state.by_cardinal,
                [new_lane.cardinal]: [...state.by_cardinal[new_lane.cardinal], id_gen]
            },
            by_id: {
                ...state.by_id,
                [id_gen]: {id: id_gen, texture: new_lane.texture_id, width: new_lane.width, length: new_lane.length}
            }
        };
    } else if(isType(action, laneResizeStarted)) {
        return {...state, resize_target: action.payload.id, resize_start_width: action.payload.resize_start_width,resize_start_pos: action.payload.resize_start_pos};
    } else if (isType(action, laneResizeEnded)) {
        return {...state, resize_target: null};
    } else if (isType(action, laneResizeMove)) {
        return {...state,
            by_id: {
                ...state.by_id,
                [action.payload.id]: {
                    ...state.by_id[action.payload.id],
                    width: state.by_id[action.payload.id].width + action.payload.new_width
                }
            }
        }
    }
    return state;
}

export default streetReducer;
