import { is_primitive_type, is_key_char } from './type_predicates'
import { is_tagged_list, car, cdr } from './basic'


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


