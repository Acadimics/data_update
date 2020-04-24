import { combineReducers } from "redux";
import institutions from './institutions';
import constrains from './constrains';
import fields from './fields';
import subjects from './subjects';

export default combineReducers({
    institutions,
    constrains,
    subjects,
    fields
});