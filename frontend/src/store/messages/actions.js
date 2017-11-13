import * as types from './actionTypes'
import axios from 'axios'

const API = 'http://localhost:8080'

export function getList() {
    return dispatch => {
        try {
            dispatch({ type: types.LIST_REQUEST })
            axios.get(API).then(response => {
                const { data } = response
                dispatch({ type: types.LIST_SUCCESS, payload: data})

            })
        } catch (err) {
            dispatch({ type: types.LIST_ERROR, payload: {err} })
        }
    }
    
}

export function createMessage(params) {
    return async dispatch => {
        try {
            dispatch({ type: types.CREATE_MESSAGE_REQUEST })
            axios.post(API, {
                title: params.title,
                body: params.body
            }).then(response => {
                const { data } = response
                dispatch({ type: types.CREATE_MESSAGE_SUCCESS, payload: data })
                dispatch(getList())
            })
        } catch (err) {
            dispatch({ type: types.CREATE_MESSAGE_ERROR, payload: {err} })
        }
    }
}

export function editMessage(params, id) {
    return async dispatch => {
        try {
            dispatch({ type: types.EDIT_MESSAGE_REQUEST })
            axios.put(API, {
                title: params.title,
                body: params.body,
                id
            }).then(() => {
                dispatch({ type: types.EDIT_MESSAGE_SUCCESS })
                dispatch(getList())
            })

        } catch (err) {
            dispatch({ type: types.EDIT_MESSAGE_ERROR, payload: {err} })
        }
    }
}

export function deleteMessage(id) {
    return async dispatch => {
        try {
            dispatch({ type: types.DELETE_MESSAGE_REQUEST })
            axios.delete(`${API}/${id}`).then(response => {
                dispatch({ type: types.DELETE_MESSAGE_SUCCESS })                
                dispatch(getList())
            })
        } catch (err) {
            dispatch({ type: types.DELETE_MESSAGE_ERROR, payload: {err} })
        }
    }
    
}