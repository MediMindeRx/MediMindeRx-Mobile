export const SET_USER_INFO = 'SET_USER_INFO';

export const setUserInfo = (userData) => {
  return  {
    type: 'SET_USER_INFO',
    userData
  }
}