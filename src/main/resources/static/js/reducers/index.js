import { combineReducers } from 'redux';
import groups from './groups';

const terminalManagerApp = combineReducers({
    groups
});

export default terminalManagerApp;