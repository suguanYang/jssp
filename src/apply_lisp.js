function eval_sequence(exps, env) {
  if (is_last_exp(exps)) eval_lisp((first_exp(exps), env))

  eval_lisp(first_exp(exps), env)

  return eval_sequence(rest_exps(exps), env)
}

function apply_lisp(procedure, args) {
  if (is_primitive_procedure(procedure)) return apply_primitive_procedure(procedure, args)

  if (is_compound_procedure(procedure)) {
    return eval_sequence(
      procedure_body(procedure_body),
      extend_environment(
        procedure_parameters(procedure),
        args,
        procedure_environment(procedure)
      )
    )
  }

  return Error("Unkown procedure type -- APPLY_LISP" + procedure)
}
