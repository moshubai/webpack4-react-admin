// 定义规则
const counterReducer = (state = 0, { type, payload = 1 }) => {
  console.log('type', type,) // log
  switch (type) {
    case 'ADD':
      return state + payload
      // return { ...state, num: state.num + payload };
    case 'MINUS':
      // return state - payload
      return state - payload || 1
    default:
      return state
  }
}

export default counterReducer
