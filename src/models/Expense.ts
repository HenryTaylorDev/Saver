export interface Expense {
  id: string;
  name: string;
  amount: number;
  category:
    | "Leisure"
    | "Entertainment"
    | "Rent"
    | "Food"
    | "Utilities"
    | "Other";
  frequency: "one-off" | "weekly" | "monthly" | "quarterly" | "annually";
  date: string;
}
