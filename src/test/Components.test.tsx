import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Navbar } from '../components/Navbar';
import { ApiKeyModal } from '../components/ApiKeyModal';

// Problematic component that triggers an error for ErrorBoundary testing
const ThrowingComponent = () => {
  throw new Error('Test crash for ErrorBoundary');
};

describe('ErrorBoundary Component', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Safe Child Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe Child Content')).toBeInTheDocument();
  });

  it('should catch render errors and display friendly alert recovery UI', () => {
    // Suppress console.error in test output for clean test run
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Test crash for ErrorBoundary/i)).toBeInTheDocument();
    spy.mockRestore();
  });
});

describe('Navbar Component', () => {
  it('should render all navigation tabs', () => {
    const setActiveTab = vi.fn();
    const onOpenModal = vi.fn();
    render(
      <Navbar
        activeTab="analyzer"
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={onOpenModal}
        hasApiKey={false}
      />
    );
    expect(screen.getByText('Document Analyzer')).toBeInTheDocument();
    expect(screen.getByText('Compare Contracts')).toBeInTheDocument();
    expect(screen.getByText('Ask Document')).toBeInTheDocument();
    expect(screen.getByText('Action & Lawyer Prep')).toBeInTheDocument();
    expect(screen.getByText('Legalese Glossary')).toBeInTheDocument();
  });

  it('should trigger setActiveTab when a navigation item is clicked', () => {
    const setActiveTab = vi.fn();
    const onOpenModal = vi.fn();
    render(
      <Navbar
        activeTab="analyzer"
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={onOpenModal}
        hasApiKey={false}
      />
    );
    fireEvent.click(screen.getByText('Compare Contracts'));
    expect(setActiveTab).toHaveBeenCalledWith('comparison');
  });

  it('should trigger onOpenApiKeyModal when API key button is clicked', () => {
    const setActiveTab = vi.fn();
    const onOpenModal = vi.fn();
    render(
      <Navbar
        activeTab="analyzer"
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={onOpenModal}
        hasApiKey={false}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Gemini API Settings/i }));
    expect(onOpenModal).toHaveBeenCalledTimes(1);
  });
});

describe('ApiKeyModal Component', () => {
  it('should render when isOpen is true', () => {
    const onClose = vi.fn();
    const onSave = vi.fn();
    render(
      <ApiKeyModal
        isOpen={true}
        onClose={onClose}
        apiKey=""
        onSaveApiKey={onSave}
      />
    );
    expect(screen.getByText(/Google Gemini API Key/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/AIzaSy/i)).toBeInTheDocument();
  });

  it('should not render content when isOpen is false', () => {
    const onClose = vi.fn();
    const onSave = vi.fn();
    const { container } = render(
      <ApiKeyModal
        isOpen={false}
        onClose={onClose}
        apiKey=""
        onSaveApiKey={onSave}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should allow saving an API key', () => {
    const onClose = vi.fn();
    const onSave = vi.fn();
    render(
      <ApiKeyModal
        isOpen={true}
        onClose={onClose}
        apiKey=""
        onSaveApiKey={onSave}
      />
    );
    const input = screen.getByPlaceholderText(/AIzaSy/i);
    fireEvent.change(input, { target: { value: 'AIzaSyTestApiKey12345' } });
    fireEvent.click(screen.getByText(/Save Key/i));
    expect(onSave).toHaveBeenCalledWith('AIzaSyTestApiKey12345');
    expect(onClose).toHaveBeenCalled();
  });
});
