import { AUTH } from '../constants/actionTypes';
import * as api from '../api';


export const login = (formData, navigate, setCredentialError) => async (dispatch) => {
    try {
        const {data} = await api.login(formData)
        //console.log(data)
        dispatch({type: AUTH, data})
        navigate('/')
    } catch (error) {
        const errorData = error.response.data.message
        setCredentialError(errorData);
    }
}

export const register = (formData, navigate, setCredentialError) => async (dispatch) => {
    try {
        const {data} = await api.register(formData)
        //console.log(data)
        dispatch({type: AUTH, data})
        navigate('/')
    } catch (error) {
        //console.log(error)
        const errorData = error.response.data.message
        setCredentialError(errorData);
    }
}
