import { is_balanced_paren, list_to_array, array_to_list, list_elements } from '../src/basic'

test('is_balanced_paren', () => {
  const list = `(+ 1 2)`
  expect(is_balanced_paren(list)).toBeTruthy()
})

test('list_elements', () => {
  const list = `(define a 1)`
  const expected = ['define', 'a', '1']
  expect(list_elements(list)).toEqual(expected)

  const nested_list = `(define (add x y) (+ x y))`
  const expected_nested = ['define', '(add x y)', '(+ x y)']
  expect(list_elements(nested_list)).toEqual(expected_nested)
})

test('list_to_array', () => {
  const list = `(a b c)`
  const expected = ['a' , 'b', 'c']
  expect(list_to_array(list)).toEqual(expected)


  const define = `(define (add x y) (+ x y))`
  const expected_define = ['define', ['add', 'x', 'y'], ['+', 'x', 'y']]
  expect(list_to_array(define)).toEqual(expected_define)
})

