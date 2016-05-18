import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import { Set } from 'immutable'
import Answer from './answer'
import { CompareAnswerRmLinkContainer } from '../containers/compare-answer'

import '../../css/compare-view.less'

export default class CompareView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      highlighted: Set()
    }
  }

  answerClassName(answer) {
    const { highlighted } = this.state
    const key = answer.get('key')
    return `answer-wrapper ${highlighted.has(key) ? 'highlighted' : ''}`
  }

  toggleHighlight(answer) {
    const { highlighted } = this.state
    const key = answer.get('key')
    const isHighlighted = highlighted.has(key)
    const newHighlightedSet = isHighlighted ? highlighted.delete(key) : highlighted.add(key)
    this.setState({highlighted: newHighlightedSet})
  }

  render() {
    const { answers } = this.props
    return (
      <div className='compare-view'>
        <div className='answers-container'>
          {answers.map(a =>
            <div className={this.answerClassName(a)} key={a.get('key')}>
              <div>
                <strong>{a.getIn(['student', 'name'])}</strong>
                <div className='controls'>
                  <CompareAnswerRmLinkContainer answer={a}>Remove</CompareAnswerRmLinkContainer>
                  {' | '}
                  <a onClick={() => this.toggleHighlight(a)}>Highlight</a>
                </div>
              </div>
              <div className='answer'>
                <Answer answer={a} alwaysOpen={true}/>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
