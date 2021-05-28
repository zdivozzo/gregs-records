import { combineReducers } from "redux";
import records from './records';
import artists from './artists'
import app from './app'

const appReducers = combineReducers({
  records,
  app,
  artists
});

export default appReducers;
