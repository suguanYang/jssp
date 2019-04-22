const key_chars = [
  '.',
  '#',
  '"',
  "'",
  '/',
  '(',
  ')'
]

export function is_digit(char) {
  // the experssions are string, and the char codes of string are continously in
  // javascript
  if (char <= '9' && char >= '0') {
    return true
  }
  return false
}

export function is_alpha_char(char) {
  if (char <= 'z' && char >= 'A') {
    return true
  }
  return false
}

export function is_key_char(char) {
  return key_chars.includes(char)
}

export function is_numeric(exp) {
  const length = exp.length
  for (let i = 0; i < length; i++) {
    if (!is_digit(exp[i])) {
      return false
    }
  }
  return true
}

export function is_string(exp) {
  const length = exp.length
  if ((exp[0] === "'" && exp[length] === "'") || exp[0] === '"') {
    return true
  }
  return false
}

export function is_symbol(exp) {
 const length = exp.length
  if (exp[0] === "'" && exp[length] !== "'") {
    return true
  }
  return false
}

export function is_primitive_type(exp) {
  if (is_numeric(exp) || is_string(exp)) {
    return true
  }
  return false
}


