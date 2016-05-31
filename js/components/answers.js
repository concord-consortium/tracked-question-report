import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import { Legend } from 'react-d3-core'
import Answer from './answer'
import '../../css/answers.less'

@pureRender
export default class Answers extends Component {


  getAnswerText(ans) {
    const answer = ans.answer_hash
    return ((answer.answer_texts && answer.answer_texts.length > 0) ? answer.answer_texts.join(", ") : answer.answer || 'not answered')
  }

  render() {
    const answers = this.props.answers
    const activities = _.keys(answers)
    const allAnswers = _.flatMap(activities, act => answers[act])
    const possibleAnswers = _.uniq(allAnswers.map(answer => this.getAnswerText(answer)))
    const series = possibleAnswers.map(answer => { return { field: answer, name: answer} })

    return (
      <div className="answers">
        <div className="pie-charts">
          { activities.map(activity =>
            <Answer series={series} key={activity} activity={activity} answers={answers[activity]} />)
          }
        </div>
      </div>
    )
  }
}

