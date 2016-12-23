import {Action as ReduxAction} from 'redux';
import {isType, Action} from 'redux-typescript-actions';
import {canvasResized} from 'actions';

type stageState = {
    width: number,
    height: number
};

const defaultStageState: stageState = {
    width: 800,
    height: 600
}

const stageReducer = (state: stageState = defaultStageState, action: ReduxAction): stageState => {
    if(isType(action, canvasResized)) {
        let {width, height} = action.payload;
        return {...state, width: width, height: height};
    }
    return state;
}

export default stageReducer;