import {Action as ReduxAction} from 'redux';
import {isType, Action} from 'redux-typescript-actions';
import {laneAdded} from 'actions';
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
    by_cardinal: LanesByCardinal,
    by_id: LanesById
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
    }
}

var id_gen = 7;

const streetReducer = (state: Lanes = defaultLanes, action: ReduxAction): Lanes => {
    if(isType(action, laneAdded)) {
        let {lane, cardinal} = action.payload;
        id_gen++;
        return {...state,
            by_cardinal: {
                ...state.by_cardinal,
                [cardinal]: [...state.by_cardinal[cardinal], id_gen]
            },
            by_id: {
                ...state.by_id,
                [id_gen]: {id: id_gen, texture: null, width: 100, length: 100}
            }
        };
    }
    return state;
}

export default streetReducer;
