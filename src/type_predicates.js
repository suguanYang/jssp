export function isDigit(exp) {
  // the experssions are string, and the char codes of string are continously in
  // javascript
  if (exp <= '9' && exp >= '0') {
    return true
  }
  return false
}

export function isChar(exp) {
  if (exp <= 'z' && exp >= 'A') {
    return true
  }
  return false
}

export function isNumeric(exp) {
  const length = exp.length
  for (let i = 0; i < length; i++) {
    if (!isDigit(exp[i])) {
      return false
    }
  }
  return true
}

export function isString(exp) {
  if (exp[0] === "'" || exp[0] === '"') {
    return true
  }
  return false
}

export function isPrimitiveType(exp) {
  if (isNumeric(exp) || isString(exp)) {
    return true
  }
  return false
}


