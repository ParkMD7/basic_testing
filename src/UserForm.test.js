import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import UserForm from "./UserForm";

const name = "guy";
const email = "guy@fieri.com";

test("it shows two inputs and a button", () => {
  // render the component
  render(<UserForm />);

  // manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // make an assertion -- component is doing what we expect
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", async () => {
  const mockOnUserAdd = jest.fn();

  // Try to render my component
  render(<UserForm onUserAdd={mockOnUserAdd} />);

  // Find the two inputs
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // Simulate typing in a name
  await user.click(nameInput);
  await user.keyboard(name);

  // Simulate typing in an email
  await user.click(emailInput);
  await user.keyboard(email);

  // Find the button
  const button = screen.getByRole("button");

  // Simulate clicking the button
  await user.click(button);

  // Assertion to make sure 'onUserAdd' gets called with email/name
  expect(mockOnUserAdd).toHaveBeenCalled();
  expect(mockOnUserAdd).toHaveBeenCalledWith({ name, email });
});

test("it empties the two inputs when the form is submitted", async () => {
  // render the component
  render(<UserForm onUserAdd={() => {}} />);

  // Find the two inputs
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // Simulate typing in a name
  await user.click(nameInput);
  await user.keyboard(name);

  // Simulate typing in an email
  await user.click(emailInput);
  await user.keyboard(email);

  expect(nameInput).toHaveValue(name);
  expect(emailInput).toHaveValue(email);

  // Find the button
  const button = screen.getByRole("button");

  // Simulate clicking the button
  await user.click(button);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
