import api from '../../api';
import { FETCH_CONSTRAINS, CREATE_CONSTRAIN, UPDATE_CONSTRAIN, REMOVE_CONSTRAIN } from './types';

export const fetchConstraints = () => async dispatch => {
    const constrains = await api.getConstraints();

    dispatch({
        type: FETCH_CONSTRAINS,
        payload: constrains
    });
};

export const createConstrain = (data) => async dispatch => {
    const {_id} = await api.addConstraint(data);

    dispatch({
        type: CREATE_CONSTRAIN,
        payload: {...data, _id}
    })
}

export const updateConstrain = (data) => async dispatch => {
    await api.updateConstraint(data);

    dispatch({
        type: UPDATE_CONSTRAIN,
        payload: data
    })
}

export const removeConstrain = (data) => async dispatch => {
    await api.removeConstraint(data);

    dispatch({
        type: REMOVE_CONSTRAIN,
        payload: data
    })
}