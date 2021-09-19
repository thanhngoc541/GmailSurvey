import axios from 'axios'
import * as type from './types';

export const fetchUser = () => async dispatch =>
    dispatch({ type: type.FETCH_USER, payload: await (await axios.get('/api/current_user')).data })
export const handleToken = (token) => async dispatch =>
    dispatch({ type: type.FETCH_USER, payload: await (await axios.post('/api/stripe', token)).data })
export const submitSurvey = (value, history) => async dispatch => {
    const res = await axios.post('/api/surveys', value);
    history.push('/surveys')
    dispatch({ type: type.FETCH_USER, payload: res.data })
}
export const fetchSurveys = () => async dispatch =>
    dispatch({ type: type.FETCH_SURVEYS, payload: await (await axios.get('/api/surveys')).data })