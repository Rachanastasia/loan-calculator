import React, { createContext, useReducer } from 'react'

/*Instance of context */
export const LoanContext = createContext()

/*This component wraps index.js */
function LoanContextProvider({ children }) {
  const isNumericValue = (value) => {
    /*returns boolean if number includes
    digits and decimals only */
    const regex = /^\d+(\.\d{1,2})?$/
    return regex.test(value)
  }

  function reducer(state, action){
    const {value} = action.payload
    switch(action.type){
      case 'setLoanAmt': 
      if (!isNumericValue(Number(value))) return state
      return {...state, loanAmt: value}

      case 'setInterestRate': 
      if (!isNumericValue(Number(value))) return state
      else if (value > 100) return state //can't be more than 100%
      return {...state, interestRate: value}

      case 'setLoanTermValue': 
      if (!isNumericValue(Number(value))) return state
      return {...state, loanTerm: {isMonth: state.loanTerm.isMonth, number: value}}

      case 'setLoanTermType': 
      console.log('RESET VALUE', value)
      return {...state, loanTerm: {number: state.loanTerm.number, isMonth: value}}
      
      default: 
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    loanAmt: '5000',
    interestRate: '4.5',
    loanTerm: {
      isMonth:true,
      number: '60'
    }
  })

  const value = { 
    loanAmt: state.loanAmt,  
    interestRate: state.interestRate,
    loanTerm: state.loanTerm.number,
    isMonth: state.loanTerm.isMonth,
    dispatch }

    console.log(state.loanTerm.isMonth)

  return (
    <LoanContext.Provider value={value}>
      {children}
    </LoanContext.Provider>

  )
}

export default LoanContextProvider
