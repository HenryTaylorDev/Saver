import React from "react";
import { PieChart } from "@mui/x-charts";
import { Card, CardContent, Typography } from "@mui/material";
import { Expense } from "../models/Expense";

interface ExpensesPieChartProps {
  expenses: Expense[];
  selectedMonth: number;
  selectedYear: number;
}

export const ExpensesPieChart = ({
  expenses,
  selectedMonth,
  selectedYear,
}: ExpensesPieChartProps) => {
  // Transform expenses for the pie chart
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const proratedAmount =
      expense.frequency === "quarterly"
        ? expense.amount / 3
        : expense.frequency === "monthly"
        ? expense.amount
        : expense.frequency === "one-off" &&
          new Date(expense.date).getMonth() === selectedMonth &&
          new Date(expense.date).getFullYear() === selectedYear
        ? expense.amount
        : 0;

    acc[expense.category] = (acc[expense.category] || 0) + proratedAmount;
    return acc;
  }, {} as Record<string, number>);

  // Format data for the PieChart
  const data = Object.entries(groupedExpenses).map(([category, total]) => ({
    id: category,
    value: total,
    label: `${category}: £${total.toFixed(2)}`,
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Expenses by Category
        </Typography>
        <PieChart
          series={[
            {
              data,
            },
          ]}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
          width={400}
          height={400}
        />
      </CardContent>
    </Card>
  );
};
