import React, { createContext, useReducer, ReactNode } from "react";
import { Income } from "../models/Income";

interface IncomeState {
  incomes: Income[];
}

// Define actions
type IncomeAction =
  | { type: "ADD_INCOME"; payload: Income }
  | { type: "REMOVE_INCOME"; payload: string } // payload is the id
  | { type: "UPDATE_INCOME"; payload: Income };

// Initial state
const initialState: IncomeState = {
  incomes: [],
};

// Reducer function
function incomeReducer(state: IncomeState, action: IncomeAction): IncomeState {
  switch (action.type) {
    case "ADD_INCOME":
      return { ...state, incomes: [...state.incomes, action.payload] };
    case "REMOVE_INCOME":
      return {
        ...state,
        incomes: state.incomes.filter((inc) => inc.id !== action.payload),
      };
    case "UPDATE_INCOME":
      return {
        ...state,
        incomes: state.incomes.map((inc) =>
          inc.id === action.payload.id ? action.payload : inc
        ),
      };
    default:
      return state;
  }
}

// Create Context
const IncomeContext = createContext<{
  state: IncomeState;
  dispatch: React.Dispatch<IncomeAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Provider Component
export const IncomeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(incomeReducer, initialState);

  return (
    <IncomeContext.Provider value={{ state, dispatch }}>
      {children}
    </IncomeContext.Provider>
  );
};

export default IncomeContext;
