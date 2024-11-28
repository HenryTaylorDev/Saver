import { Frequency } from "./Frequency";

export interface Income {
  id: string;
  source: string;
  amount: number;
  frequency: Frequency;
  date: string;
}
