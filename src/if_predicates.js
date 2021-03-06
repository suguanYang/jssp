import { is_tagged_list, car, cdr, list } from './basic'
import eval_lisp from './interpreter.js'

export function is_if(exp) {
  return is_tagged_list(exp, 'if')
}

// (if <predicate>
//     <consequence>
//     <alternative>
// )
export function if_predicate(exp) {
  return car(cdr(exp))
}

export function if_consequence(exp) {
  return car(cdr(cdr(exp)))
}

export function if_alternative(exp) {
  const alternative_part = car(cdr(cdr(cdr(exp))))
  if (alternative_part) {
    return alternative_part
  }
  return false
}

export function make_if(predicate, consequence, alternative, env) {
  if (eval_lisp(predicate)){
    return eval_lisp(consequence, env)
  } else {
    return eval_lisp(alternative, env)
  }
}
