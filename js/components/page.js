import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import Question from '../components/question'
import Sticky from 'react-stickynode';
import '../../css/page.less'

@pureRender
export default class Page extends Component {
  render() {
    const { page, reportFor } = this.props
    const pageName = page.get('name')
    return (
      <div className={`page ${page.get('visible') ? '' : 'hidden'}`}>
        <Sticky top={80}>
          <h4>Page: {pageName}</h4>
        </Sticky>
        <div>
          {page.get('children').map((question) => {
              return <Question key={question.get('key')} question={question} reportFor={reportFor} />
          })}
        </div>
      </div>
    )
  }
}
