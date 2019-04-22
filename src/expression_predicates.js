import { is_primitive_type, is_key_char } from './type_predicates'

function car(exp) {
  return is_pair(exp) ? exp
    .replace(/\(|\)/g, '')
    .split(' ')[0] : null
}

function cdr(exp) {
  return is_pair(exp) ? exp
    .replace(/\(|\)/g, '')
    // no mutable operate
    .split(' ').filter((_, index) => index !== 0) : null
}

export function is_tagged_list(exp, tag) {
  if(is_pair(exp)) {
    return car(exp) === tag
  }
  return false
}

export function is_pair(exp) {
  const length = exp.length
  if (exp[0] === '(' && exp[length] === ')') {
    return true
  }
  return false
}

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

