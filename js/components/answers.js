import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import Answer from './answer'

import '../../css/answers.less'

@pureRender
export default class Answers extends Component {

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

