import { is_self_evaluating, is_variable, is_quoted } from '../src/expression_predicates'
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
  expect(is_quoted(`(quted)`))
})
