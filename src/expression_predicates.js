import { isPrimitiveType } from './type_predicates'

export function is_self_evaluating(exp) {
  try {
    if (isPrimitiveType(exp)) {
      return true
    }
    return false
  } catch (e) {
    console.log(e)
    return false
  }
}
