import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { Modal } from "./Modal";

describe("Modal", () => {
  describe("Escape key handling", () => {
    it("should close modal when Escape key is pressed", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen handleClose={handleClose}>
          Modal content
        </Modal>,
      );

      expect(screen.getByText("Modal content")).toBeInTheDocument();

      await user.keyboard("{Escape}");

      expect(handleClose).toHaveBeenCalledOnce();
    });

    it("should clean up event listener on unmount", async () => {
      const handleClose = vi.fn();
      const removeEventListenerSpy = vi.spyOn(
        document.body,
        "removeEventListener",
      );

      const { unmount } = render(
        <Modal isOpen handleClose={handleClose}>
          Modal content
        </Modal>,
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );
      removeEventListenerSpy.mockRestore();
    });

    it("should add new event listener when handleClose changes", async () => {
      const handleClose1 = vi.fn();
      const handleClose2 = vi.fn();

      const { rerender } = render(
        <Modal isOpen handleClose={handleClose1}>
          Modal content
        </Modal>,
      );

      rerender(
        <Modal isOpen handleClose={handleClose2}>
          Modal content updated
        </Modal>,
      );

      // After rerender with new handleClose, pressing Escape should call the new one
      await userEvent.keyboard("{Escape}");

      // The new handler should be called (due to effect re-run)
      expect(handleClose2).toHaveBeenCalled();
    });
  });

  describe("modal content interaction", () => {
    it("should close modal when backdrop is clicked", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen handleClose={handleClose}>
          Modal content
        </Modal>,
      );

      const overlay = screen.getByRole("presentation");
      await user.click(overlay);
      expect(handleClose).toHaveBeenCalledOnce();
    });

    it("should not close modal when content is clicked", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen handleClose={handleClose}>
          <div data-testid="modal-content">Modal content</div>
        </Modal>,
      );

      const content = screen.getByTestId("modal-content");
      await user.click(content);

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe("close button behavior", () => {
    it("should render close button", () => {
      render(
        <Modal isOpen handleClose={vi.fn()}>
          Modal content
        </Modal>,
      );

      const closeButton = screen.getByRole("button", {
        name: "close",
        hidden: true,
      });
      expect(closeButton).toBeInTheDocument();
    });

    it("should close modal when close button is clicked", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen handleClose={handleClose}>
          Modal content
        </Modal>,
      );

      const closeButton = screen.getByRole("button", {
        name: "close",
        hidden: true,
      });
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledOnce();
    });

    it("should disable close button when isCloseDisabled is true", () => {
      const handleClose = vi.fn();

      render(
        <Modal isOpen handleClose={handleClose} isCloseDisabled>
          Modal content
        </Modal>,
      );

      const closeButton = screen.getByRole("button", {
        name: "close",
        hidden: true,
      });
      expect(closeButton).toBeDisabled();
    });

    it("should not close modal when close button is disabled", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen handleClose={handleClose} isCloseDisabled>
          Modal content
        </Modal>,
      );

      const closeButton = screen.getByRole("button", {
        name: "close",
        hidden: true,
      });
      await user.click(closeButton);

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe("modal visibility", () => {
    it("should render modal content when isOpen is true", () => {
      render(
        <Modal isOpen handleClose={vi.fn()}>
          <div>Modal content</div>
        </Modal>,
      );

      expect(screen.getByText("Modal content")).toBeInTheDocument();
    });

    it("should not render modal content when isOpen is false", () => {
      render(
        <Modal isOpen={false} handleClose={vi.fn()}>
          <div>Modal content</div>
        </Modal>,
      );

      expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
    });

    it("should return null when isOpen is false", () => {
      const { container } = render(
        <Modal isOpen={false} handleClose={vi.fn()}>
          <div>Modal content</div>
        </Modal>,
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe("modal header", () => {
    it("should render header when header prop is provided", () => {
      render(
        <Modal isOpen handleClose={vi.fn()} header="Test Header">
          Modal content
        </Modal>,
      );

      const heading = screen.getByRole("heading", {
        level: 2,
        name: "Test Header",
        hidden: true,
      });
      expect(heading).toBeInTheDocument();
    });

    it("should not render header when header prop is not provided", () => {
      render(
        <Modal isOpen handleClose={vi.fn()}>
          Modal content
        </Modal>,
      );

      const headings = screen.queryAllByRole("heading");
      expect(headings).toHaveLength(0);
    });
  });

  describe("backdrop click with isCloseDisabled", () => {
    it("should not close modal when backdrop is clicked and isCloseDisabled is true", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen handleClose={handleClose} isCloseDisabled>
          Modal content
        </Modal>,
      );

      const overlay = screen.getByRole("presentation");
      await user.click(overlay);
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe("keyboard events", () => {
    it("should not close modal when isCloseDisabled and Enter is pressed", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen handleClose={handleClose} isCloseDisabled>
          Modal content
        </Modal>,
      );

      const overlay = screen.getByRole("presentation");
      (overlay as HTMLElement).focus();
      await user.keyboard("{Enter}");
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe("custom styling", () => {
    it("should accept custom classes prop", () => {
      render(
        <Modal isOpen handleClose={vi.fn()} classes="custom-class">
          Modal content
        </Modal>,
      );

      // Verify the modal rendered successfully
      expect(screen.getByText("Modal content")).toBeInTheDocument();
    });
  });
});
