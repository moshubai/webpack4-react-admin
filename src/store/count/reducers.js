// 定义规则
const counterReducer = (state = 0, { type, payload = 1 }) => {
  switch (type) {
    case 'ADD':
      return state + payload
    case 'MINUS':
      return state - payload || 1
    default:
      return state
  }
}

export default counterReducer
