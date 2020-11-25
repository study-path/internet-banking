import React, { useContext, useReducer } from 'react';


const OperationDepositeContext = React.createContext();


export const useOperationDeposite =() => {
  return useContext(OperationDepositeContext)
}

const SHOW_ALERT = 'show'
const HIDE_ALERT = 'hide'

const reducer = (state, action) => {
  switch(action.type){
    case SHOW_ALERT: return{...state, visible: true, text: action.text}
    case HIDE_ALERT: return{...state, visible: false}
    default: return state
  }
}


export const OperationDepositeProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, {
    visible:false,
    text: ''
  })

  const show = text => dispatch({type:SHOW_ALERT, text })
  const hide = () => dispatch({type:HIDE_ALERT })
  
  return (   
      <OperationDepositeContext.Provider  
        value={{
          visible:state.visible,
          text:state.text,
          show,
          hide
        }}>
          {children}
      </OperationDepositeContext.Provider>
   
    
  )

}