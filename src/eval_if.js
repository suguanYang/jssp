function eval_if(exp, env) {
  if (is_true(eval_lisp(if_predicate(exp), env))) return eval_lisp(if_consequence(exp), env)

  return eval_lisp(if_alternative(exp), env)
}
