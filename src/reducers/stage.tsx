import {Action as ReduxAction} from 'redux';
import {isType, Action} from 'redux-typescript-actions';

type stageState = {
    width: number,
    height: number
};

const defaultStageState: stageState = {
    width: 800,
    height: 600
}

const stageReducer = (state: stageState = defaultStageState, action: ReduxAction): stageState => {
    return state;
}

export default stageReducer;