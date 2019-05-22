import { is_if, if_predicate, if_consequence, if_alternative, make_if } from '../src/if_predicates'

test('if_predicates', () => {
  const if_statement = `(if (= a 1) a 1)`
  const if_statement_complcation = `(if (= b 1) (+ b 1) (- b 1))`

  expect(is_if(if_statement)).toBeTruthy()
  expect(is_if(if_statement_complcation)).toBeTruthy()
  const predicate = `(= a 1)`
  const predicate_com = `(= b 1)`
  expect(if_predicate(if_statement)).toEqual(predicate)
  expect(if_predicate(if_statement_complcation)).toEqual(predicate_com)
  const consequence = `a`
  const consequence_com = `(+ b 1)`
  expect(if_consequence(if_statement)).toEqual(consequence)
  expect(if_consequence(if_statement_complcation)).toEqual(consequence_com)
  const alternative = `1`
  const alternative_com = `(- b 1)`
  expect(if_alternative(if_statement)).toEqual(alternative)
  expect(if_alternative(if_statement_complcation)).toEqual(alternative_com)
})
