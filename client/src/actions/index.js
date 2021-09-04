import axios from 'axios'
import * as type from './types';

export const fetchUser = () => async dispatch =>
    dispatch({ type: type.FETCH_USER, payload: await (await axios.get('/api/current_user')).data })
export const handleToken = (token) => async dispatch =>
    dispatch({ type: type.FETCH_USER, payload: await (await axios.post('/api/stripe', token)).data })


