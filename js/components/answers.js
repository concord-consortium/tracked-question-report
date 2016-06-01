import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import ColorSeries from '../core/color_series'
import Answer from './answer'
import Legend from './legend'
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
    const notAnsweredColor = "hsl(0,0%,80%)"
    const colorSeries = new ColorSeries(possibleAnswers, {'not answered': notAnsweredColor })

    return (
      <div className="answers">
        <Legend colorSeries={colorSeries}/>
        <div className="pie-charts">
          { activities.map(activity =>
            <Answer colorSeries={colorSeries} key={activity} activity={activity} answers={answers[activity]} />)
          }
        </div>
      </div>
    )
  }
}

