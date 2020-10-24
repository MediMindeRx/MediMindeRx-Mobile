import {
  SET_USER_INFO
} from './actions'
import {BaseRouter} from '@react-navigation/native'

export const user = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {user: action.userData}
      default: 
      return state
  }
}
