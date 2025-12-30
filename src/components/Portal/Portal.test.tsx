import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Portal } from './Portal';

describe('Portal', () => {
  afterEach(() => {
    // Clean up portal elements after each test
    const portal = document.getElementById('portal-wrapper');
    if (portal) {
      portal.remove();
    }
  });

  describe('default portal wrapper', () => {
    it('should render children in portal with default wrapper id', () => {
      render(
        <Portal>
          <div>Portal content</div>
        </Portal>
      );

      expect(screen.getByText('Portal content')).toBeInTheDocument();
    });

    it('should create and append portal wrapper to body if it does not exist', () => {
      render(
        <Portal>
          <div>Portal content</div>
        </Portal>
      );

      const portalWrapper = document.getElementById('portal-wrapper');
      expect(portalWrapper).toBeInTheDocument();
      expect(portalWrapper?.parentElement).toBe(document.body);
    });

    it('should use existing portal wrapper if it already exists', () => {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('id', 'portal-wrapper');
      document.body.appendChild(wrapper);

      render(
        <Portal>
          <div>Portal content</div>
        </Portal>
      );

      // Should still have only one wrapper
      const wrappers = document.querySelectorAll('#portal-wrapper');
      expect(wrappers).toHaveLength(1);

      wrapper.remove();
    });
  });

  describe('custom portal wrapper', () => {
    it('should render children in portal with custom wrapper id', () => {
      render(
        <Portal wrapperId="custom-portal">
          <div>Custom portal content</div>
        </Portal>
      );

      expect(screen.getByText('Custom portal content')).toBeInTheDocument();
    });

    it('should create custom portal wrapper if it does not exist', () => {
      render(
        <Portal wrapperId="my-custom-portal">
          <div>Custom content</div>
        </Portal>
      );

      const customWrapper = document.getElementById('my-custom-portal');
      expect(customWrapper).toBeInTheDocument();
      expect(customWrapper?.parentElement).toBe(document.body);

      customWrapper?.remove();
    });

    it('should use existing custom portal wrapper', () => {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('id', 'existing-portal');
      document.body.appendChild(wrapper);

      render(
        <Portal wrapperId="existing-portal">
          <div>Portal content</div>
        </Portal>
      );

      const wrappers = document.querySelectorAll('#existing-portal');
      expect(wrappers).toHaveLength(1);

      wrapper.remove();
    });
  });

  describe('multiple portals', () => {
    it('should support multiple portals with different wrapper ids', () => {
      render(
        <Portal wrapperId="portal-1">
          <div>Portal 1</div>
        </Portal>
      );

      render(
        <Portal wrapperId="portal-2">
          <div>Portal 2</div>
        </Portal>
      );

      expect(screen.getByText('Portal 1')).toBeInTheDocument();
      expect(screen.getByText('Portal 2')).toBeInTheDocument();

      document.getElementById('portal-1')?.remove();
      document.getElementById('portal-2')?.remove();
    });
  });

  describe('portal content interaction', () => {
    it('should allow interaction with portal content', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Portal>
          <button onClick={handleClick}>Portal button</button>
        </Portal>
      );

      const button = screen.getByRole('button', { name: 'Portal button' });
      await user.click(button);

      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should allow keyboard events in portal content', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();

      render(
        <Portal>
          <input onKeyDown={handleKeyDown} placeholder="Test input" />
        </Portal>
      );

      const input = screen.getByPlaceholderText('Test input');
      input.focus();
      await user.keyboard('a');

      expect(handleKeyDown).toHaveBeenCalled();
    });
  });

  describe('portal children', () => {
    it('should render multiple children in portal', () => {
      render(
        <Portal>
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
        </Portal>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });

    it('should render nested elements in portal', () => {
      render(
        <Portal>
          <div>
            <div>
              <span>Nested content</span>
            </div>
          </div>
        </Portal>
      );

      expect(screen.getByText('Nested content')).toBeInTheDocument();
    });
  });
});
