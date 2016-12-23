import {combineReducers} from 'redux';
import startup from './startup';
import streets from './street';
import intersection from './intersection';
import resources from './resources';
import stage from './stage';
import lanes from './lanes';

const combined = combineReducers({
    startup,
    streets,
    intersection,
    resources,
    stage,
    lanes
});

export default combined;
