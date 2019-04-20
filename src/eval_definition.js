function eval_definition(exp, env) {
  define_variable(definition_variable(exp), eval_lisp(definition_value, env), env)

  return "ok"
}
