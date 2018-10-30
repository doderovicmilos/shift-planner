import
{
  LOAD_PENDING,
  LOAD_RESOLVED,
  LOAD_ERROR
} from './cityListActionTypes';



const initialState = {
  items: [],
  loading: false,
  error: false,
  loaded: false
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
        items: [ ...action.payload ],
        loaded: true
      }

    case LOAD_ERROR:
      return {
        ...state,
        error: true
      }

    default:
      return state
  }

}