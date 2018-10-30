import
{
  LOAD_PENDING,
  LOAD_RESOLVED,
  LOAD_ERROR,
  LOAD_EVENTS_RESOLVED,
} from './cityListActionTypes';



const initialState = {
  cities: [],
  loading: false,
  error: false,
  loaded: false,
  events: {}
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
        cities: [ ...action.payload ],
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
        events: { ...action.payload }
      }

    default:
      return state
  }

}