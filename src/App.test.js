import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import App from "./App";

const mockName = "guy";
const mockEmail = "guy@fieri.com";

test("can recieve a new user and show it on a list", async () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // Simulate typing in a name
  await user.click(nameInput);
  await user.keyboard(mockName);

  // Simulate typing in an email
  await user.click(emailInput);
  await user.keyboard(mockEmail);

  // Find the button
  const button = screen.getByRole("button");

  // Simulate clicking the button
  await user.click(button);

  // screen.debug()
  const name = screen.getByRole("cell", { name: mockName });
  const email = screen.getByRole("cell", { name: mockEmail });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
