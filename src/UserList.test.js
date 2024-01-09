import { screen, render } from "@testing-library/react";

import UserList from "./UserList";

// screen.logTestingPlaygroundURL();

const mockUsers = [
  { name: "guy", email: "guy@fieri.com" },
  { name: "bojack", email: "bojack@horseman.com" },
];

test("render one row per user", () => {
  // render the component
  const { container } = render(<UserList users={mockUsers} />);

  // find the appropriate elements
  const table = screen.getByRole("table");

  // screen.getAllByRole("row") also returns the table header row so doing a bit of custom work
  // eslint-disable-next-line
  const rows = container.querySelectorAll("tbody tr");

  // make assertion(s)
  expect(table).toBeInTheDocument();
  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", () => {
  // render the component
  render(<UserList users={mockUsers} />);

  // find the appropriate elements
  for (let user of mockUsers) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    // make assertion(s)
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
