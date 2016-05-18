import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'

import Button from '../components/button'
import Report from '../components/report'
import LoadingIcon from '../components/loading-icon'
import ccLogoSrc from '../../img/cc-logo.png'
import urlParams from '../core/utils'
import fetch from 'isomorphic-fetch'

// (...)Data functions accept some state and return data in a form suitable for 'dumb' components.

import '../../css/app.less'

@pureRender
export default class App extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.state = {
      isFetching: false,
      lastUpdated: Date.now(),
      isFetching: false,
      error: false,
      offeringUrl: urlParams()['offering'],
      report: {
        offeringUrl: urlParams()['offering'],
        token: urlParams()['token'],
        runs: [],
        offerings: []
      }
    }
  }

  fetchData() {
    const url = this.state.offeringUrl
    this.setState({isFetching: true})
    console.log(`loading data from ${url}`)
  }

  componentDidMount() {
    this.fetchData()
  }
  
  handleRefreshClick(e) {
    e.preventDefault()
    this.fetchData()
  }

  renderStatusBar() {
    const { isFetching, lastUpdated } = this.props
    return (
      <div className='status'>
        {lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()} </span>}
        {<Button onClick={this.handleRefreshClick} disabled={isFetching}>Refresh</Button>}
      </div>
    )
  }

  renderReport() {
    const { report } = this.state
    return <Report report={report} />
  }

  render() {
    const { report, error, isFetching } = this.state
    return (
      <div className='report-app'>
        <div className='header'>
          <div className='header-content'>
            <img src={ccLogoSrc} className='logo'/>
            {this.renderStatusBar()}
          </div>
        </div>
        <div className='report' style={{ opacity: isFetching ? 0.3 : 1 }}>
          {report && this.renderReport()}
          {error && <DataFetchError error={error}/>}
        </div>
        {isFetching && <LoadingIcon/>}
      </div>
    )
  }
}



const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDataIfNeeded: () => dispatch(fetchDataIfNeeded()),
    invalidateData: () => dispatch(invalidateData())
  }
}

