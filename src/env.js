export function create_empty_env(parent_env = null) {
  const container = new Map()

  return Object.freeze({
    bind: (key, value) => {
      container.set(key, value)
    },
    is_bind: (key) => {
      return container.has(key)
    },
    get_bound: (key) => {
      return container.get
    },
    parent: parent_env
  })
}

