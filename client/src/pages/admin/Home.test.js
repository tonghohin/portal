import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("Tests for Home page", () => {
  render(<Home />);
  const heading = screen.getByText('Home');
  expect(heading).toBeInTheDocument();
});
