import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import _ from 'lodash'
import '../../css/report.less'
import TrackedQuestion from './tracked-question'

@pureRender
export default class Report extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const reportData = this.props.report
    const trackedQuestions = reportData.trackedQuestions || []
    return (
      <div className="tracked-questions">
        Report:
        {trackedQuestions.map(q => <TrackedQuestion question={q} />)}
      </div>
    )
  }
}
