import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  InputAdornment,
} from "@mui/material";
import ExpenseContext from "../contexts/ExpenseContext";
import { Expense } from "../models/Expense";
import { ExpenseCategory } from "../models/ExpenseCategory";
import { Frequency } from "../models/Frequency";

interface AddExpenseFormProps {
  onClose: () => void; // Prop to close the modal
}

const AddExpenseForm = ({ onClose }: AddExpenseFormProps) => {
  const { dispatch } = useContext(ExpenseContext);

  // Local form state
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState<ExpenseCategory>(
    ExpenseCategory.Other
  );
  const [frequency, setFrequency] = useState<Frequency>(Frequency.Monthly);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Ensure required fields are filled
    if (!name || !amount || amount <= 0) {
      alert("Please fill out all fields correctly.");
      return;
    }

    // Create new expense object
    const newExpense: Expense = {
      id: Date.now().toString(), // Simple unique ID
      name,
      amount: Number(amount),
      category,
      frequency,
      date,
    };

    // Dispatch the ADD_EXPENSE action
    dispatch({ type: "ADD_EXPENSE", payload: newExpense });

    // Reset form fields
    setName("");
    setAmount("");
    setCategory(ExpenseCategory.Other);
    setFrequency(Frequency.Monthly);
    setDate(new Date().toISOString().split("T")[0]);
    onClose();
  };

  return (
    <Box py={2}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "400px",
        }}
      >
        <TextField
          label="Expense Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Amount"
          type="number"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">£</InputAdornment>
              ),
            },
          }}
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
          >
            {Object.values(ExpenseCategory).map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="frequency-label">Frequency</InputLabel>
          <Select
            labelId="frequency-label"
            label="Frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Frequency)}
          >
            {Object.values(Frequency).map((freq) => (
              <MenuItem key={freq} value={freq}>
                {freq.charAt(0).toUpperCase() + freq.slice(1)}{" "}
                {/* Capitalize */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Expense
        </Button>
      </form>
    </Box>
  );
};

export default AddExpenseForm;
