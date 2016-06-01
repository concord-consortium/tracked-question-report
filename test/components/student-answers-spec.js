import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import {expect} from 'chai';
import {List, Map} from 'immutable'

import StudentAnswers from '../../js/components/student-answers';

describe('StudentAnswers', () => {
  // a simple fake color series which always returns blue
  const colorSeries = {colorFor: (a) => 'blue'}
  const answers   = [
    {name: 'noah', answerText: 'this is my answer'}
  ]

  it('should have the specified student name', () => {
    const component = renderIntoDocument( <StudentAnswers answers={answers} colorSeries={colorSeries}/> )
    const studentAnswerComp = findRenderedDOMComponentWithClass(component, 'student-answers')
    expect(studentAnswerComp.textContent).to.include(answers[0].name)
  })

})