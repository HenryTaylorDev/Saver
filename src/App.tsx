import "./App.css";
import { ExpenseProvider } from "./contexts/ExpenseContext";
import { IncomeProvider } from "./contexts/IncomeContext";
import { GoalProvider } from "./contexts/GoalContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Expenses } from "./pages/Expenses";
import { Income } from "./pages/Income";
import { Goals } from "./pages/Goals";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <ExpenseProvider>
        <IncomeProvider>
          <GoalProvider>
            <Router>
              <NavBar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/income" element={<Income />} />
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
