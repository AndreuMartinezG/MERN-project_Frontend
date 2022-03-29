import {THREAD_DETAIL} from '../types.js';

const initialState = {
    threads : []
};

const busquedaThreadsReducer = (state = initialState, action) => {

    switch(action.type){
        case THREAD_DETAIL :
            return action.payload;

        default :
            return state;
    }
}

export default busquedaThreadsReducer;