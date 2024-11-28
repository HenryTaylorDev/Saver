import { Box, Button } from "@mui/material";

interface ActionsProps {
  onAddIncome: () => void;
  onAddExpense: () => void;
}

export const Actions = ({ onAddIncome, onAddExpense }: ActionsProps) => {
  return (
    <Box display="flex" gap={2} my={2}>
      <Button variant="contained" color="primary" onClick={onAddIncome}>
        Add Income
      </Button>
      <Button variant="contained" color="secondary" onClick={onAddExpense}>
        Add Expense
      </Button>
    </Box>
  );
};
