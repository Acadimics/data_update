import api from '../../api';
import { GET_BAGRUTS } from './types';

export const fetchBagruts = () => async dispatch => {
    const bagruts = await api.getBagruts();

    dispatch({
        type: GET_BAGRUTS,
        payload: bagruts
    });
};