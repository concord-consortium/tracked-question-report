import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import _ from 'lodash'

import '../../css/report.less'

@pureRender
export default class Report extends Component {
  constructor(props) {
    super(props)
  }


  renderAnswer(page_id, answers) {
    return(
      <div className="answers">
        Answer for page {page_id}
        {answers.map(answer => {
          debugger
          return (
            <div
              className="answer"> {answer.answer_hash.text_answers.join(" ")}
            </div>
          )
        } )}
      </div>
    )
  }

  renderAnswers(question) {
    const answers = _.groupBy(question.answers, 'page_id')
    const keys = _.keys(answers)
    return keys.map(page_id => this.renderAnswer(page_id, answers[page_id]))
  }

  renderQuestionData(question) {
    return(
      <div className="question">
        <div className="name">
          {question.question_tracker.name}
        </div>
        <div className="answers">
          {this.renderAnswers(question) }
        </div>
      </div>
    )
  }

  render() {
    const reportData = this.props.report
    const trackedQuestions = reportData.trackedQuestions || []
    return (
      <div className="tracked-questions">
        Thing:
        {trackedQuestions.map(q => this.renderQuestionData(q))}
      </div>
    )
  }
}
