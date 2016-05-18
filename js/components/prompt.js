import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'

@pureRender
export default class Prompt extends Component {

  renderPrompt() {
    const prompt = this.props.question.get('prompt')
    if (prompt) {
      return <div className='text-prompt' dangerouslySetInnerHTML={{__html: prompt}}/>
    }
    return ""
  }

  renderDrawingPrompt() {
    const drawingPrompt = this.props.question.get('drawingPrompt')
    if (drawingPrompt) {
      return <div className='drawing-prompt' dangerouslySetInnerHTML={{__html: drawingPrompt}}/>
    }
    return ""
  }

  render() {
    return(
      <div className="prompt">
        {this.renderDrawingPrompt()}
        {this.renderPrompt()}
      </div>
    )
  }
}
