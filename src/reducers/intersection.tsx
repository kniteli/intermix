import {Action as ReduxAction} from 'redux';
import {isType, Action} from 'redux-typescript-actions';
import {canvasResized} from 'actions';
import {Lane} from 'core';

const positional_grid = (canvas_width: number, canvas_height: number) => (ver_pos: string, hor_pos: string) => {
    //turn switch into let-match
    let x = (() => {
        switch(hor_pos) {
            case 'left':
                return 0;
            case 'center':
                return canvas_width/2;
            case 'right':
                return canvas_width;
        }
    })();
    let y = (() => {
        switch(ver_pos) {
            case 'top':
                return 0;
            case 'center':
                return canvas_height/2;
            case 'bottom':
                return canvas_height;
        }
    })();

    return [x, y];
}

type Intersection = {
    positions: {
        north: number[],
        south: number[],
        east: number[],
        west: number[],
        intersection: number[],
    }
};

const CANVAS_WIDTH_DEFAULT = 800;
const CANVAS_HEIGHT_DEFAULT = 600;
let default_grid = positional_grid(CANVAS_WIDTH_DEFAULT, CANVAS_HEIGHT_DEFAULT);

const defaultIntersection: Intersection = {
    positions: {
        north: default_grid('top', 'center'),
        south: default_grid('bottom', 'center'),
        east: default_grid('center', 'right'),
        west: default_grid('center', 'left'),
        intersection: default_grid('center', 'center'),
    }
}

const intersectionReducer = (state: Intersection = defaultIntersection, action: ReduxAction): Intersection => {
    if(isType(action, canvasResized)) {
        let {width, height} = action.payload;
        let grid = positional_grid(width, height);
        return {
            ...state,
            positions: {
                north: grid('top', 'center'),
                south: grid('bottom', 'center'),
                east: grid('center', 'right'),
                west: grid('center', 'left'),
                intersection: grid('center', 'center')
            }
        };
    }
    return state;
}

export default intersectionReducer;
