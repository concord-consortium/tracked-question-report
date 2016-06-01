import React, { Component } from 'react'
import _ from 'lodash'
import pureRender from 'pure-render-decorator'
import '../../css/legend.less'

@pureRender
class LegendKey extends Component {
  render() {
    const swatchStyle={
      backgroundColor: this.props.color
    }
    const name = this.props.name
    return (
      <div className="legend-item">
        <div className="color-swatch" style={swatchStyle}/>
        <div className="name">{name}</div>
      </div>
    )
  }
}
@pureRender
export default class Legend extends Component {
  render() {
    const colorSeries  = this.props.colorSeries
    return(
      <div className="pie-legend">
        {
          _.map(colorSeries.classes(), className => {
            return <LegendKey key={className} name={className} color={colorSeries.colorFor(className)}/>
          })
        }
      </div>
    )
  }
}
