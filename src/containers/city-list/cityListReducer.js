import
{
    LOAD_PENDING,
    LOAD_RESOLVED,
    LOAD_ERROR,
    LOAD_EVENTS_RESOLVED,
    CLEAR_EVENTS,
    SET_VISIBLE_DETAILS,
    REMOVE_VISIBLE_DETAILS
} from './cityListActionTypes';


const initialState = {
    cities: [],
    loading: false,
    error: false,
    loaded: false,
    events: {},
    visibleDetails: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PENDING:
            return {
                ...state,
                loading: true
            }

        case LOAD_RESOLVED:
            return {
                ...state,
                cities: [...action.payload],
                loaded: true
            }

        case LOAD_ERROR:
            return {
                ...state,
                error: true
            }

        case LOAD_EVENTS_RESOLVED:
            return {
                ...state,
                events: {...action.payload},
                visibleDetails: []
            }

        case CLEAR_EVENTS:
            return {
                ...state,
                events: {},
                visibleDetails: []
            }

        case SET_VISIBLE_DETAILS:
            return {
                ...state,
                visibleDetails: [...state.visibleDetails, action.payload]
            }

        case REMOVE_VISIBLE_DETAILS:
            return {
                ...state,
                visibleDetails: [...state.visibleDetails.filter(el => el !== action.payload)]
            }

        default:
            return state
    }
}