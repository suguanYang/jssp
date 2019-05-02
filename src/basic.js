const OPEND_SYSMBOL = '('
const CLOSED_SYSMBOL = ')'

const balanced_judgement_cacher = {}

export function is_balanced_paren(exp) {
  const parse_iter = (sub_exp, opend_times) => {
    const first = sub_exp[0]
    const rest = sub_exp.slice(1)
    if (sub_exp === '') {
      balanced_judgement_cacher[exp] = opend_times
      return opend_times === 0
    }
    if (first === OPEND_SYSMBOL) return parse_iter(rest, opend_times + 1)
    if (first === CLOSED_SYSMBOL) return parse_iter(rest, opend_times - 1)

    return parse_iter(rest, opend_times)
  }
  return parse_iter(exp, 0)
}

export function list_elements(exp) {
  const withoutWrapperBrackets = exp.slice(1).slice(0, -1)
  const parser = (items, accumulator, total) => {
    const [first, ...rest] = [...items]
    if (first === undefined) return total
    if (is_balanced_paren(accumulator + first)) {
      return parser(rest, '', total.concat([accumulator + first]))
    }

    // split by ' ', so the elements need recovery a space
    return parser(rest, accumulator + first + ' ', total)
  }
  return parser(withoutWrapperBrackets.split(' '), '', [])
}

export function list_to_array(list) {
  return list_elements(list).map(item => {
    if (is_pair(item)) {
      return list_elements(item)
    }
    return item
  })
}

export function array_to_list(array) {
  return array.reduce((pre, cur) => {
    return pre + ' ' + (Array.isArray(cur) ? array_to_list(cur) : cur)
  }, '(') + ')'
}

export function car(exp) {
  return is_pair(exp) ?
    list_to_array(exp)[0]
    : null
}

// list in javascript are flat,
// the rest of list are items but first one of array
// but the real list we should implememted is like this
// [
//  a,
//  [
//   b,
//   [
//    c,
//    [null]
//   ]
//  ]
// ]
export function cdr(exp) {
  return is_pair(exp) ?
    // a cdr should return a list if has
    array_to_list(
      list_to_array(exp)
      .slice(1)
    )
    : null
}

export function is_tagged_list(exp, tag) {
  if(is_pair(exp)) {
    return car(exp) === tag
  }
  return false
}

export function is_pair(exp) {
  const length = exp.length
  if (exp[0] === '(' && exp[length - 1] === ')') {
    return true
  }
  return false
}

