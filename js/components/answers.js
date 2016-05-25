import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import Answer from './answer'

import '../../css/answers.less'

@pureRender
export default class Answers extends Component {

  render() {
    const answers = _.groupBy(this.props.answers, 'page_id')
    const keys    = _.keys(answers)
    return (
      <div className="answers">
        { keys.map(pageId => <Answer pageId={pageId} answers={answers[pageId]} />) }
      </div>
    )
  }
}

