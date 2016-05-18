import fetch from 'isomorphic-fetch'
import { fetchReportData } from '../api'

export const INVALIDATE_DATA = 'INVALIDATE_DATA'
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const RECEIVE_ERROR = 'RECEIVE_ERROR'


// When fetch succeeds, receiveData action will be called with the response object (json in this case).
// REQUEST_DATA action will be processed by the reducer immediately.
// See: api-middleware.js
function requestData() {
  return {
    type: REQUEST_DATA,
    callAPI: {
      type: 'fetchReportData',
      successAction: receiveData,
      errorAction: receiveError
    }
  }
}

function receiveData(response) {
  return {
    type: RECEIVE_DATA,
    response: response,
    receivedAt: Date.now()
  }
}

function receiveError(response) {
  return {
    type: RECEIVE_ERROR,
    response: response,
    receivedAt: Date.now()
  }
}

function shouldFetchData(state) {
  const data = state.get('data')
  if (data.get('isFetching')) {
    return false
  }
  return data.get('didInvalidate') || !data.get('lastUpdated')
}

export function fetchDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      return dispatch(requestData())
    }
  }
}

export function invalidateData() {
  return {type: INVALIDATE_DATA}
}

