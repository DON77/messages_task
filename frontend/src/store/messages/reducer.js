import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
  fetching: false,
  list: [],
  message: []
})

export default function reduce (state = initialState, action = {}) {
  switch (action.type) {
    case types.LIST_REQUEST:
      return state.merge({
        fetching: true
      })
    case types.LIST_SUCCESS:
      return state.merge({
        list: action.payload,
        fetching: false
      })
    case types.LIST_ERROR:
      return state.merge({
        error: action.payload.err,
        fetching: false
      })

    case types.CREATE_MESSAGE_REQUEST:
      return state.merge({
        fetching: true
      })
    case types.CREATE_MESSAGE_SUCCESS:
      return state.merge({
        message: action.payload,
        fetching: false
      })
    case types.CREATE_MESSAGE_ERROR:
      return state.merge({
        error: action.payload.err,
        fetching: false
      })

    case types.EDIT_MESSAGE_REQUEST:
      return state.merge({
        fetching: true
      })
    case types.EDIT_MESSAGE_SUCCESS:
      return state.merge({
        message: action.payload,
        fetching: false
      })
    case types.EDIT_MESSAGE_ERROR:
      return state.merge({
        error: action.payload.err,
        fetching: false
      })

    case types.DELETE_MESSAGE_REQUEST:
      return state.merge({
        fetching: true
      })
    case types.DELETE_MESSAGE_SUCCESS:
      return state.merge({
        fetching: false
      })
    case types.DELETE_MESSAGE_ERROR:
      return state.merge({
        fetching: false
      })

    default:
      return state
  }
}
