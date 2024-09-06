import { render, screen } from "@testing-library/react";

import { About } from "./About";

describe("About", () => {
  it("should render the About page", () => {
    render(<About />);

    const title = screen.getByText("Why Xeirographa");
    const coffeeLink = screen.getByRole("link", { name: "buying me a coffee" });
    const specialThanks = screen.getByText("Special Thanks");
    const miradorLink = screen.getByRole("link", { name: /mirador/ });
    const iiifLink = screen.getByRole("link", {
      name: /International Image Interoperability Framework/,
    });
    const aboutMe = screen.getByText("About Me");

    expect(title).toBeInTheDocument();
    expect(coffeeLink).toBeInTheDocument();
    expect(specialThanks).toBeInTheDocument();
    expect(miradorLink).toBeInTheDocument();
    expect(iiifLink).toBeInTheDocument();
    expect(aboutMe).toBeInTheDocument();
  });
});
