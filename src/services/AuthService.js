import axios from "axios";
import { loginConfirmedAction, logout } from "../store/actions/authActions";
//
export function signUp(
  first_name,
  last_name,
  role,
  email,
  company_name,
  country,
  password
) {
  const postData = {
    first_name,
    last_name,
    role,
    email,
    company_name,
    country,
    password,
  };
  return axios.post(
    process.env.REACT_APP_BASE_URL + `/api/users`,
    postData
    // {
    //   headers: headers,
    // }
  );
}

export function login(email, password) {
  const postData = {
    email,
    password,
  };

  return axios.post(process.env.REACT_APP_BASE_URL + `/api/auth`, postData);
}
export function VerifyEmail(token) {
  return axios.get(process.env.REACT_APP_BASE_URL + `/verifyEmail/${token}`);
}
export function formatError(errorResponse) {
  console.log("Service Error", errorResponse);
  switch (errorResponse) {
    case "responseDescription":
      return "Email already exists";

    case "EMAIL_EXISTS":
      return "Email already exists";

    case "EMAIL_NOT_FOUND":
      return "Email not found";
    case "INVALID_PASSWORD":
      return "Invalid Password";
    case "USER_DISABLED":
      return "User Disabled";

    default:
      return "";
  }
}

export function saveTokenInLocalStorage(tokenDetails) {
  tokenDetails.expireDate = new Date(
    new Date().getTime() + tokenDetails.expiresIn * 1000
  );
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
  setTimeout(() => {
    dispatch(logout(history));
  }, timer);
}

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem("userDetails");
  let tokenDetails = "";
  if (!tokenDetailsString) {
    dispatch(logout(history));
    return;
  }

  tokenDetails = JSON.parse(tokenDetailsString);
  // let expireDate = new Date(tokenDetails.expireDate);
  // let todaysDate = new Date();

  // if (todaysDate > expireDate) {
  //   dispatch(logout(history));
  //   return;
  // }
  dispatch(loginConfirmedAction(tokenDetails));

  // const timer = expireDate.getTime() - todaysDate.getTime();
  // runLogoutTimer(dispatch, timer, history);
}
