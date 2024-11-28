import { ExpenseCategory } from "./ExpenseCategory";
import { Frequency } from "./Frequency";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  frequency: Frequency;
  date: string;
}
