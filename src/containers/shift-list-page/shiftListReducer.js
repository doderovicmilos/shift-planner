import
{
    LOAD_PENDING,
    LOAD_RESOLVED,
    DISPLAY_PERIOD_CHANGE,
    SHIFT_SELECTED
} from './shiftListActionTypes';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const initialState = {
    shifts: {},
    displayPeriod: moment.range(moment().startOf('isoWeek'), moment().endOf('isoWeek')),
    loading: false,
    loaded: false,
    selectedShift: {}
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
                shifts: {...action.payload},
                loading: false,
                loaded: true
            }


        case DISPLAY_PERIOD_CHANGE:
            return {
                ...state,
                displayPeriod: action.payload.direction === 'right'
                    ?
                    moment.range(moment(state.displayPeriod.start), moment(state.displayPeriod.end.add(action.payload.value, action.payload.increment)))
                    :
                    moment.range(moment(state.displayPeriod.start.add(-action.payload.value, action.payload.increment)), moment(state.displayPeriod.end))
            }

        case SHIFT_SELECTED:
            return {
                ...state,
                selectedShift: { ...action.payload }
            }

        // case LOAD_EVENTS_RESOLVED:
        //     return {
        //         ...state,
        //         events: {...action.payload},
        //         visibleDetails: []
        //     }
        //
        // case CLEAR_EVENTS:
        //     return {
        //         ...state,
        //         events: {},
        //         visibleDetails: []
        //     }
        //
        // case SET_VISIBLE_DETAILS:
        //     return {
        //         ...state,
        //         visibleDetails: [...state.visibleDetails, action.payload]
        //     }
        //
        // case REMOVE_VISIBLE_DETAILS:
        //     return {
        //         ...state,
        //         visibleDetails: [...state.visibleDetails.filter(el => el !== action.payload)]
        //     }

        default:
            return state
    }
}