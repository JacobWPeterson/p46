import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { vi } from "vitest";

import { Workspace } from "./index";

// Mock Mirador and react-pdf to avoid canvas errors
vi.mock("mirador", () => ({
  viewer: vi.fn(),
}));

vi.mock("mirador-image-tools", () => ({
  miradorImageToolsPlugin: vi.fn(),
}));

vi.mock("react-pdf", () => ({
  Document: vi.fn(() => null),
  Page: vi.fn(() => null),
  pdfjs: { GlobalWorkerOptions: { workerSrc: "" } },
}));

describe("Workspace", () => {
  it("should render the workspace with default folio", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Workspace />} />
          <Route path="/folio/:folio" element={<Workspace />} />
        </Routes>
      </MemoryRouter>,
    );

    const prevButton = screen.getByRole("button", { name: "previous" });
    const nextButton = screen.getByRole("button", { name: "next" });
    const addViewerButton = screen.getByRole("button", { name: "add viewer" });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(addViewerButton).toBeInTheDocument();
  });

  it("should initialize from prettified URL /folio/:folio", () => {
    render(
      // Use a non-first folio token so Prev is enabled (e.g., '11↓' => 11v)
      <MemoryRouter initialEntries={["/folio/11v"]}>
        <Routes>
          <Route path="/folio/:folio" element={<Workspace />} />
        </Routes>
      </MemoryRouter>,
    );

    const prevButton = screen.getByRole("button", { name: "previous" });
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).not.toBeDisabled();
  });

  it("should default to folio 0 when route parameter is invalid", () => {
    render(
      <MemoryRouter initialEntries={["/folio/invalid"]}>
        <Routes>
          <Route path="/folio/:folio" element={<Workspace />} />
        </Routes>
      </MemoryRouter>,
    );

    const prevButton = screen.getByRole("button", { name: "previous" });
    expect(prevButton).toBeDisabled();
  });

  it("should default to folio 0 when route parameter does not match any folio", () => {
    render(
      <MemoryRouter initialEntries={["/folio/9999r"]}>
        <Routes>
          <Route path="/folio/:folio" element={<Workspace />} />
        </Routes>
      </MemoryRouter>,
    );

    const prevButton = screen.getByRole("button", { name: "previous" });
    expect(prevButton).toBeDisabled();
  });

  it("should render the first folio when visiting /folio", () => {
    render(
      <MemoryRouter initialEntries={["/folio"]}>
        <Routes>
          <Route path="/folio" element={<Workspace />} />
        </Routes>
      </MemoryRouter>,
    );

    const prevButton = screen.getByRole("button", { name: "previous" });
    expect(prevButton).toBeDisabled();
  });
});
