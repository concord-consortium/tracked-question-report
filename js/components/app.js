import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'

import Button from '../components/button'
import Report from '../components/report'
import LoadingIcon from '../components/loading-icon'
import ccLogoSrc from '../../img/cc-logo.png'
import { OFFERING_URL, AUTH_HEADER, fetchOfferingData } from '../api'
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
      offeringUrl: OFFERING_URL,
      report: {
        offeringUrl: OFFERING_URL,
        token: AUTH_HEADER,
        runs: [],
        offerings: []
      }
    }
  }

  fetchData() {
    this.setState({isFetching: true})
    fetchOfferingData().then(response => this.dataLoaded(response))
  }

  dataLoaded(response) {
    console.log(JSON.stringify(response))
    console.log(response)
    this.setState({report: response, isFetching: false, lastUpdated: Date.now() })
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

