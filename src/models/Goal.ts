export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentSavings: number;
  monthlyContribution?: number;
  estimatedCompletionDate?: string;
}
