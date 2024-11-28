import { useContext, useState } from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { calculateMonthlyExpenses } from "../utils/calculateMonthlyExpenses";
import { calculateNetIncome } from "../utils/calculateNetIncome";
import { calculateIncomeForMonth } from "../utils/calculateMonthlyTotals";
import IncomeContext from "../contexts/IncomeContext";
import ExpenseContext from "../contexts/ExpenseContext";
import MonthSelector from "../components/MonthSelector";
import AddIncomeForm from "../components/AddIncomeForm";
import AddExpenseForm from "../components/AddExpenseForm";
import { ExpensesPieChart } from "../components/ExpensesPieChart";
import { FormModal } from "../components/FormModal";
import { Expenses } from "../components/Expenses";
import { Actions } from "../components/Actions";

export const Dashboard = () => {
  const { state: incomeState } = useContext(IncomeContext);
  const { state: expenseState } = useContext(ExpenseContext);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"income" | "expense" | null>(null);

  const handleOpenModal = (type: "income" | "expense") => {
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setOpenModal(false);
  };

  const totalIncome = calculateIncomeForMonth(
    incomeState.incomes,
    selectedMonth,
    selectedYear
  );

  const totalMonthlyExpenses = calculateMonthlyExpenses(
    expenseState.expenses,
    selectedMonth,
    selectedYear
  );

  const incomes = incomeState.incomes.map((income) => income.amount);
  const expenses = expenseState.expenses.map((expense) => expense.amount);

  const netIncome = calculateNetIncome(incomes, expenses);

  return (
    <div style={{ padding: "20px" }}>
      <Box mb={4} display="flex" sx={{ justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          Saver Dashboard
        </Typography>
        <MonthSelector
          onChange={(month, year) => {
            setSelectedMonth(month);
            setSelectedYear(year);
          }}
        />
      </Box>

      <Box gap={2}>
        <Actions
          onAddIncome={() => handleOpenModal("income")}
          onAddExpense={() => handleOpenModal("expense")}
        />
      </Box>

      {/* Total Income */}
      <Box display="flex" gap={2}>
        <Card style={{ marginBottom: "20px", flexGrow: 1 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={200}>
              Total Income:
            </Typography>
            <Typography variant="h5" fontWeight={600}>
              £{totalIncome.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>

        {/* Total Expense */}
        <Card style={{ marginBottom: "20px", flexGrow: 1 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={200}>
              Total Expenses:
            </Typography>
            <Typography variant="h5" fontWeight={600}>
              £{totalMonthlyExpenses.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>

        {/* Net Income */}
        <Card style={{ marginBottom: "20px", flexGrow: 1 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={200}>
              After Expenses:
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              style={{
                color: netIncome < 0 ? "red" : "black", // Conditional color
              }}
            >
              £{netIncome.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box display="flex" gap={2}>
        <ExpensesPieChart
          expenses={expenseState.expenses}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
        <Expenses
          expenses={expenseState.expenses}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </Box>
      <FormModal
        open={openModal}
        onClose={handleCloseModal}
        title={modalType === "income" ? "Add Income" : "Add Expense"}
      >
        {modalType === "income" ? (
          <AddIncomeForm onClose={handleCloseModal} />
        ) : (
          <AddExpenseForm onClose={handleCloseModal} />
        )}
      </FormModal>
    </div>
  );
};
