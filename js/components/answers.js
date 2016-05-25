import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import { Legend } from 'react-d3-core'
import Answer from './answer'
import '../../css/answers.less'

@pureRender
export default class Answers extends Component {


  getAnswerText(ans) {
    const answer = ans.answer_hash
    return (answer.answer_texts ? answer.answer_texts.join(", ") : answer.answer || 'not answered')
  }

  render() {
    const pageAnswers     = _.groupBy(this.props.answers, (answer) => {
      return `${answer.activity_name}`
    })
    const possibleAnswers = _.uniq(this.props.answers.map(answer => this.getAnswerText(answer)))

    const series = possibleAnswers.map(answer => {
      return { field: answer, name: answer}
    })

    return (
      <div className="answers">
        <div className="legend">
          <Legend chartSeries={series} width={600} legendHeight={18} legendPosition="left"/>
        </div>
        <div className="pie-charts">
          { _.keys(pageAnswers).map(pageId =>
            <Answer series={series} key={pageId} pageId={pageId} answers={pageAnswers[pageId]} />)
          }
        </div>
      </div>
    )
  }
}

