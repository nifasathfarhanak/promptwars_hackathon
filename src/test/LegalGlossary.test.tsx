import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LegalGlossary } from '../components/LegalGlossary';

describe('LegalGlossary Component', () => {
  it('should render the glossary heading', () => {
    render(<LegalGlossary />);
    expect(screen.getByText(/Interactive Legalese Glossary/i)).toBeInTheDocument();
  });

  it('should render the search input', () => {
    render(<LegalGlossary />);
    const search = screen.getByPlaceholderText(/Search legal terms/i);
    expect(search).toBeInTheDocument();
  });

  it('should render at least one glossary term card', () => {
    render(<LegalGlossary />);
    expect(screen.getByText('Indemnification')).toBeInTheDocument();
  });

  it('should render the "All" filter button', () => {
    render(<LegalGlossary />);
    expect(screen.getByText('All')).toBeInTheDocument();
  });
});
