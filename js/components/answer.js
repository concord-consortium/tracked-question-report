import React, { Component } from 'react'
import _ from 'lodash'
import pureRender from 'pure-render-decorator'
import OpenResponseAnswer from './open-response-answer'
import MultipleChoiceAnswer from './multiple-choice-answer'
import ImageAnswer from './image-answer'
import NoAnswer from './no-answer'
import Chart from 'react-chartjs'

const Pie = Chart.Pie



@pureRender
export default class Answer extends Component {
  colors(number) {
    const saturation = '30%'
    const lightness = '50%'
    const values = _.map(_.range(number), (index) => {
      let hue = (360/number) * (index + 1)
      hue = _.round(hue,2)

      return( `hsl(${hue},${saturation},${lightness}`)
    })
    return values
  }

  render() {
    const activity  = this.props.activity
    const answers = this.props.answers
    const series  = this.props.series
    const answerTexts = answers.map(data => {
      const answer = data.answer_hash
      return (
        {
          value: (answer.answer_texts && answer.answer_texts.length > 0) ? answer.answer_texts.join(", ") : (answer.answer || "not answered"),
          unused: 'unused'
        }
      )
    })
    const groups = _.groupBy(answerTexts,'value')
    const colors = this.colors(_.keys(series).length)
    const data = series.map((category, index) => {
      const name = category.field
      return {
        label: `${name} - ${index}`,
        value: (groups[name] || []).length ,
        color: colors[index]
      }
    })
    //debugger
    //const students = _.map(answers, (answer) =>{
    //  return {
    //    name: answer.name
    //  }
    //})
   return(

    <div className="answer">
      <Pie
        data= {data}
        width="180"
        segmentStrokeWidth={1}
      />
      <div className="metadata">
        {activity}
      </div>
    </div>
   )
  }
}
