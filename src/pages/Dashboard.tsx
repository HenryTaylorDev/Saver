import React, { useContext, useState } from "react";
import IncomeContext from "../contexts/IncomeContext";
import MonthSelector from "../components/MonthSelector";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpenseContext from "../contexts/ExpenseContext";

export const Dashboard = () => {
  const { state: incomeState } = useContext(IncomeContext);
  const { state: expenseState } = useContext(ExpenseContext);

  // State for selected month and year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Calculate total income
  const calculateIncomeForMonth = (month: number, year: number): number => {
    return incomeState.incomes.reduce((total, income) => {
      const incomeDate = new Date(income.date);

      // Include one-off incomes only for the selected month
      if (income.frequency === "one-off") {
        if (
          incomeDate.getMonth() === month &&
          incomeDate.getFullYear() === year
        ) {
          return total + income.amount;
        }
        return total;
      }

      // Include recurring incomes (e.g., monthly, weekly) for all months
      if (income.frequency === "monthly" || income.frequency === "weekly") {
        return total + income.amount;
      }

      return total; // Other frequencies can be handled as needed
    }, 0);
  };

  const calculateExpenseForMonth = (month: number, year: number): number => {
    return expenseState.expenses.reduce((total, expense) => {
      const expenseDate = new Date(expense.date);

      // Include one-off incomes only for the selected month
      if (expense.frequency === "one-off") {
        if (
          expenseDate.getMonth() === month &&
          expenseDate.getFullYear() === year
        ) {
          return total + expense.amount;
        }
        return total;
      }

      // Include recurring incomes (e.g., monthly, weekly) for all months
      if (expense.frequency === "monthly" || expense.frequency === "weekly") {
        return total + expense.amount;
      }

      return total; // Other frequencies can be handled as needed
    }, 0);
  };

  const totalIncome = calculateIncomeForMonth(selectedMonth, selectedYear);
  const totalExpense = calculateExpenseForMonth(selectedMonth, selectedYear);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Month Selector */}
      <MonthSelector
        onChange={(month, year) => {
          setSelectedMonth(month);
          setSelectedYear(year);
        }}
      />

      {/* Total Income */}
      <Card style={{ marginBottom: "20px" }}>
        <CardContent>
          <Typography variant="h5">
            Total Income: £{totalIncome.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      {/* Total Expense */}
      <Card style={{ marginBottom: "20px" }}>
        <CardContent>
          <Typography variant="h5">
            Total Expenses: £{totalExpense.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      {/* Income List */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Income for{" "}
            {new Date(selectedYear, selectedMonth).toLocaleString("default", {
              month: "long",
            })}{" "}
            {selectedYear}
          </Typography>
          <List>
            {incomeState.incomes
              .filter((income) => {
                const incomeDate = new Date(income.date);

                // Show one-off incomes only for the selected month
                if (income.frequency === "one-off") {
                  return (
                    incomeDate.getMonth() === selectedMonth &&
                    incomeDate.getFullYear() === selectedYear
                  );
                }

                // Show recurring incomes in all months
                return (
                  income.frequency === "monthly" ||
                  income.frequency === "weekly"
                );
              })
              .map((income) => (
                <ListItem key={income.id}>
                  <ListItemText
                    primary={`${income.source} - £${income.amount}`}
                    secondary={`Frequency: ${income.frequency}`}
                  />
                </ListItem>
              ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};
