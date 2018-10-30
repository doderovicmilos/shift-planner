import axios from 'axios';

export const SAVE_PENDING = 'formPage/SAVE_PENDING'
export const SAVE_RESOLVED = 'formPage/SAVE_RESOLVED'
export const SAVE_ERROR = 'formPage/SAVE_ERROR'

const initialState = {
  saving: false,
  saved: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PENDING:
      return {
        ...state,
        saving: true
      }

    case SAVE_RESOLVED:
      return {
        ...state,
        saved: true,
        error: false,
        saving: false
      }

    case SAVE_ERROR:
      return {
        ...state,
        saved: false,
        error: true,
        saving: false
      }

    default:
      return state
  }
}

export const save = (data) => {
  console.log(data);
  return dispatch => {
    dispatch({
      type: SAVE_PENDING,
    })

    axios({
      method: 'post',
      url: 'https://reqres.in/api/login',
      data: JSON.stringify(data),
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(function (response) {
      // handle response
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });


  }
}
