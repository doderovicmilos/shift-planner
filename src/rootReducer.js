import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import counter from './modules/counter'
import list from './containers/city-list/cityListReducer'
import formPage from './modules/formPage'

export default combineReducers({
  counter,
  list,
  formPage,
  form: formReducer
})