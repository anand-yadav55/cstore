// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   LOGOUT_SUCCESS,
// } from '../actions';

const initialAuthState = localStorage.getItem('token') ? true : false;
function auth(state = { isAuthenticated: initialAuthState }, action) {
  switch (action.type) {
    case 'checkAuth':
      return { isAuthenticated: localStorage.getItem('token') ? true : false };
    case 'logout':
      localStorage.removeItem('token');
      return {isAuthenticated:false}
    default:
      return { isAuthenticated: false };
  }
}
export default auth;

// function auth(
//   state = {
//     isFetching: false,
//     isAuthenticated: localStorage.getItem('token') ? true : false,
//   },
//   action
// ) {
//   console.log(action.type);
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       return Object.assign({}, state, {
//         isFetching: true,
//         isAuthenticated: false,
//         user: action.creds,
//       });
//     case LOGIN_SUCCESS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         isAuthenticated: true,
//         errorMessage: '',
//       });
//     case LOGIN_FAILURE:
//       return Object.assign({}, state, {
//         isFetching: false,
//         isAuthenticated: false,
//         errorMessage: action.message,
//       });
//     case LOGOUT_SUCCESS:
//       return Object.assign({}, state, {
//         isFetching: true,
//         isAuthenticated: false,
//       });
//     default:
//       return state;
//   }
// }
