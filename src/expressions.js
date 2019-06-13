import { is_primitive_type, is_pair } from './type_predicates'
import { list_elements, is_tagged_list, list_to_array, car, cdr } from './basic'
import eval_lisp from './interpreter.js'

export function is_self_evaluating(exp) {
  try {
    if (is_primitive_type(exp)) {
      return true
    }
    return false
  } catch (e) {
    console.log(e)
    return false
  }
}

// a variable exist only when it is declared or defined,  we should find in
// a relative env
export function is_variable(name, env) {
  return env.is_bind(name)
}

export function is_quoted(exp) {
  return is_tagged_list(exp, 'quote')
}

export function text_of_quotation(exp) {
  return car(cdr(exp))
}

export function is_assignment(exp) {
  return is_tagged_list(exp, 'set!')
}

export function assigment_variable(exp) {
  return car(cdr(exp))
}

export function assignment_value(exp) {
  return car(cdr(cdr(exp)))
}

export function is_definition(exp) {
  return is_tagged_list(exp, 'define')
}

// definition has two forms
// 1. (define a 1)
// 2. (define (add x y) (+ x y))
export function definition_variable(exp) {
  if (is_pair(car(cdr(exp)))) {
    return car(car(cdr(exp)))
  }

  return car(cdr(exp))
}

// definition parameters return javascript array if has
export function definition_parameters(exp) {
  const declare_part = car(cdr(exp)) // (add x y)
  if (is_pair(declare_part)) {
    const params = cdr(declare_part) // (x y)
    return list_to_array(params)
  }

  return []
}

export function definition_value(exp, env) {
  const body = car(cdr(cdr(exp)))
  if (is_pair(body)) {
    // (define (add x y) (+ x y))
    return make_lambda(definition_parameters(exp), body, env)
  }

  // (define a 1)
  return body
}

export function is_lambda(exp) {
  return is_tagged_list(exp, 'lambda')
}

export function lambda_parameters(exp) {
  return car(cdr(exp))
}

export function lambda_body(exp) {
  return car(cdr(cdr(exp)))
}

export function make_lambda(formal_parameters, body, parent_env) {
  // create function environment
  const block_env = create_empty_env(parent_env)
  // get actual paramters
  const actual_params = arguments
  // define formal parameters
  formal_parameters.forEach((param, index) => block_env.bind(param, actual_params[index]))

  return eval_lisp(body, block_env)
}

export function is_begin(exp) {
  return is_tagged_list(exp, 'brgin')
}

export function begin_actions(exp) {
  return cdr(exp)
}

export function is_last_exp(seq) {
  return null === cdr(exp)
}

export function first_exp(seq) {
  return car(seq)
}

export function rest_exp(seq) {
  return cdr(seq)
}

export function make_begin(seq) {
  return list_elements(seq).reduce((_, s) => eval_lisp(s))
}

// A procedure application is any compound expression that is not one of the
// above expression types.
export function is_application(exp) {
  return is_pair(exp)
}

export function operation(exp) {
  return car(exp)
}

export function opreands(exp) {
  return cdr(exp)
}

export function is_no_operands(ops) {
  return null === ops
}

export function first_operand(ops) {
  return car(ops)
}

export function rest_operands(ops) {
  return cdr(ops)
}
