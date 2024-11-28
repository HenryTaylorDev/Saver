export const normalizeRecurring = (
  amount: number,
  frequency: "one-off" | "weekly" | "monthly" | "quarterly" | "annually",
  startDate: string,
  targetMonth: number,
  targetYear: number
): number => {
  const entryDate = new Date(startDate);
  const entryYear = entryDate.getFullYear();
  const entryMonth = entryDate.getMonth();

  // Handle one-off incomes
  if (frequency === "one-off") {
    return entryYear === targetYear && entryMonth === targetMonth ? amount : 0;
  }

  // Handle recurring incomes
  switch (frequency) {
    case "weekly":
      // Weekly incomes are approximately included in every month
      return entryDate <= new Date(targetYear, targetMonth) ? amount * 4 : 0;

    case "monthly":
      // Monthly incomes are included if the start date is earlier or equal to the target month
      return entryDate <= new Date(targetYear, targetMonth) ? amount : 0;

    case "quarterly":
      // Quarterly incomes are included in the target month if it's within the cycle
      const isQuarterMonth = (targetMonth - entryMonth) % 3 === 0;
      return entryDate <= new Date(targetYear, targetMonth) && isQuarterMonth
        ? amount
        : 0;

    case "annually":
      // Annual incomes are included only in the target month if it's the same as the start month
      return entryDate <= new Date(targetYear, targetMonth) &&
        entryMonth === targetMonth
        ? amount
        : 0;

    default:
      return 0;
  }
};
