import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'

import '../../css/iframe-answer.less'

@pureRender
export default class IframeAnswer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      iframeVisible: false
    }
    this.toggleIframe = this.toggleIframe.bind(this)
  }

  toggleIframe(event) {
    const { answer } = this.props
    if (answer.get('displayInIframe')) {
      // If displayInIframe == true, we won't follow the link.
      event.preventDefault()
      this.setState({iframeVisible: !this.state.iframeVisible})
    }
  }

  renderLink() {
    const { answer } = this.props
    return <a href={answer.get('answer')} onClick={this.toggleIframe} target='_blank'>View work</a>
  }

  renderIframe() {
    const { answer, alwaysOpen } = this.props
    return (
        <div>
          {!alwaysOpen ? <div><a href='#' onClick={this.toggleIframe}>Hide</a></div> : ''}
          <iframe src={answer.get('answer')}
                  width={answer.get('width') || '300px'}
                  height={answer.get('height') || '300px'}
                  style={{border: 'none', marginTop: '0.5em'}}>
          </iframe>
        </div>
      )
  }

  render() {
    const { alwaysOpen } = this.props
    const { iframeVisible } = this.state
    return (
      <div className='iframe-answer'>
        {iframeVisible || alwaysOpen ? this.renderIframe() : this.renderLink()}
      </div>
    )
  }
}
