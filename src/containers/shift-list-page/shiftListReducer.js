import
{
    LOAD_PENDING,
    LOAD_RESOLVED,
    DISPLAY_PERIOD_SIZE_CHANGE,
    SHIFT_SELECTED,
    DISPLAY_PERIOD_INCREMENT
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


        case DISPLAY_PERIOD_SIZE_CHANGE:
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

        case DISPLAY_PERIOD_INCREMENT:
            return {
                ...state,
                displayPeriod: action.payload.decrement
                    ?
                    moment.range(moment(state.displayPeriod.start).add( 0 - [...state.displayPeriod.by('day')].length, 'day').startOf('day'), moment(state.displayPeriod.start).add(-1, 'day').startOf('day'))
                    :
                    moment.range(moment(state.displayPeriod.end).add(1, 'day').startOf('day'), moment(state.displayPeriod.end).add([...state.displayPeriod.by('day')].length, 'day').startOf('day'))
            }

        default:
            return state
    }
}