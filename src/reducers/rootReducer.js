import { combineReducers } from "redux";
import bookReducer from "./bookReducer";
import tickerReducer from "./tickerReducer";
export default combineReducers({
    bookReducer,
    tickerReducer
});
