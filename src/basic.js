function list_to_array(list) {
  return list.slice(1).slice(0, -1).split(' ')
}

function array_to_list(array) {
  return '(' + array.join(' ') + ')'
}

export function car(exp) {
  return is_pair(exp) ?
    list_to_array(exp)[0]
    : null
}

// list in javascript are flat,
// the rest of list are items unless first one in array
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

