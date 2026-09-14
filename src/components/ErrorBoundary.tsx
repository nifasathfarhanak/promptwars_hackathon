import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Global Error Boundary component that catches unhandled React rendering errors.
 * Prevents the entire app from crashing and displays a user-friendly recovery UI.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error details for debugging (avoids sending sensitive info externally)
    console.error('[LexiGuard Error Boundary]', error, errorInfo.componentStack);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '48px',
          textAlign: 'center',
          gap: '16px',
        }}>
          <AlertTriangle size={48} color="#ef4444" aria-hidden="true" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#64748b', maxWidth: '480px', lineHeight: '1.6' }}>
            An unexpected error occurred while processing your request.
            Your data is safe — no information has been lost.
          </p>
          <code style={{
            background: '#f1f5f9',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            color: '#ef4444',
            maxWidth: '600px',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {this.state.error?.message || 'Unknown error'}
          </code>
          <button
            onClick={this.handleReload}
            aria-label="Try again and recover from error"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '16px',
              padding: '12px 24px',
              background: '#4f46e5',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.95rem',
            }}
          >
            <RefreshCw size={16} aria-hidden="true" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
