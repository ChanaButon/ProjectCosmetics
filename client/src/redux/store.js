import { createStore, combineReducers, } from 'redux';
// יבוא כל הרדוסרס
import UserReducer from './reducer'
const reducer = combineReducers({ UserReducer });


const store = createStore(reducer);
window.store = store;
export default store;
