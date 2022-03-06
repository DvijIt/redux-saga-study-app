import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import peopleReducer from "./people";
import userDetailsReducer from "./peopleDetails";

export const history = createBrowserHistory();

function appReducer(state = {}, action) {
  switch (action.type) {
    case "SOME_CASE":
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app: appReducer,
  people: peopleReducer,
  userDetails: userDetailsReducer,
  router: connectRouter(history),
});

export default rootReducer;
