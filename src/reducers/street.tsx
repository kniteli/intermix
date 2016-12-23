import {Action as ReduxAction} from 'redux';
import {isType, Action} from 'redux-typescript-actions';
import {laneAdded, laneRemoved, canvasResized} from 'actions';
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

const streetReducer = (state: Streets = defaultStreets, action: ReduxAction): Streets => {
    if(isType(action, laneAdded)) {
        let {cardinal, lane} = action.payload;
        let street = state[cardinal];
        return {...state, [cardinal]: {...street, width: street.width + lane.state.width}};
    }
    if(isType(action, laneRemoved)) {
        let {cardinal, lane} = action.payload;
        let street = state[cardinal];
        return {...state, [cardinal]: {...street, width: street.width - lane.state.width}};
    }
    if(isType(action, canvasResized)) {
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
    }
    return state;
}

export default streetReducer;