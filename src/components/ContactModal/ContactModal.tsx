import { useState, type ReactElement } from 'react';
import classNames from 'classnames';
import { send } from '@emailjs/browser';
import { useForm } from 'react-hook-form';

import { Modal } from '../Modal/Modal';

import styles from './ContactModal.module.scss';

interface ContactModalProps {
  show: boolean;
  onHide: () => void;
}

type ContactFormData = { name: string; email: string; message: string };

export const ContactModal = ({ show, onHide }: ContactModalProps): ReactElement => {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendFailed, setSendFailed] = useState<boolean>(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch
  } = useForm<ContactFormData>({ mode: 'onTouched' });

  const [name, email, message] = watch(['name', 'email', 'message']);

  // Mid-strength solution comes from https://www.regular-expressions.info/email.html
  const emailRegex = /^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  const handleCancel = (): void => {
    reset();
    onHide();
    setEmailSent(false);
  };

  const sendEmail = (): void => {
    setIsSending(true);
    send(
      'service_v5oeqac',
      'template_r9mhd7m',
      {
        from_name: name,
        message: `Message from P46 site: ${message}`,
        reply_to: email
      },
      { publicKey: 'bLp81eIkp1XLYMVPi' }
    )
      .then(() => {
        setEmailSent(true);
        if (sendFailed) {
          setSendFailed(false);
        }
      })
      .catch(() => {
        setSendFailed(true);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const isFormIncomplete = !name || !email || !message;

  return (
    <Modal
      isOpen={show}
      handleClose={handleCancel}
      isCloseDisabled={isSending}
      header="Contact form"
      classes={classNames(styles.Modal, { [styles.Sent]: emailSent })}
    >
      <div className={styles.Body}>
        {emailSent ? (
          <div className={styles.EmailSent}>
            <h3 className={styles.H3}>Email successfully sent</h3>
            <div className={styles.EmailSentSubTitle}>Thanks for reaching out</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(sendEmail)} className={styles.Form}>
            <div className={styles.NameAndEmailContainer}>
              <label className={styles.FormSection}>
                Name
                <input
                  autoComplete="true"
                  className={styles.TextInput}
                  type="text"
                  placeholder="e.g., Paul Maas"
                  {...register('name', { required: true })}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name?.type === 'required' && (
                  <p className={styles.ErrorHelp} role="alert">
                    Name is required
                  </p>
                )}
              </label>
              <label className={styles.FormSection}>
                Email
                <input
                  autoComplete="true"
                  className={styles.TextInput}
                  type="text"
                  placeholder="Enter your email address"
                  {...register('email', {
                    required: true,
                    pattern: emailRegex
                  })}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email?.type === 'required' && (
                  <p className={styles.ErrorHelp} role="alert">
                    Email is required
                  </p>
                )}
                {errors.email?.type === 'pattern' && (
                  <p className={styles.ErrorHelp} role="alert">
                    Please enter a valid email
                  </p>
                )}
              </label>
            </div>
            <label className={styles.FormSection}>
              Message
              <textarea
                className={styles.TextArea}
                {...register('message', { required: true, minLength: 5 })}
                maxLength={2000}
                aria-invalid={errors.message ? 'true' : 'false'}
                placeholder="Enter your message here"
              />
              <div
                className={classNames(styles.TextAreaErrors, {
                  [styles.HasErrors]: !!errors.message
                })}
              >
                {errors.message?.type === 'required' && (
                  <p className={styles.ErrorHelp} role="alert">
                    Message is required
                  </p>
                )}
                {errors.message?.type === 'minLength' && (
                  <p className={styles.ErrorHelp} role="alert">
                    Please include a longer message
                  </p>
                )}
                <p className={styles.Help} role="alert">
                  {`(${message?.length || 0}/2000)`}
                </p>
              </div>
            </label>
          </form>
        )}
      </div>
      <div className={styles.Footer}>
        <button
          aria-label={emailSent ? 'Close' : 'Cancel'}
          className={styles.CancelButton}
          onClick={handleCancel}
        >
          {emailSent ? 'Close' : 'Cancel'}
        </button>
        {!emailSent && (
          <button
            aria-label={isSending ? 'Sending' : 'Send'}
            className={styles.Button}
            disabled={isFormIncomplete || isSending || Object.keys(errors).length > 0}
            onClick={sendEmail}
          >
            {isSending ? 'Sending' : 'Send'}
          </button>
        )}
        {sendFailed && (
          <p className={styles.ErrorHelp} role="alert">
            Email failed to send. Please retry
          </p>
        )}
      </div>
    </Modal>
  );
};
