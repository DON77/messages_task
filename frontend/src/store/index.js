import messages from './messages/reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    messages
})

export default rootReducer