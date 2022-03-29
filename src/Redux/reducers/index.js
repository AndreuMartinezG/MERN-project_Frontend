import {combineReducers} from 'redux';

import threads from './threadDetail-reducer';
import credentials from './datosLogin-reducer';

const rootReducer = combineReducers({
    threads,
    credentials
});

export default rootReducer;