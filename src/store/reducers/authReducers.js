import {
  EMAIL_VERIFY,
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_FAILED_ACTION,
  LOGOUT_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION,
  SIGNUP_EXIST_ACTION,
  FORGOT_PASSWORD_CONFIRMED_ACTION,
  FORGOT_PASSWORD_FAILED_ACTION
} from "../constant/authConstant";

const initialState = {
  auth: {
    email: "",
    idToken: "",
    localId: "",
    expiresIn: "",
    refreshToken: "",
  },
  errorMessage: "",
  successMessage: "",
  showLoading: false,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_CONFIRMED_ACTION:
      return {
        ...state,
        auth: action.payload,
        errorMessage: "",
        successCode: action.payload.responseCode,
        successMessage: action.payload.responseDescription,
        showLoading: false,
      };
    case SIGNUP_EXIST_ACTION:
      return {
        ...state,
        auth: action.payload,
        errorMessage: "",
        successCode: action.payload.responseCode,
        successMessage: action.payload.responseDescription,
        showLoading: false,
      };

    case LOGIN_CONFIRMED_ACTION:
      return {
        ...state,
        auth: action.payload,
        errorMessage: "",
        successMessage: action.payload.responseDescription,
        showLoading: false,
      };
    case LOGIN_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload,
        successMessage: "",
        showLoading: false,
      };
      
    case SIGNUP_FAILED_ACTION:
      return {
        ...state,
        errorMessage: action.payload,
        successMessage: "",
        showLoading: false,
      };
    case LOGOUT_ACTION:
      return {
        ...state,
        errorMessage: "",
        successMessage: "",
        auth: {
          email: "",
          idToken: "",
          localId: "",
          expiresIn: "",
          refreshToken: "",
        },
      };
    case LOADING_TOGGLE_ACTION:
      return {
        ...state,
        showLoading: action.payload,
      };
    case EMAIL_VERIFY:
      return {
        ...state,
        emaiVerify: action.payload,
      };

      case FORGOT_PASSWORD_CONFIRMED_ACTION:
      return {
        ...state,
        auth: action.payload,
        errorMessage: "",
        successMessage: action.payload.ResponseDescription,
        showLoading: false,
      };
      case FORGOT_PASSWORD_FAILED_ACTION:
        return {
          ...state,
          errorMessage: action.payload,
          successMessage: "",
          showLoading: false,
        };
        
    default:
      return state;
  }
};
