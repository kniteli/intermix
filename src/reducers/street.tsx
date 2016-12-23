import {Action as ReduxAction} from 'redux';
import {isType, Action} from 'redux-typescript-actions';
import {laneAdded, laneRemoved, canvasResized, dropDragEntity, laneResizeMove} from 'actions';
import {Lane} from 'core';

type Street = {
    width: number,
    length: number,
    orientation: string
}

type Streets = {
    north: Street,
    south: Street,
    east: Street,
    west: Street
    [propName: string]: Street
}

const defaultStreets: Streets = {
    north: {
        width: 200,
        length: 100,
        orientation: 'vertical'
    },
    south: {
        width: 200,
        length: 100,
        orientation: 'vertical'
    },
    east: {
        width: 200,
        length: 100,
        orientation: 'horizontal'
    },
    west: {
        width: 200,
        length: 100,
        orientation: 'horizontal'
    },
}

const perpendicular = (cardinal: string) => {
    if(cardinal === 'north' || cardinal === 'south') {
        return ['east', 'west'];
    } else if (cardinal === 'west' || cardinal === 'east') {
        return ['north', 'south'];
    }
}

const streetReducer = (state: Streets = defaultStreets, action: ReduxAction): Streets => {
    if(isType(action, laneAdded)) {
        let new_lane = action.payload;
        let street = state[new_lane.cardinal];
        let [opp1, opp2] = perpendicular(new_lane.cardinal);
        return {
            ...state, 
            [new_lane.cardinal]: {...street, width: street.width + new_lane.width},
            [opp1]: {...state[opp1], length: state[opp1].length - new_lane.width/2 },
            [opp2]: {...state[opp2], length: state[opp2].length - new_lane.width/2 }
        };
    } else if(isType(action, laneRemoved)) {
        let removed_lane = action.payload;
        let street = state[removed_lane.cardinal];
        return {...state, [removed_lane.cardinal]: {...street, width: street.width - removed_lane.width}};
    } else if(isType(action, canvasResized)) {
        return {
            ...state,
            north: {
                ...state.north,
                length: (action.payload.height - state.east.width)/2
            },
            south: {
                ...state.south,
                length: (action.payload.height - state.east.width)/2
            },
            east: {
                ...state.east,
                length: (action.payload.width - state.north.width)/2
            },
            west: {
                ...state.west,
                length: (action.payload.width - state.north.width)/2
            },
        }
    } else if(isType(action, laneResizeMove)) {
        let [opp1, opp2] = perpendicular(action.payload.cardinal);
        return {
            ...state,
            [action.payload.cardinal]: {
                ...state[action.payload.cardinal],
                width: state[action.payload.cardinal].width + action.payload.new_width
            },
            [opp1]: {...state[opp1], length: state[opp1].length - action.payload.new_width/2 },
            [opp2]: {...state[opp2], length: state[opp2].length - action.payload.new_width/2 }
        }
    }
    return state;
}

export default streetReducer;