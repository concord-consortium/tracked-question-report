import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import _ from 'lodash'
import Answers from './answers'

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
        <div className="name">
          {questionTracker.name}
        </div>
        <div className="answers">
          <Answers answers={answers} />
        </div>
      </div>
    )
  }

}
