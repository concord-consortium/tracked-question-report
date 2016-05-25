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
      <div className="report-content">
        <h1>Tracked Questions Report</h1>
        {trackedQuestions.map((q,i) => <TrackedQuestion question={q} key={i} />)}
      </div>
    )
  }
}
