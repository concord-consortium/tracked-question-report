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


  render() {
    const question = this.props.question
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
