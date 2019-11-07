import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router';

export const putLogin_ = (user) => {
  return {
    type: actionTypes.PUT_LOGIN,
    id: user.id,
    email: user.email,
    password: user.password,
    name: user.name,
    logged_in: user.logged_in
  };
};

export const putLogin = (user) => {
  return (dispatch) => {
    return axios.put('/api/user/1', user)
      .then(res => dispatch(putLogin_(user)))
      .then(() => dispatch(push('/articles/')));
  };
};

export const putLogout_ = (user) => {
  return {
    type: actionTypes.PUT_LOGOUT,
    id: user.id,
    email: user.email,
    password: user.password,
    name: user.name,
    logged_in: user.logged_in
  };
};

export const putLogout = (user) => {
  return (dispatch) => {
    return axios.put('/api/user/1', user)
      .then(res => dispatch(putLogout_(user)))
      .then(() => dispatch(push('/login/')));
  };
};


export const getLogin_ = (user) => {
  return {
    type: actionTypes.GET_LOGIN,
    target: user
  };
};

export const getLogin = () => {
  return (dispatch) => {
    return axios.get('/api/user/1')         // <=> return axios.get('/api/user/' + id)
      .then(res => {
        dispatch(getLogin_(res.data));
      })
  }
}
