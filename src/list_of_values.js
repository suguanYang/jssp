function list_of_values(exps, env) {
  if (is_no_operands(exps)) {
    return []
  }

  // the order of evaluatint the element in of array is uncertain(depends on base interperter),
  // but we can use order expressign evalutes the element to which we want first evalute
  // left-to-right:
  // const first = eval_lisp(first_operand)
  // return [
  // first,
  // list_of_values(rest_operands(exps), env)
  // ]
  // right-to-left vice versa
  return [
    eval_lisp(first_operand(exps), env),
    list_of_values(rest_operands(exps), env)
  ]
}
