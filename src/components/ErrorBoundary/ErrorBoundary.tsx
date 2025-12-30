import type { ErrorInfo, ReactElement, ReactNode } from "react";
import { Component } from "react";

import styles from "./ErrorBoundary.module.scss";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactElement;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error for debugging purposes
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.ErrorContainer}>
          <div className={styles.ErrorContent}>
            <h3 className={styles.ErrorTitle}>Failed to load viewer</h3>
            <p className={styles.ErrorMessage}>
              There was an error loading this content. Please try selecting a
              different source or refreshing the page.
            </p>
            {this.state.error && (
              <details className={styles.ErrorDetails}>
                <summary>Error details</summary>
                <pre className={styles.ErrorStack}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
