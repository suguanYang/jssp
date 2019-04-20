import { is_self_evaluating } from '../src/expression_predicates'

// console.assert(is_self_evaluating('10'), 'is_self_evaluating("10") expected true, but got false')
// console.assert(is_self_evaluating("'afb"), `is_self_evaluating("'afb"): expected true, nut got false`)
// console.assert(!is_self_evaluating("sdasd"), `is_self_evaluating("asdasd"): expected false, but got true`)

test('is self evaluating', () => {
  expect(is_self_evaluating('10')).toBeTruthy()
  expect(is_self_evaluating('"asd')).toBeTruthy()
  expect(is_self_evaluating('asd')).toBeFalsy()
})
