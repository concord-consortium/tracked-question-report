import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import _ from 'lodash'
import Answers from './answers'
import '../../css/tracked-question.less'

@pureRender
export default class TrackedQuestion extends Component {
  constructor(props) {
    super(props)
  }

  mergeStudents(activityName, answers) {
    const answerByEndpoint = _.groupBy(answers, 'endpoint')

    const offering = _.find(this.props.offerings, (offering) => offering.activity == activityName)
    const studentAnswers = _.map(offering.students, (student) => {
      const studentAnswers = answerByEndpoint[student.endpoint_url]
      if(studentAnswers && studentAnswers.length > 0) {
        return _.merge(student, studentAnswers[0])
      }
      else {
        return _.merge(student, {"answer_hash": {"answer": 'not answered' }})
      }
    })
    return studentAnswers
  }

  stitchData(question) {
    const answersByActivity = _.groupBy(question.answers, 'activity_name')
    const activities = _.keys(answersByActivity)
    _.each(activities, (activityName) => {
      const answers = answersByActivity[activityName]
      answersByActivity[activityName] = this.mergeStudents(activityName, answers)
    })
    question.answers = answersByActivity
  }

  render() {
    const question = this.props.question
    this.stitchData(question)
    const questionTracker = question.question_tracker
    const answers         = question.answers

    return(
      <div className="tracked-question">
        <div className="meta">
          <h4>{questionTracker.name}</h4>
          <div className="prompt" dangerouslySetInnerHTML={{__html: questionTracker.prompt}} />
        </div>
        <div className="answers">
          <Answers answers={answers} />
        </div>
      </div>
    )
  }

}
