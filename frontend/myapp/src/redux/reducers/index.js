import { combineReducers } from "redux";
import auth from "./authSlice";
import project from "./projectSlice";
import user from "./userSlice";
import like from "./likeSlice";
import message from "./message"
const reducers = combineReducers({
  auth,
  project,
  user,
  like,
  message
});
export default reducers;
