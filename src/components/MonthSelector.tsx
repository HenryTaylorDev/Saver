import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

const MonthSelector = ({
  onChange,
}: {
  onChange: (month: number, year: number) => void;
}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    const month = event.target.value as number;
    setSelectedMonth(month);
    onChange(month, selectedYear);
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    const year = event.target.value as number;
    setSelectedYear(year);
    onChange(selectedMonth, year);
  };

  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
      <FormControl>
        <InputLabel id="month-input">Month</InputLabel>
        <Select
          labelId="month-input"
          label="Month"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="year-input">Year</InputLabel>
        <Select
          labelId="year-input"
          label="Year"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <MenuItem key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MonthSelector;
