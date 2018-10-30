import
{
    LOAD_PENDING,
    LOAD_RESOLVED,
    LOAD_ERROR,
    LOAD_EVENTS_PENDING,
    LOAD_EVENTS_RESOLVED,
    CLEAR_EVENTS
} from './cityListActionTypes';

import { url, key } from '../../util/constants';
import { cities, events } from '../../util/restEndPoints';


import axios from 'axios'



export const loadCities = () => {
  return dispatch => {
    dispatch({
      type: LOAD_PENDING
    });
    axios.get( url + cities, {
      params:{
        key: key,
        city: "rs"
      }
    })
    .then(function (response) {
      console.log(response);
      dispatch({
          type: LOAD_RESOLVED,
          payload: response.data.results
      })
    })
    .catch(function (error) {
      console.error(error);
    })
}};


export const loadEventsForCoordinates = (lon, lat) => {
    return dispatch => {
        dispatch({
            type: LOAD_EVENTS_PENDING
        });
        console.log(url + events);
        axios.get(url + events, {
            params: {
                key: key,
                lon: lon,
                lat: lat
            }
        })
            .then(function (response) {
                console.log(response);
                dispatch({
                    type: LOAD_EVENTS_RESOLVED,
                    payload: response.data
                })
            })
            .catch(function (error) {
                console.error(error);
            })
    }
};

export const clearEvents = () => {
    return {
        type: CLEAR_EVENTS
    }
};