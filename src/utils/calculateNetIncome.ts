export const calculateNetIncome = (
  incomes: number[],
  expenses: number[]
): number => {
  const totalIncome = incomes.reduce((sum, income) => sum + income, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense, 0);

  return totalIncome - totalExpenses;
};
