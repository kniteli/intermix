import {Action as ReduxAction} from 'redux';
import {isType, Action} from 'redux-typescript-actions';
import {startupDataLoaded, startDragEntity, laneAdded} from 'actions';
import {Texture} from 'pixi.js';

type resourcesState = {
    textures: Texture[]
    droppable: number
    loaded: boolean
};

const defaultResourcesState: resourcesState = {
    textures: [],
    droppable: null,
    loaded: false
}

const resourcesReducer = (state: resourcesState = defaultResourcesState, action: ReduxAction): resourcesState => {
    if(isType(action, startupDataLoaded)) {
        return {...state, textures: [...state.textures, ...action.payload.resources], loaded: true};
    } else if(isType(action, startDragEntity)) {
        return {...state, droppable: action.payload.texture_id};
    } else if(isType(action, laneAdded)) {
        return {...state, droppable: null};
    }
    return state;
}

export default resourcesReducer;