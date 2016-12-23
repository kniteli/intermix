import {Action as ReduxAction} from 'redux';
import {isType, Action} from 'redux-typescript-actions';
import {startupDataLoaded} from 'actions';
import {Texture} from 'pixi.js';

type resourcesState = {
    textures: Texture[]
};

const defaultResourcesState: resourcesState = {
    textures: []
}

const startupReducer = (state: resourcesState = defaultResourcesState, action: ReduxAction): resourcesState => {
    if(isType(action, startupDataLoaded)) {
        return {...state, textures: [...state.textures, ...action.payload.resources]};
    }
    return state;
}

export default startupReducer;