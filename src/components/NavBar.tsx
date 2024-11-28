import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: "white",
};

export const NavBar = () => {
  return (
    <>
      <Box display="flex" justifyContent="end" p={2} bgcolor="grey">
        <Link style={linkStyle} to="/">
          DashBoard
        </Link>

        <Link style={linkStyle} to="Income">
          Add Income
        </Link>

        <Link style={linkStyle} to="Expenses">
          Add Expense
        </Link>

        <Link style={linkStyle} to="goals">
          Add Goal
        </Link>
      </Box>
    </>
  );
};
