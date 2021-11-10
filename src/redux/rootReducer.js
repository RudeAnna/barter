import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'
import bartersReducer from './barter/barterReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    barters: bartersReducer,
})

export default rootReducer