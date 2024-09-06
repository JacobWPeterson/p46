import { render, screen } from "@testing-library/react";

import { Guide } from "./Guide";

describe("Guide", () => {
  it("should render correctly", () => {
    render(<Guide />);

    expect(screen.getByText("Guide")).toBeInTheDocument();

    expect(screen.getByText("Symbols")).toBeInTheDocument();

    expect(screen.getByText("How-to")).toBeInTheDocument();
    expect(screen.getByText("Image viewer")).toBeInTheDocument();
    expect(screen.getByText("Transcription workspace")).toBeInTheDocument();
    expect(screen.getByText("Found an issue?")).toBeInTheDocument();
  });
});
