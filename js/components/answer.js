import React, { Component } from 'react'
import _ from 'lodash'
import pureRender from 'pure-render-decorator'
import OpenResponseAnswer from './open-response-answer'
import MultipleChoiceAnswer from './multiple-choice-answer'
import ImageAnswer from './image-answer'
import NoAnswer from './no-answer'
import { Legend, Chart } from 'react-d3-core'
import { PieChart } from 'react-d3-basic'
const AnswerComponent = {
  'Embeddable::OpenResponse': OpenResponseAnswer,
  'Embeddable::MultipleChoice': MultipleChoiceAnswer,
  'Embeddable::ImageQuestion': ImageAnswer,
  'NoAnswer': NoAnswer
}

@pureRender
export default class Answer extends Component {
  render() {
    const pageId  = this.props.pageId
    const answers = this.props.answers
    const answerTexts = answers.map(data => {
      const answer = data.answer_hash
      return (
        {
          value: answer.answer_texts ? answer.answer_texts.join(", ") : answer.answer,
          unused: 'unused'
        }
      )
    })
    const groups = _.groupBy(answerTexts,'value')
    const data = _.keys(groups).map(key => {
      return {
        name: key,
        value: groups[key].length
      }
    })
    const series = data.map(datum => {
      return { field: datum.name, name: datum.name }
    })

    const valueFunction = (datum) => {
      return datum.value
    }

    const nameFunction = (datum) => {
      return datum.name
    }

   return(
    <div className="answer">
      <div className="metadata">
        Answer for page {pageId}
      </div>
      <div className="legend">
        <Legend chartSeries={series} width={600} legendPosition="left"/>
      </div>
      <PieChart
        width={200}
        height={200}
        data= {data}
        chartSeries= {series}
        showLegend={false}
        value = {valueFunction}
        name = {nameFunction}
      />
    </div>
   )
  }
}
