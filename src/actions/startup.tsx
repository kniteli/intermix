import actionCreatorFactory from 'redux-typescript-actions';
import {Texture} from 'pixi.js';

let actionCreator = actionCreatorFactory();

export const startupDataLoaded = actionCreator<{resources: Texture[]}>('STARTUP_DATA_LOADED');
