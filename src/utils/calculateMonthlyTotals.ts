import { Frequency } from "../models/Frequency";

export const calculateIncomeForMonth = (
  incomes: { amount: number; frequency: string; date: string }[],
  month: number,
  year: number
): number => {
  return incomes.reduce((total, income) => {
    const incomeDate = new Date(income.date);

    if (income.frequency === Frequency.OneOff) {
      if (
        incomeDate.getMonth() === month &&
        incomeDate.getFullYear() === year
      ) {
        return total + income.amount;
      }
      return total;
    }

    if (
      income.frequency === Frequency.Monthly ||
      income.frequency === Frequency.Weekly
    ) {
      return total + income.amount;
    }

    return total;
  }, 0);
};

export const calculateExpenseForMonth = (
  expenses: { amount: number; frequency: string; date: string }[],
  month: number,
  year: number
): number => {
  return expenses.reduce((total, expense) => {
    const expenseDate = new Date(expense.date);

    if (expense.frequency === Frequency.OneOff) {
      if (
        expenseDate.getMonth() === month &&
        expenseDate.getFullYear() === year
      ) {
        return total + expense.amount;
      }
      return total;
    }

    if (
      expense.frequency === Frequency.Monthly ||
      expense.frequency === Frequency.Weekly
    ) {
      return total + expense.amount;
    }

    return total;
  }, 0);
};
