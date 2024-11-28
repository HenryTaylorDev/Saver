import "./App.css";
import { ExpenseProvider } from "./contexts/ExpenseContext";
import { IncomeProvider } from "./contexts/IncomeContext";
import { GoalProvider } from "./contexts/GoalContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Goals } from "./pages/Goals";

function App() {
  return (
    <>
      <ExpenseProvider>
        <IncomeProvider>
          <GoalProvider>
            <Router>
              {/* <NavBar /> */}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/goals" element={<Goals />} />
              </Routes>
            </Router>
          </GoalProvider>
        </IncomeProvider>
      </ExpenseProvider>
    </>
  );
}

export default App;
