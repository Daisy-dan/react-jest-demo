import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

test("renders initial count of 0", () => {
  render(<App />);
  const countElement = screen.getByText(/count is 0/i);
  expect(countElement).toBeInTheDocument();
});

test("increments count by 1 when button is clicked", () => {
  render(<App />);
  const countElement = screen.getByText(/count is 0/i);
  fireEvent.click(countElement);
  expect(screen.getByText(/count is 1/i)).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByRole("link", { name: /learn react/i });
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute("href", "https://react.dev");
  expect(linkElement).toHaveAttribute("target", "_blank");
});
