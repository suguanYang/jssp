export default function eval_lisp(exp, env) {
  if (is_self_evaluating(exp)) return exp

  if (is_variable(exp)) return look_up_variable_value(exp, env)

  if (is_quoted(exp)) return text_of_quotation(exp)

  if (is_assignment(exp)) return eval_assignment(exp, env)

  if (is_definition(exp)) return eval_definition(exp, env)

  if (is_if(exp)) return eval_if(exp, env)

  if (is_lambda(exp)) return make_procedure(lambda_paramters(exp), lambda_body(exp), env)

  if (is_begin(exp)) return eval_sequence(begin_actions(exp), env)

  if (is_cond(exp)) return eval_lisp(cond_to_if(exp), env)

  if (is_application(exp)) return apply_lisp(eval_lisp(operator(exp), env), list_of_values(operands(exp), env))

  return Error("Unknown expression type --EVAL_LISP" + exp)
}


