import fetch from 'isomorphic-fetch'
import fakeData from 'json!./data/report.json'
import Immutable from 'immutable'
import _ from 'lodash'

const urlParams = (() => {
  const query = window.location.search.substring(1)
  const rawVars = query.split("&")
  let params = {}
  rawVars.forEach((v) => {
    let arr = v.split("=")
    let pair = arr.splice(0, 1);
    pair.push(arr.join("="));
    params[pair[0]] = decodeURIComponent(pair[1])
  })
  return params
})()

// Report URL and auth tokens are provided as an URL parameters.
export const OFFERING_URL = urlParams['offering']
export const AUTH_HEADER = `Bearer ${urlParams['token']}`

export function parseUrl(urlString) {
  const parser = document.createElement('a')
  parser.href = urlString
  return {
    protocol: parser.protocol,
    host: parser.host,
    pathname: parser.pathname
  }
}

export function fetchOfferingData() {
  if (false) {
    return fetchJSON(OFFERING_URL, {headers: {'Authorization': AUTH_HEADER}})
      .then(response => Immutable.fromJS({offerings: response}))
      .then(state    => loadStudentData(state))
      .then(state    => lookupQuestionTrackerUrl(state))
      .then(state    => fetchTrackedQuestions(state))
      .then(state    => state.toJS())
      .catch(err => console.log("rejected:", err))
  } else {
    // Use fake data if REPORT_URL is not available.
    return new Promise(resolve => setTimeout(() => resolve(fakeData), 500))
  }
}


// FROM "http://localhost:3000/sequences/128" or "http://localhost:3000/activities/668"
// TO: "http://localhost:3000/api/v1/question_trackers/find_by_sequence/668"
function trackerSearchUrl(activityUrl) {
  let returnString
  const apiPath = '/api/v1/question_trackers'
  const searchActivity = `${apiPath}/find_by_activity/`
  const searchSequence = `${apiPath}/find_by_sequence/`
  returnString = activityUrl.replace('/activities/', searchActivity)
  returnString = returnString.replace('/sequences/', searchSequence)
  return returnString
}

function lookupQuestionTrackerUrl(state) {
  const offerings  = state.get('offerings')
  const searchUrls = offerings.map(offering => trackerSearchUrl(offering.get('activity_url')))
  return state.set('trackedQuestionSearchUrls', _.union(searchUrls.toJS()))
}

function fetchReportForTrackedQuestion(trackedQuestion) {
  return fetchJSON(trackedQuestion.report_url)
}

function fetchTrackedQuestions(state) {
  const trackedQuestionSearchUrls = state.get('trackedQuestionSearchUrls')
  const searches = trackedQuestionSearchUrls.map(searchUrl => fetchJSON(searchUrl))
  const trackedQuestions = Promise.all(searches)
    .then(results => _.flatten(results))
    .then(results => Promise.all(results.map(tq => fetchReportForTrackedQuestion(tq))))
    .then(results => state.set('trackedQuestions', results))
  return trackedQuestions
}

function createStudentRecord(offering, student) {
  const stud = student.toJS()
  const off  = offering.toJS()
  return {
    endpoint_url: stud.endpoint_url,
    name: stud.name,
    username: stud.username,
    started_activity: stud.started_activity,
    activity: off.activity,
    activity_url: off.activity_url,
    clazz: off.clazz,
    clazz_id: off.clazz_id,
    teacher: off.clazz_id
  }
}

function loadStudentData(state) {
  const students = {}
  const offerings = state.get('offerings')
  offerings.forEach(offering => {
    const offStudents = offering.get('students')
    offStudents.forEach(student => students[student.get('endpoint_url')] = createStudentRecord(offering, student))
  })
  return state.set('students', students)
}

class APIError {
  constructor(statusText, response) {
    this.message = statusText
    this.response = response
  }
}

function fetchJSON(url, opts) {
  return fetch(url, opts)
    .then(checkStatus)
    .then(response => response.json())
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new APIError(response.statusText, response)
  }
}
