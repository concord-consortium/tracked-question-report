// Simplistic color scheme for data series.
export default class ColorSeries {

  constructor(classNames, predefined={}) {
    const colors = this.genColors(classNames.length)
    this.colorMap = {}
    _.each(classNames, (name,index) => {
      this.colorMap[name] = colors[index]
    })
    _.merge(this.colorMap, predefined)
  }


  colorFor(name) {
    return this.colorMap[name]
  }

  classes() {
    return _.keys(this.colorMap)
  }

  genColors(number) {
    const saturation = '30%'
    const values = _.map(_.range(number), (index) => {
      let hue = (360 / number) * (index + 1)
      let lightness = (50 / number) * (index + 1)
      hue = _.round(hue, 2)
      lightness = _.round(10 + lightness, 2)
      return ( `hsl(${hue},${saturation},${lightness}%)`)
    })
    return values
  }

}