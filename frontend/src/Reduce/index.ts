import { combineReducers } from 'redux'

import stock from '../Components/Admin/components/Stock/reducerStock'

const rootReducer = combineReducers({
  stock: stock
})

export default rootReducer