import
{
    LOAD_PENDING,
    LOAD_RESOLVED,
    DISPLAY_PERIOD_SIZE_CHANGE,
    CREATE_PENDING,
    CREATE_RESOLVED,
    SHIFT_SELECTED,
    DISPLAY_PERIOD_INCREMENT
} from './shiftListActionTypes';
import {url, key, firebase} from '../../util/constants';
import {cities, events, shifts} from '../../util/restEndPoints';
import axios from 'axios';
import moment from 'moment';


window.axios = axios;
window.moment = moment;

export const loadShifts = () => {
    return (dispatch, getState) => {
        const { start, end } =  getState().list.displayPeriod;
        dispatch({
            type: LOAD_PENDING
        });
        axios.get(firebase + shifts, {
            params: {
                orderBy: '"endTime"',
                startAt: start.unix(),
                endAt: end.unix()
            }
        })
        .then(function (response) {
            dispatch({
                type: LOAD_RESOLVED,
                payload: response.data
            })
        })
        .catch(function (error) {
            console.error(error);
        })
    }
};

export const changeDisplayPeriodSize = ({value = 1, increment = "day", direction = "right"}={}) => {
    return dispatch => {
        dispatch({
            type: DISPLAY_PERIOD_SIZE_CHANGE,
            payload: { value, increment, direction }
        });
        dispatch(loadShifts());
    }
};

export const icrementDisplayPeriod = ({ decrement= false }={}) => {
    return dispatch => {
        dispatch({
            type: DISPLAY_PERIOD_INCREMENT,
            payload: { decrement }
        });
        dispatch(loadShifts());
    }
};

export const selectShift = ({shiftId, day, employeeId, startTime, endTime}) => {
    return {
        type: SHIFT_SELECTED,
        payload: { shiftId, day, employeeId, startTime, endTime }
    }
};

export const createEditShift = ({shiftId, employeeId, startTime, endTime}) => {

    const data = { employeeId, startTime, endTime };

    return dispatch => {
        dispatch({
            type: CREATE_PENDING
        });
        axios({
            method: shiftId ? 'put' : 'post',
            url: shiftId ? "https://shift-planner-a7968.firebaseio.com/shifts/" + shiftId + ".json" : "https://shift-planner-a7968.firebaseio.com/shifts.json",
            data
        })
        .then(function (response) {
            dispatch({
                type: CREATE_RESOLVED,
                payload: response.data
            });
            dispatch(loadShifts());
            dispatch(selectShift({}));

        })
        .catch(function (error) {
            console.error(error);
        });
    }
}
