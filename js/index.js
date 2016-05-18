import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/app'


render(
    <App/>,
  document.getElementById('app')
)
