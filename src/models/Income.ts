export interface Income {
  id: string;
  source: string;
  amount: number;
  frequency: "one-off" | "weekly" | "monthly" | "quarterly" | "annually";
  date: string;
}
