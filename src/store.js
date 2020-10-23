// Imports
import { 
  compose, 
  combineReducers,
  createStore,
  applyMiddleware,
 } from 'redux';
 import thunk from 'redux-thunk';
 import {reducer as formReducer} from 'redux-form';

 const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Root Reducer
export const rootReducer = combineReducers({
  // ...userRoute,
  // ...userInfo,
  form: formReducer
})


// Store
export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  )
)