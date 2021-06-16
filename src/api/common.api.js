import { get, post } from './request'
export default {
  test1: (data) => get('test', data),
  test2: (data) => post('test', data)
}
