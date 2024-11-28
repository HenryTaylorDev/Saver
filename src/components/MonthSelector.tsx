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
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    const month = event.target.value as number;
    setSelectedMonth(month);
    onChange(month, selectedYear);
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    const year = event.target.value as number;
    setSelectedYear(year);
    // Adjust month options when year changes
    const adjustedMonth =
      year === currentYear && selectedMonth < currentMonth
        ? currentMonth
        : selectedMonth;
    setSelectedMonth(adjustedMonth);
    onChange(adjustedMonth, year);
  };

  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
      <FormControl size="small">
        <InputLabel id="month-input">Month</InputLabel>
        <Select
          labelId="month-input"
          label="Month"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }, (_, i) => i)
            .filter((month) => {
              // Allow only current or future months in the current year
              return selectedYear > currentYear || month >= currentMonth;
            })
            .map((month) => (
              <MenuItem key={month} value={month}>
                {new Date(0, month).toLocaleString("default", {
                  month: "long",
                })}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel id="year-input">Year</InputLabel>
        <Select
          labelId="year-input"
          label="Year"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <MenuItem key={i} value={currentYear + i}>
              {currentYear + i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MonthSelector;
