import React, { Component } from 'react'
import _ from 'lodash'
import pureRender from 'pure-render-decorator'
import OpenResponseAnswer from './open-response-answer'
import MultipleChoiceAnswer from './multiple-choice-answer'
import ImageAnswer from './image-answer'
import NoAnswer from './no-answer'
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
    const series  = this.props.series
    const answerTexts = answers.map(data => {
      const answer = data.answer_hash
      return (
        {
          value: answer.answer_texts ? answer.answer_texts.join(", ") : (answer.answer || "not answered"),
          unused: 'unused'
        }
      )
    })
    const groups = _.groupBy(answerTexts,'value')
    const data = series.map(category => {
      const name = category.field
      return {
        name: name,
        value: (groups[name] || []).length
      }
    })

    const valueFunction = (datum) => {
      return datum.value
    }

    const nameFunction = (datum) => {
      return datum.name
    }



   return(
    <div className="answer">
      <PieChart
        width={200}
        height={200}
        data= {data}
        chartSeries= {series}
        showLegend={false}
        value = {valueFunction}
        name = {nameFunction}
        pieTextShow={false}
        innerRadius={10}
      />
      <div className="metadata">
        {pageId}
      </div>
    </div>
   )
  }
}
