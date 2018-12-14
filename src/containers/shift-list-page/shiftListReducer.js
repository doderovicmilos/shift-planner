import
{
    LOAD_PENDING,
    LOAD_RESOLVED,
    LOAD_ERROR,
    LOAD_EVENTS_RESOLVED,
    CLEAR_EVENTS,
    SET_VISIBLE_DETAILS,
    REMOVE_VISIBLE_DETAILS
} from './shiftListActionTypes';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const initialState = {
    shifts: {},
    displayPeriod: moment.range(moment().startOf('month'), moment().endOf('month')),
    loading: false,
    error: false,
    loaded: false,
    events: {},
    visibleDetails: []
}


export default (state = initialState, action) => {

    console.log(action.payload);

    switch (action.type) {
        case LOAD_PENDING:
            return {
                ...state,
                loading: true
            }

        case LOAD_RESOLVED:
            return {
                ...state,
                shifts: {...action.payload},
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