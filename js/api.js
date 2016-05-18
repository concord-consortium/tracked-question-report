import fetch from 'isomorphic-fetch'
import fakeData from 'json!./data/report.json'
import urlParams from './core/utils'

// Report URL and auth tokens are provided as an URL parameters.
const REPORT_URL = urlParams['reportUrl']
const AUTH_HEADER = `Bearer ${urlParams['token']}`

export function fetchReportData() {
  if (REPORT_URL) {
    return fetch(REPORT_URL, {headers: {'Authorization': AUTH_HEADER}})
      .then(checkStatus)
      .then(response => response.json())
  } else {
    // Use fake data if REPORT_URL is not available.
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        alert("he haw")
        debugger
        resolve({thing:1}) },
      500))

  }
}

export function updateReportSettings(data) {
  return fetch(REPORT_URL, {
    method: 'put',
    headers: {
      'Authorization': AUTH_HEADER,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
}

export class APIError {
  constructor(statusText, response) {
    this.message = statusText
    this.response = response
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new APIError(response.statusText, response)
  }
}
