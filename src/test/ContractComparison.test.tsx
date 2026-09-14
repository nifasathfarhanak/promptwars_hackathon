import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContractComparison } from '../components/ContractComparison';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';

describe('ContractComparison Component', () => {
  it('should render the comparison header and description', () => {
    render(<ContractComparison sampleDocs={SAMPLE_DOCUMENTS} currentDoc={SAMPLE_DOCUMENTS[0]} />);
    expect(screen.getByText(/Side-by-Side Contract Comparison/i)).toBeInTheDocument();
  });

  it('should render Base and Comparative document selectors', () => {
    render(<ContractComparison sampleDocs={SAMPLE_DOCUMENTS} currentDoc={SAMPLE_DOCUMENTS[0]} />);
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBe(2);
  });

  it('should display the Safety Shift analysis badge', () => {
    render(<ContractComparison sampleDocs={SAMPLE_DOCUMENTS} currentDoc={SAMPLE_DOCUMENTS[0]} />);
    expect(screen.getByText(/Overall Risk Reduction Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/SAFETY SHIFT/i)).toBeInTheDocument();
  });

  it('should update comparison when comparative document selector changes', () => {
    render(<ContractComparison sampleDocs={SAMPLE_DOCUMENTS} currentDoc={SAMPLE_DOCUMENTS[0]} />);
    const selects = screen.getAllByRole('combobox');
    const compSelect = selects[1];
    fireEvent.change(compSelect, { target: { value: SAMPLE_DOCUMENTS[2].id } });
    expect(compSelect).toHaveValue(SAMPLE_DOCUMENTS[2].id);
  });
});
