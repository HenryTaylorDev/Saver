import { Expense } from "../models/Expense";
import { Frequency } from "../models/Frequency";

export const calculateMonthlyExpenses = (
  expenses: Expense[],
  targetMonth: number,
  targetYear: number
): number => {
  return expenses.reduce((total, expense) => {
    const expenseDate = new Date(expense.date);

    const isInTargetYear = expenseDate.getFullYear() === targetYear;

    if (expense.frequency === Frequency.OneOff) {
      const isInTargetMonth = expenseDate.getMonth() === targetMonth;
      if (isInTargetYear && isInTargetMonth) {
        return total + expense.amount;
      }
      return total;
    }

    if (expense.frequency === Frequency.Monthly) {
      return total + expense.amount;
    }

    if (expense.frequency === Frequency.Quarterly) {
      const expenseMonth = expenseDate.getMonth();
      const isInQuarter =
        Math.floor(expenseMonth / 3) === Math.floor(targetMonth / 3);
      if (isInTargetYear && isInQuarter) {
        return total + expense.amount / 3;
      }
      return total;
    }

    return total;
  }, 0);
};
