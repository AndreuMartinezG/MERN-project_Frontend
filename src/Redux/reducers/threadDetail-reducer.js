import {THREAD_DETAIL} from '../types.js';

const initialState = {
    threads : [],
    selectedThread: null
};

const busquedaThreadsReducer = (state = initialState, action) => {

    switch(action.type){
        case THREAD_DETAIL :
            return { ...state, selectedThread: action.payload };

        default :
            return state;
    }
}

export default busquedaThreadsReducer;