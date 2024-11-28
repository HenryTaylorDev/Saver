import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
  Card,
} from "@mui/material";
import { Expense } from "../models/Expense";
import { Frequency } from "../models/Frequency";

interface ExpenseListProps {
  expenses: Expense[];
  selectedMonth: number; // 0 = January
  selectedYear: number;
}

export const Expenses = ({
  expenses,
  selectedMonth,
  selectedYear,
}: ExpenseListProps) => {
  // Filter expenses to include only relevant items
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    if (expense.frequency === Frequency.OneOff) {
      // Show one-off expenses only in their specific month and year
      return (
        expenseDate.getMonth() === selectedMonth &&
        expenseDate.getFullYear() === selectedYear
      );
    }

    // Include recurring expenses (e.g., monthly, weekly)
    return true; // Modify as needed for other frequencies
  });

  return (
    <Card>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          Expense List
        </Typography>
        {filteredExpenses.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No expenses to display.
          </Typography>
        ) : (
          <List>
            {filteredExpenses.map((expense) => (
              <React.Fragment key={expense.id}>
                <ListItem>
                  <ListItemText
                    primary={`${expense.name} - £${expense.amount.toFixed(2)}`}
                    secondary={`Category: ${expense.category}, Frequency: ${expense.frequency}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Card>
  );
};
