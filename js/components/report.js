import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'

import '../../css/report.less'


@pureRender
export default class Report extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div>
        Report (nothing here yet)
        <br/>
        Will be loading data from {this.props.report.offeringUrl}
        <br/>
        using token: {this.props.report.token}
      </div>
    )
  }
}
