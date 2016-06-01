import React, { Component } from 'react'
import _ from 'lodash'
import pureRender from 'pure-render-decorator'
import '../../css/student-answers.less'

@pureRender
class StudentRow extends Component {
  render() {
    const student = this.props.student
    const name = student.name
    const answer = student.answerText
    const color = student.color
    const colorKeyStyle = {
      backgroundColor: color,
      width: '1em',
      height: '1em'
    }

    return (
      <tr>
        <td>{name}</td>
        <td className="color-key" style={colorKeyStyle}></td>
      </tr>
    )
  }
}

@pureRender
export default class StudentAnswers extends Component {
  render() {
    const colorSeries  = this.props.colorSeries
    const students    = _.map(this.props.answers, answer => {
      return {
        name: answer.name,
        answerText: answer.answerText,
        color: colorSeries.colorFor(answer.answerText)
      }
    })
    return(
      <table className="student-answers">
        <tbody>
          { _.map(students, student => <StudentRow student={student} key={student.name}/>) }
        </tbody>
      </table>
    )
  }
}
