import actionCreatorFactory, {Action} from 'redux-typescript-actions';
import {Intersection} from 'core';

let actionCreator = actionCreatorFactory();

export const canvasResized = actionCreator<{width: number, height: number}>('CANVAS_RESIZED');