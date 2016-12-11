import {combineReducers} from 'redux';
import startupReducer from './startup';

const combined = combineReducers({
    startupReducer
});

export default combined;