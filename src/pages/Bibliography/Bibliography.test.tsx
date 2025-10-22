import { render, screen } from "@testing-library/react";

import { Bibliography } from "./Bibliography";

describe("Bibliography", () => {
  it("should render correctly", () => {
    render(<Bibliography />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Bibliography" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: "Unknown Authors" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Online Anonymous Resources",
      }),
    ).toBeInTheDocument();
  });
});
