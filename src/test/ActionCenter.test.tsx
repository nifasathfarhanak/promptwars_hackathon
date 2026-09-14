import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionCenter } from '../components/ActionCenter';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';

describe('ActionCenter Component', () => {
  it('should render the Obligation & Deadline Checklist card', () => {
    render(<ActionCenter document={SAMPLE_DOCUMENTS[0]} />);
    expect(screen.getByText(/Key Obligation & Deadline Checklist/i)).toBeInTheDocument();
  });

  it('should render the Lawyer Consultation Brief card', () => {
    render(<ActionCenter document={SAMPLE_DOCUMENTS[0]} />);
    expect(screen.getByText(/Lawyer Consultation Brief/i)).toBeInTheDocument();
    expect(screen.getByText(/Print \/ Save PDF Brief/i)).toBeInTheDocument();
  });

  it('should render the Counter-Proposal Negotiation Email card', () => {
    render(<ActionCenter document={SAMPLE_DOCUMENTS[0]} />);
    expect(screen.getByText(/Counter-Proposal Negotiation Email Draft/i)).toBeInTheDocument();
    expect(screen.getByText(/Copy Negotiation Draft/i)).toBeInTheDocument();
  });

  it('should allow toggling obligation checklist item status', () => {
    render(<ActionCenter document={SAMPLE_DOCUMENTS[0]} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
    const firstCheckbox = checkboxes[0];
    const initialChecked = (firstCheckbox as HTMLInputElement).checked;
    fireEvent.click(firstCheckbox);
    expect((firstCheckbox as HTMLInputElement).checked).toBe(!initialChecked);
  });

  it('should update client name in the Lawyer Brief when input changes', () => {
    render(<ActionCenter document={SAMPLE_DOCUMENTS[0]} />);
    const nameInput = screen.getByPlaceholderText('Your Name');
    fireEvent.change(nameInput, { target: { value: 'Alex Morgan' } });
    expect(nameInput).toHaveValue('Alex Morgan');
  });
});
