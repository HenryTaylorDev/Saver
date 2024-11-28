import React from "react";
import { PieChart } from "@mui/x-charts";
import { Card, CardContent, Typography } from "@mui/material";
import { Expense } from "../models/Expense";

interface ExpensesPieChartProps {
  expenses: Expense[];
}

export const ExpensesPieChart = ({ expenses }: ExpensesPieChartProps) => {
  const groupedExpenses = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for the Pie Chart
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
            axisLabel: {
              display: "none",
            },
          }}
          width={400}
          height={400}
        />
      </CardContent>
    </Card>
  );
};
