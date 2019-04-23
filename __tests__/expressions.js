import {
  is_self_evaluating,
  is_variable,
  is_quoted,
  text_of_quotation,
  is_assignment,
  assignment_value,
  assigment_variable
} from '../src/expressions'
import { create_empty_env } from '../src/env.js'

// console.assert(is_self_evaluating('10'), 'is_self_evaluating("10") expected true, but got false')
// console.assert(is_self_evaluating("'afb"), `is_self_evaluating("'afb"): expected true, nut got false`)
// console.assert(!is_self_evaluating("sdasd"), `is_self_evaluating("asdasd"): expected false, but got true`)

test('is self evaluating', () => {
  expect(is_self_evaluating('10')).toBeTruthy()
  expect(is_self_evaluating('"asd')).toBeTruthy()
  expect(is_self_evaluating('asd')).toBeFalsy()
  expect(is_self_evaluating('(+ 1 2)')).toBeFalsy()
  expect(is_self_evaluating('(define a 1))')).toBeFalsy()
})


test('is variable', () => {
  const global_env = create_empty_env()
  expect(is_variable(`a`, global_env)).toBeFalsy()
})

test('is quoted', () => {
  const quoted = `(quote asd)`
  expect(is_quoted(quoted)).toBeTruthy()
  expect(text_of_quotation(quoted)).toBe('asd')
})


test('is assignment', () => {
  const assignmented = `(set! name 'donnie)`

  expect(is_assignment(assignmented)).toBeTruthy()
  expect(assigment_variable(assignmented)).toBe('name')
  expect(assignment_value(assignmented)).toBe(`'donnie`)
})
