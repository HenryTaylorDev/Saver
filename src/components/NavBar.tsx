import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">DashBoard</Link>
        </li>
        <li>
          <Link to="Income">Add Income</Link>
        </li>
        <li>
          <Link to="Expenses">Add Expense</Link>
        </li>
        <li>
          <Link to="goals">Add Goal</Link>
        </li>
      </ul>
    </>
  );
};
