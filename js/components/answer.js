import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import OpenResponseAnswer from './open-response-answer'
import MultipleChoiceAnswer from './multiple-choice-answer'
import ImageAnswer from './image-answer'
import NoAnswer from './no-answer'
import { Chart } from 'react-d3-core'
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
    const data = [
      {name: 'joe', value: 1},
      {name: 'fred', value: 2},
      {name: 'hank', value: 4},
      {name: 'thelma', value: 4}
    ]
    const series = data.map( (data) =>{
      return { field: data.name, name: data.name }
    })

    const value = (datum) => {
      return datum.value
    }

    const name = (datum) => {
      return datum.name
    }

   return(
    <div className="answers">
      Answer for page {pageId}
      { answers.map(data => {
        const answer = data.answer_hash
        const answerText = answer.answer_texts ? answer.answer_texts.join(", ") : answer.answer
        return (
          <div className="answer">
            {answerText}
          </div>
        )
        })
      }
      <PieChart
        width={200}
        height={200}
        data= {data}
        chartSeries= {series}
        value = {value}
        name = {name}
      />
    </div>
   )
  }
}
