import React, { createContext, useReducer, ReactNode } from "react";
import { Goal } from "../models/Goal";

interface GoalState {
  goals: Goal[];
}

// Define actions
type GoalAction =
  | { type: "ADD_GOAL"; payload: Goal }
  | { type: "REMOVE_GOAL"; payload: string } // payload is the id
  | { type: "UPDATE_GOAL"; payload: Goal };

// Initial state
const initialState: GoalState = {
  goals: [],
};

// Reducer function
function goalReducer(state: GoalState, action: GoalAction): GoalState {
  switch (action.type) {
    case "ADD_GOAL":
      return { ...state, goals: [...state.goals, action.payload] };
    case "REMOVE_GOAL":
      return {
        ...state,
        goals: state.goals.filter((goal) => goal.id !== action.payload),
      };
    case "UPDATE_GOAL":
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.payload.id ? action.payload : goal
        ),
      };
    default:
      return state;
  }
}

// Create Context
const GoalContext = createContext<{
  state: GoalState;
  dispatch: React.Dispatch<GoalAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Provider Component
export const GoalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(goalReducer, initialState);

  return (
    <GoalContext.Provider value={{ state, dispatch }}>
      {children}
    </GoalContext.Provider>
  );
};

export default GoalContext;
