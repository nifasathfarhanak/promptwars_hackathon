import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DocumentAnalyzer } from '../components/DocumentAnalyzer';
import { DocumentChat } from '../components/DocumentChat';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';

describe('DocumentAnalyzer Component', () => {
  it('should render the contract risk radar and safety badge', () => {
    const onUpdate = vi.fn();
    render(<DocumentAnalyzer document={SAMPLE_DOCUMENTS[0]} onUpdateDocument={onUpdate} />);
    expect(screen.getByText(/Contract Risk Radar/i)).toBeInTheDocument();
    expect(screen.getByText(/SAFETY/i)).toBeInTheDocument();
  });

  it('should render clause filter chips (All, Red Flags, Warnings)', () => {
    const onUpdate = vi.fn();
    render(<DocumentAnalyzer document={SAMPLE_DOCUMENTS[0]} onUpdateDocument={onUpdate} />);
    expect(screen.getByText(/Filter Clauses:/i)).toBeInTheDocument();
    expect(screen.getByText(/Red Flags 🔴/i)).toBeInTheDocument();
  });

  it('should render the editable document content textarea', () => {
    const onUpdate = vi.fn();
    render(<DocumentAnalyzer document={SAMPLE_DOCUMENTS[0]} onUpdateDocument={onUpdate} />);
    const textarea = screen.getByPlaceholderText(/Paste contract text/i);
    expect(textarea).toBeInTheDocument();
  });

  it('should allow modifying document content and trigger re-analysis', async () => {
    const onUpdate = vi.fn();
    render(<DocumentAnalyzer document={SAMPLE_DOCUMENTS[0]} onUpdateDocument={onUpdate} />);
    const reAnalyzeBtn = screen.getByRole('button', { name: /Re-Analyze/i });
    fireEvent.click(reAnalyzeBtn);
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalled();
    }, { timeout: 1000 });
  });
});

describe('DocumentChat Component', () => {
  it('should render the grounded Q&A heading and grounded badge', () => {
    render(<DocumentChat document={SAMPLE_DOCUMENTS[0]} apiKey="" />);
    expect(screen.getByText(/Ask Your Document — Grounded Q&A/i)).toBeInTheDocument();
    expect(screen.getByText(/Grounded in:/i)).toBeInTheDocument();
  });

  it('should render pre-populated quick question chips', () => {
    render(<DocumentChat document={SAMPLE_DOCUMENTS[0]} apiKey="" />);
    const chips = screen.getAllByRole('button');
    expect(chips.length).toBeGreaterThan(1);
  });

  it('should render the input textbox for asking questions', () => {
    render(<DocumentChat document={SAMPLE_DOCUMENTS[0]} apiKey="" />);
    const input = screen.getByPlaceholderText(/Ask a question about this contract/i);
    expect(input).toBeInTheDocument();
  });
});
