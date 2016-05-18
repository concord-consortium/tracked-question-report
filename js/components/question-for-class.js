import React, { Component } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import pureRender from 'pure-render-decorator'
import MultipleChoiceDetails from './multiple-choice-details'
import ImageQuestionDetails from './image-question-details'
import QuestionSummary from './question-summary'
import AnswersTable from './answers-table'
import SelectionCheckbox from '../containers/selection-checkbox'

import '../../css/question.less'

const QuestionComponent = {
  'Embeddable::MultipleChoice': MultipleChoiceDetails,
  'Embeddable::ImageQuestion': ImageQuestionDetails
}

@pureRender
export default class QuestionForClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answersVisible: false,
      isSticky: false
    }
    this.toggleAnswersVisibility = this.toggleAnswersVisibility.bind(this)
    this.handleStickyStateChange = this.handleStickyStateChange.bind(this)
  }

  toggleAnswersVisibility() {
    this.setState({answersVisible: !this.state.answersVisible})
  }

  handleStickyStateChange(isSticky) {
    this.setState({isSticky: isSticky})
  }

  renderQuestionHeader() {
    const { question } = this.props
    return <span>Question #{question.get('questionNumber')}</span>
  }



  render() {
    const { question } = this.props
    const { answersVisible } = this.state
    return (
      <div>
        <div className={`question ${question.get('visible') ? '' : 'hidden'}`}>
          <div className="question-header">
            <SelectionCheckbox selected={question.get('selected')} questionKey={question.get('key')}/>
            { this.renderQuestionHeader() }
            <a className='answers-toggle' onClick={this.toggleAnswersVisibility}>
              {answersVisible ? 'Hide responses' : 'Show responses'}
            </a>
          </div>
          <QuestionSummary question={question}/>
          <QuestionDetails question={question}/>
          {answersVisible ? <AnswersTable answers={question.get('answers')}/> : ''}
        </div>
      </div>
    )
  }
}

const QuestionDetails = ({question}) => {
  const QComponent = QuestionComponent[question.get('type')]
  if (!QComponent) {
    return <span></span>
  }
  return <QComponent question={question}/>
}
