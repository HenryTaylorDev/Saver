import React, { createContext, useReducer, ReactNode } from "react";
import { Expense } from "../models/Expense";

interface ExpenseState {
  expenses: Expense[];
}

// Define actions
type ExpenseAction =
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "REMOVE_EXPENSE"; payload: string } // payload is the id
  | { type: "UPDATE_EXPENSE"; payload: Expense };

// Initial state
const initialState: ExpenseState = {
  expenses: [],
};

// Reducer function
function expenseReducer(
  state: ExpenseState,
  action: ExpenseAction
): ExpenseState {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "REMOVE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((exp) => exp.id !== action.payload),
      };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((exp) =>
          exp.id === action.payload.id ? action.payload : exp
        ),
      };
    default:
      return state;
  }
}

// Create Context
const ExpenseContext = createContext<{
  state: ExpenseState;
  dispatch: React.Dispatch<ExpenseAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Provider Component
export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
