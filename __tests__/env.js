import { create_empty_env } from '../src/env.js'

test('test env', () => {
  const global_env = create_empty_env()

  global_env.bind('a', 1)

  expect(global_env.is_bind('a')).toBeTruthy()
})

