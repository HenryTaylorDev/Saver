import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import IncomeContext from "../contexts/IncomeContext";
import { Income } from "../models/Income";

const AddIncomeForm: React.FC = () => {
  const { dispatch } = useContext(IncomeContext);

  // Local form state
  const [source, setSource] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [frequency, setFrequency] = useState<
    "one-off" | "weekly" | "monthly" | "quarterly" | "annually"
  >("monthly");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Ensure required fields are filled
    if (!source || !amount || amount <= 0) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    // Create new income object
    const newIncome: Income = {
      id: Date.now().toString(), // Simple unique ID
      source,
      amount: Number(amount),
      frequency,
      date: today, // Use today's date for all entries
    };

    // Dispatch the ADD_INCOME action
    dispatch({ type: "ADD_INCOME", payload: newIncome });

    // Reset form fields
    setSource("");
    setAmount("");
    setFrequency("monthly");
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
        label="Income Source"
        variant="outlined"
        value={source}
        onChange={(e) => setSource(e.target.value)}
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
      <Button type="submit" variant="contained" color="primary">
        Add Income
      </Button>
    </form>
  );
};

export default AddIncomeForm;
