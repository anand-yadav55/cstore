export function checkAuth() {
  // let payload = {
  //   vehicle: 'Car',
  // };
  return {
    type: 'checkAuth',
    // payload,
  };
}
export function logout(){
  return {
    type:'logout'
  }
}

// export const LOGIN_REQUEST = 'LOGIN_REQUEST';
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// function requestLogin(creds) {
//   return {
//     type: LOGIN_REQUEST,
//     isFetching: true,
//     isAuthenticated: false,
//     creds,
//   };
// }

// function receiveLogin(user) {
//   return {
//     type: LOGIN_SUCCESS,
//     isFetching: false,
//     isAuthenticated: true,
//     token: user.token,
//   };
// }

// function loginError(message) {
//   return {
//     type: LOGIN_FAILURE,
//     isFetching: false,
//     isAuthenticated: false,
//     message,
//   };
// }

// export function loginUser(creds) {
//   let config = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body: `email=${creds.email}&password=${creds.password}`,
//   };
//   console.log(creds);
//   return (dispatch) => {
//     // We dispatch requestLogin to kickoff the call to the API
//     console.log(dispatch);
//     dispatch(requestLogin(creds));

//     return fetch('http://localhost:8080/api/users/login', config)
//       .then((response) => {
//         response.json().then((user) => ({ user, response }));
//         console.log();
//       })
//       .then(({ user, response }) => {
//         if (!response.ok) {
//           // If there was a problem, we want to
//           // dispatch the error condition
//           console.log(response);
//           dispatch(loginError(user.message));
//           return Promise.reject(user);
//         } else {
//           console.log(response);

//           // If login was successful, set the token in local storage
//           localStorage.setItem('token', user.token);
//           //   localStorage.setItem('id_token', user.access_token);
//           // Dispatch the success action
//           dispatch(receiveLogin(user));
//         }
//       })
//       .catch((err) => console.log('Error: ', err));
//   };
// }
// export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
// export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
// export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// function requestLogout() {
//   return {
//     type: LOGOUT_REQUEST,
//     isFetching: true,
//     isAuthenticated: true,
//   };
// }

// function receiveLogout() {
//   return {
//     type: LOGOUT_SUCCESS,
//     isFetching: false,
//     isAuthenticated: false,
//   };
// }

// // Logs the user out
// export function logoutUser() {
//   return (dispatch) => {
//     dispatch(requestLogout());
//     localStorage.removeItem('token');
//     // localStorage.removeItem('access_token');
//     dispatch(receiveLogout());
//   };
// }
// //
