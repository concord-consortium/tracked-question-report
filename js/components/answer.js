import React, { Component } from 'react'
import _ from 'lodash'
import pureRender from 'pure-render-decorator'
import Chart from 'react-chartjs'

const Pie = Chart.Pie


@pureRender
export default class Answer extends Component {
  render() {
    const activity  = this.props.activity
    const answers = this.props.answers
    const colorSeries  = this.props.colorSeries
    const groups = _.groupBy(answers,'answerText')
    const data = _.map(colorSeries.classes(), name => {
      return {
        label: name,
        value: (groups[name] || []).length ,
        color: colorSeries.colorFor(name)
      }
    })
    const chartOptions = {
      animation: false,
      segmentStrokeWidth: 1,
      tooltipFontSize: 9
    }

    return(
      <div className="answer">
        <Pie
          data= {data}
          options={chartOptions}
        />
        <div className="metadata">
          {activity}
        </div>
      </div>
    )
  }
}
