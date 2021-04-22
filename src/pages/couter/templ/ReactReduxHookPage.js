import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useDispatch, useSelector } from '../react-redux/react-redux'

export default function ReactReduxHookPage (props) {
  const count = useSelector((state) => state.count)
  const dispatch = useDispatch()

  const addFun = useCallback(() => {
    dispatch({ type: 'ADD' })
  }, [])
  return (
        <React.Fragment>
            <p>函数组件：ReactReduxHookPage</p>
            <p>{count}</p>
            <p onClick={addFun}>点击增加</p>
        </React.Fragment>
  )
}
