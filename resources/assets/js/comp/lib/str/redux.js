import { createStore } from 'redux';

function actions(dispatch) {
    return {
        setUser: (user) => dispatch({ type: "SET_USER", data: user })
    }
}

function states(state) {
    return {
        user: state.user
    }
}

const initialState = {
    user: null
}

function reducer(s = initialState, action) {
    switch (action.type) {
        case 'SET_USER': return { user: state.user = action.data, ...state };
        default: return s;
    }
}

const store = createStore(reducer);

export {
    store,
    actions,
    states
}