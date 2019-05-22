import { is_pair } from './type_predicates'
import { create_empty_env } from './env.js'
import eval_lisp from './interpreter.js'

const OPEN_SYSMBOL = '('
const CLOSE_SYSMBOL = ')'

// TODO add cache
const balanced_judgement_cacher = {}

export function is_balanced_paren(exp) {
  const parse_iter = (sub_exp, opend_times) => {
    const first_char = sub_exp[0]
    if (sub_exp === '') {
      return opend_times === 0
    }
    if (first_char === OPEN_SYSMBOL) return parse_iter(sub_exp.slice(1), opend_times + 1)
    if (first_char === CLOSE_SYSMBOL) return parse_iter(sub_exp.slice(1), opend_times - 1)

    return parse_iter(sub_exp.slice(1), opend_times)
  }
  return parse_iter(exp, 0)
}

export function list_elements(exp) {
  const withoutWrapperBrackets = exp.slice(1).slice(0, -1)
  const parser = (items, accumulator, total) => {
    const [first, ...rest] = [...items]
    if (first === undefined) return total
    if (is_balanced_paren(accumulator + first)) {
      return parser(rest, '', total.concat([accumulator + first]))
    }

    // split by ' ', so the elements need recovery a space
    return parser(rest, accumulator + first + ' ', total)
  }
  return parser(withoutWrapperBrackets.split(' '), '', [])
}

export function list_to_array(list) {
  return list_elements(list).map(item => is_pair(item)
      ? list_elements(item)
      : item)
}

export function array_to_list(array) {
  return array.reduce((pre, cur, index) => pre
      // insert with space
      + (index > 0 ? ' ' : '')
      + (Array.isArray(cur) ? array_to_list(cur) : cur),
    '(') + ')'
}

export function cons(part_car, part_cdr) {
  return '(' + part_car + ' ' + part_cdr + ')'
}

// a list should be a sequence of cons
// but here we do lexcial analysis
// so we make a lexcial expression
// of list (a b c d e)
// not (a (b (c (d))))
export function list(...elements) {
  const list_iter = (remain, combination) => {
    if (remain.length === 0) return combination
    const [car_part, ...cdr_part] = remain
    return list_iter(car_part, combination + ' ' + car_part)
  }

  const [car_part, ...cdr_part] = remain
  return cons(car_part, list_iter(cdr_part, ''))
}

export function car(exp) {
  if (!is_pair(exp)) return null

  // car should return a scheme data
  return Array.isArray(list_to_array(exp)[0])
    ? array_to_list(list_to_array(exp)[0])
    : list_to_array(exp)[0]
}

// list in javascript are flat,
// the rest of list are items but first one of array
// but the real list we should implememted is like this
// [
//  a,
//  [
//   b,
//   [
//    c,
//    [null]
//   ]
//  ]
// ]
export function cdr(exp) {
  return is_pair(exp) ?
    // a cdr should return a list if has
    array_to_list(list_to_array(exp).slice(1))
    : null
}

export function is_tagged_list(exp, tag) {
  if(is_pair(exp)) {
    return car(exp) === tag
  }
  return false
}

export function make_lambda(formal_parameters, body, parent_env) {
  return () => {
    // create function environment
    const block_env = create_empty_env(parent_env)
    // get actual paramters
    const actual_params = arguments
    // define formal parameters
    formal_parameters.forEach((param, index) => block_env.bind(param, actual_params[index]))

    return eval_lisp(body, block_env)
  }
}
