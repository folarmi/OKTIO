import {
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_FAILED_ACTION,
  LOGOUT_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION,
  EMAIL_VERIFY,
  SIGNUP_EXIST_ACTION,
  FORGOT_PASSWORD_CONFIRMED_ACTION,
  FORGOT_PASSWORD_FAILED_ACTION
} from "../constant/authConstant";
import {
  saveTokenInLocalStorage,
  signUp,
  // formatError,
  // login,
  // runLogoutTimer,
  VerifyEmail,
} from "../../services/AuthService";
import axios from "axios";

export function signupAction(
  firstName,
  lastName,
  role,
  email,
  companyname,
  country,
  password,
  history
) {
  return (dispatch) => {
    signUp(
      firstName,
      lastName,
      role,
      email,
      companyname + "-" + country,
      country,
      password
    )
      .then((response) => {
        try {
          saveTokenInLocalStorage(response.data);
          console.log("Success", response.data.responseCode);
          // runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
          if (response.data.responseCode === "00") {
            dispatch(confirmedSignupAction(response.data));
            history.push("/success");
          }

          if (response.data.responseCode === "99") {
            dispatch(ExistSignupAction(response.data));
          }
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => {
        // var response = error;
        // if (
        //   typeof error.details == "undefined" &&
        //   typeof error.response !== "undefined"
        // ) {
        //   response = error.details;
        // }
        // let message =
        //   typeof response.data !== "undefined" &&
        //   typeof response.data.message !== "undefined"
        //     ? response.data.message
        //     : "Unknow error occured.";

        // const errorMessage = formatError(error);
        // dispatch(signupFailedAction(errorMessage));
        const errorMessage = error.response.data.responseDescription;
        console.log("Error", error);
        // const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function logout(history) {
  localStorage.removeItem("userDetails");
 
  // const userDetails = localStorage.getItem("userDetails");
  const guest = localStorage.getItem("guest");
  
  if (guest) {
  history.push(history);
  }
  else{
    history.push("/");
  }
  return {
    type: LOGOUT_ACTION,
  };
}
export function email_verification(token) {
  return (dispatch) => {
    VerifyEmail(token)
      .then((response) => {
        dispatch(emailVerifyConfirm(response.data.ResponseDescription));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function loginAction(email, password, history, dispatch) {
  return (dispatch) => {
    // login(email, password)
    const postData = {
      email,
      password,
    };

    axios
      .post(process.env.REACT_APP_BASE_URL + `/api/auth`, postData)
      .then((response) => {
        // console.log("success Login", response);
        saveTokenInLocalStorage(response.data);
        localStorage.removeItem("guest");

        // runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
        dispatch(loginConfirmedAction(response.data));
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log("Error Login", error);
        // const errorMessage = formatError(error.response.data.responseCode: "03");
        const resCode = error.response.data.responseCode ? true : false;

        const errorMessage = resCode
          ? error.response.data.responseDescription
          : error.response.data;

        dispatch(loginFailedAction(errorMessage));
      });
  };
}



export function forgotPasswordAction(email,history, dispatch) {
  return (dispatch) => {
   
    axios
      .post(process.env.REACT_APP_BASE_URL + `/api/users/ResendConfirmationCode`, email)
      .then((response) => {
        dispatch(forgotPasswordConfirmedAction(response.data));
       })
      .catch((error) => {
         const resCode = error.response.data.responseCode ? true : false;

        const errorMessage = resCode
          ? error.response.data.responseDescription
          : error.response.data;

        dispatch(forgotPasswordFailedAction(errorMessage));
      });
  };
}


export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}
export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}


export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}
export function ExistSignupAction(payload) {
  return {
    type: SIGNUP_EXIST_ACTION,
    payload,
  };
}
export function emailVerifyConfirm(payload) {
  return {
    type: EMAIL_VERIFY,
    payload,
  };
}
export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}


export function forgotPasswordConfirmedAction(data) {
  return {
    type: FORGOT_PASSWORD_CONFIRMED_ACTION,
    payload: data,
  };
}
export function forgotPasswordFailedAction(data) {
  return {
    type: FORGOT_PASSWORD_FAILED_ACTION,
    payload: data,
  };
}

