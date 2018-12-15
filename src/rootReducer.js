import { combineReducers } from 'redux'
import list from './containers/shift-list-page/shiftListReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    list,
    form: formReducer
})