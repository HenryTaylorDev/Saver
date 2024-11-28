import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ExpenseContext from "../contexts/ExpenseContext";
import { Expense } from "../models/Expense";

export const AddExpenseForm = () => {
  const { dispatch } = useContext(ExpenseContext);

  // Local form state
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState<
    "Leisure" | "Entertainment" | "Rent" | "Food" | "Utilities" | "Other"
  >("Other");
  const [frequency, setFrequency] = useState<
    "one-off" | "weekly" | "monthly" | "quarterly" | "annually"
  >("monthly");
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
    setCategory("Other");
    setFrequency("monthly");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
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
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
      />
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value as
                | "Leisure"
                | "Entertainment"
                | "Rent"
                | "Food"
                | "Utilities"
                | "Other"
            )
          }
        >
          <MenuItem value="Rent">Rent</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Utilities">Utilities</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Leisure">Leisure</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="frequency-label">Frequency</InputLabel>
        <Select
          labelId="frequency-label"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as typeof frequency)}
        >
          <MenuItem value="one-off">One-off</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="quarterly">Quarterly</MenuItem>
          <MenuItem value="annually">Annually</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Date"
        type="date"
        variant="outlined"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Expense
      </Button>
    </form>
  );
};
