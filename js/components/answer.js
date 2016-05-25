import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import OpenResponseAnswer from './open-response-answer'
import MultipleChoiceAnswer from './multiple-choice-answer'
import ImageAnswer from './image-answer'
import NoAnswer from './no-answer'

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
   return(
    <div className="answers">
      Answer for page {pageId}
      {answers.map(data => {
        const answer = data.answer_hash
        const answerText = answer.answer_texts ? answer.answer_texts.join(", ") : answer.answer
        return (
          <div className="answer">
            {answerText}
          </div>
        )
      } )}
    </div>
   )
  }
}
