import { combineReducers } from "redux";
import advertismentReducer from "./advertisementReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  advertisment: advertismentReducer,
  order: orderReducer,
});

export default rootReducer;
