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
import IncomeContext from "../contexts/IncomeContext";
import { Income } from "../models/Income";
import { Frequency } from "../models/Frequency";

interface AddIncomeFormProps {
  onClose: () => void;
}

const AddIncomeForm = ({ onClose }: AddIncomeFormProps) => {
  const { dispatch } = useContext(IncomeContext);

  // Local form state
  const [source, setSource] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [frequency, setFrequency] = useState<Frequency>(Frequency.Monthly);

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
    setFrequency(Frequency.Monthly);
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
          label="Income Source"
          variant="outlined"
          value={source}
          onChange={(e) => setSource(e.target.value)}
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
          <InputLabel id="frequency-label">Frequency</InputLabel>
          <Select
            labelId="frequency-label"
            label="Frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as typeof frequency)}
          >
            {Object.values(Frequency).map((freq) => (
              <MenuItem key={freq} value={freq}>
                {freq.charAt(0).toUpperCase() + freq.slice(1)}{" "}
                {/* Capitalize */}
              </MenuItem>
            ))}
            =
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Income
        </Button>
      </form>
    </Box>
  );
};
export default AddIncomeForm;
