import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import UsersReducer from "./reducers/userReducer";
import ProjectReducer from "../store/reducers/projectReducers";
import ItemReducer from "../store/reducers/itemReducers";
import thunk from "redux-thunk";
import { AuthReducer } from "../store/reducers/authReducers";

// const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  users: UsersReducer,
  projects: ProjectReducer,
  itemss: ItemReducer,
  auth: AuthReducer,
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
