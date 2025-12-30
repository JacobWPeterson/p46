import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { send } from '@emailjs/browser';

import { ContactModal } from './ContactModal';

vi.mock('@emailjs/browser', () => ({
  send: vi.fn()
}));

describe('ContactModal', () => {
  const defaultProps = {
    show: true,
    onHide: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up portal
    const portal = document.getElementById('portal-wrapper');
    if (portal) {
      portal.remove();
    }
  });

  describe('visibility', () => {
    it('should render modal when show is true', () => {
      render(<ContactModal {...defaultProps} />);

      expect(
        screen.getByRole('heading', { level: 2, name: 'Contact form', hidden: true })
      ).toBeInTheDocument();
    });

    it('should not render modal when show is false', () => {
      render(<ContactModal show={false} onHide={vi.fn()} />);

      expect(screen.queryByRole('heading', { name: 'Contact form' })).not.toBeInTheDocument();
    });
  });

  describe('form fields', () => {
    it('should render all form fields', () => {
      render(<ContactModal {...defaultProps} />);

      expect(screen.getByPlaceholderText('e.g., Paul Maas')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your message here')).toBeInTheDocument();
    });

    it('should display required error for name field', async () => {
      const user = userEvent.setup();
      render(<ContactModal {...defaultProps} />);

      const nameInput = screen.getByPlaceholderText('e.g., Paul Maas');
      nameInput.focus();
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
    });

    it('should display required error for email field', async () => {
      const user = userEvent.setup();
      render(<ContactModal {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText('Enter your email address');
      emailInput.focus();
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });

    it('should display pattern error for invalid email', async () => {
      const user = userEvent.setup();
      render(<ContactModal {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText(
        'Enter your email address'
      ) as HTMLInputElement;
      await user.type(emailInput, 'invalid-email');
      emailInput.blur();

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
      });
    });

    it('should display required error for message field', async () => {
      const user = userEvent.setup();
      render(<ContactModal {...defaultProps} />);

      const messageInput = screen.getByPlaceholderText('Enter your message here');
      messageInput.focus();
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Message is required')).toBeInTheDocument();
      });
    });

    it('should display minLength error for short message', async () => {
      const user = userEvent.setup();
      render(<ContactModal {...defaultProps} />);

      const messageInput = screen.getByPlaceholderText(
        'Enter your message here'
      ) as HTMLTextAreaElement;
      await user.type(messageInput, 'abc');
      messageInput.blur();

      await waitFor(() => {
        expect(screen.getByText('Please include a longer message')).toBeInTheDocument();
      });
    });
  });

  describe('form submission', () => {
    it('should disable send button when form is incomplete', () => {
      render(<ContactModal {...defaultProps} />);

      const sendButton = screen.getByRole('button', { name: 'Send', hidden: true });
      expect(sendButton).toBeDisabled();
    });

    it('should enable send button when form is complete', async () => {
      const user = userEvent.setup();
      render(<ContactModal {...defaultProps} />);

      await user.type(screen.getByPlaceholderText('e.g., Paul Maas'), 'John Doe');
      await user.type(screen.getByPlaceholderText('Enter your email address'), 'john@example.com');
      await user.type(
        screen.getByPlaceholderText('Enter your message here'),
        'This is a test message'
      );

      const sendButton = screen.getByRole('button', { name: 'Send', hidden: true });
      expect(sendButton).not.toBeDisabled();
    });

    it('should send email when form is submitted', async () => {
      const user = userEvent.setup();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(send).mockResolvedValue({} as any);

      render(<ContactModal {...defaultProps} />);

      await user.type(screen.getByPlaceholderText('e.g., Paul Maas'), 'John Doe');
      await user.type(screen.getByPlaceholderText('Enter your email address'), 'john@example.com');
      await user.type(
        screen.getByPlaceholderText('Enter your message here'),
        'This is a test message'
      );

      const sendButton = screen.getByRole('button', { name: 'Send', hidden: true });
      await user.click(sendButton);

      await waitFor(() => {
        expect(send).toHaveBeenCalledWith(
          'service_v5oeqac',
          'template_r9mhd7m',
          {
            from_name: 'John Doe',
            message: 'Message from P46 site: This is a test message',
            reply_to: 'john@example.com'
          },
          { publicKey: 'bLp81eIkp1XLYMVPi' }
        );
      });
    });

    it('should show success message after email is sent', async () => {
      const user = userEvent.setup();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(send).mockResolvedValue({} as any);

      render(<ContactModal {...defaultProps} />);

      await user.type(screen.getByPlaceholderText('e.g., Paul Maas'), 'John Doe');
      await user.type(screen.getByPlaceholderText('Enter your email address'), 'john@example.com');
      await user.type(
        screen.getByPlaceholderText('Enter your message here'),
        'This is a test message'
      );

      const sendButton = screen.getByRole('button', { name: 'Send', hidden: true });
      await user.click(sendButton);

      await waitFor(() => {
        expect(screen.getByText('Email successfully sent')).toBeInTheDocument();
        expect(screen.getByText('Thanks for reaching out')).toBeInTheDocument();
      });
    });

    it('should show error message when email send fails', async () => {
      const user = userEvent.setup();
      vi.mocked(send).mockRejectedValue(new Error('Send failed'));

      render(<ContactModal {...defaultProps} />);

      await user.type(screen.getByPlaceholderText('e.g., Paul Maas'), 'John Doe');
      await user.type(screen.getByPlaceholderText('Enter your email address'), 'john@example.com');
      await user.type(
        screen.getByPlaceholderText('Enter your message here'),
        'This is a test message'
      );

      const sendButton = screen.getByRole('button', { name: 'Send', hidden: true });
      await user.click(sendButton);

      await waitFor(() => {
        expect(screen.getByText('Email failed to send. Please retry')).toBeInTheDocument();
      });
    });
  });

  describe('buttons', () => {
    it('should render cancel button', () => {
      render(<ContactModal {...defaultProps} />);

      const cancelButton = screen.getByRole('button', { name: 'Cancel', hidden: true });
      expect(cancelButton).toBeInTheDocument();
    });

    it('should call onHide when cancel button is clicked', async () => {
      const user = userEvent.setup();
      const onHide = vi.fn();

      render(<ContactModal show onHide={onHide} />);

      const cancelButton = screen.getByRole('button', { name: 'Cancel', hidden: true });
      await user.click(cancelButton);

      expect(onHide).toHaveBeenCalledOnce();
    });

    it('should disable send button while sending', async () => {
      const user = userEvent.setup();
      // eslint-disable-next-line compat/compat
      vi.mocked(send).mockImplementation(() => new Promise(() => {})); // Never resolves

      render(<ContactModal {...defaultProps} />);

      await user.type(screen.getByPlaceholderText('e.g., Paul Maas'), 'John Doe');
      await user.type(screen.getByPlaceholderText('Enter your email address'), 'john@example.com');
      await user.type(
        screen.getByPlaceholderText('Enter your message here'),
        'This is a test message'
      );

      const sendButton = screen.getByRole('button', { name: 'Send', hidden: true });
      await user.click(sendButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Sending', hidden: true })).toBeInTheDocument();
      });
    });

    it('should show close button after email is sent', async () => {
      const user = userEvent.setup();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(send).mockResolvedValue({} as any);

      render(<ContactModal {...defaultProps} />);

      await user.type(screen.getByPlaceholderText('e.g., Paul Maas'), 'John Doe');
      await user.type(screen.getByPlaceholderText('Enter your email address'), 'john@example.com');
      await user.type(
        screen.getByPlaceholderText('Enter your message here'),
        'This is a test message'
      );

      const sendButton = screen.getByRole('button', { name: 'Send', hidden: true });
      await user.click(sendButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Close', hidden: true })).toBeInTheDocument();
      });
    });
  });

  describe('message character count', () => {
    it('should display character count', async () => {
      const user = userEvent.setup();
      render(<ContactModal {...defaultProps} />);

      const messageInput = screen.getByPlaceholderText('Enter your message here');
      await user.type(messageInput, 'Hello');

      expect(screen.getByText('(5/2000)')).toBeInTheDocument();
    });

    it('should update character count as user types', async () => {
      const user = userEvent.setup();
      render(<ContactModal {...defaultProps} />);

      const messageInput = screen.getByPlaceholderText('Enter your message here');
      await user.type(messageInput, 'Hello World');

      expect(screen.getByText('(11/2000)')).toBeInTheDocument();
    });
  });

  describe('form reset', () => {
    it('should reset form when cancel is clicked', async () => {
      const user = userEvent.setup();
      const onHide = vi.fn();

      render(<ContactModal show onHide={onHide} />);

      const nameInput = screen.getByPlaceholderText('e.g., Paul Maas') as HTMLInputElement;
      await user.type(nameInput, 'John Doe');

      const cancelButton = screen.getByRole('button', { name: 'Cancel', hidden: true });
      await user.click(cancelButton);

      expect(nameInput.value).toBe('');
    });
  });
});
