function eval_assignment(exp, env) {
  set_variable_value(assignment_variable(exp), eval_lisp(assignment_value, env), env)
  return "ok"
}
