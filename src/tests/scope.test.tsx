import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScopeSection from '../sections/ScopeSection';
import { scopeData, profile } from '../data/resumeData';

describe('Scope Section (06 — SCOPE)', () => {
  it('renders section with id="scope" and correct section heading and tag', () => {
    const { container } = render(<ScopeSection />);
    const section = container.querySelector('#scope');
    expect(section).toBeInTheDocument();

    expect(screen.getByText('Scope & Deliverables')).toBeInTheDocument();
    expect(screen.getByText('06 / ENGAGEMENT BOUNDARIES')).toBeInTheDocument();
  });

  it('renders all 3 engagement models with deliverables and badges', () => {
    render(<ScopeSection />);

    scopeData.models.forEach((model) => {
      expect(screen.getByText(model.title)).toBeInTheDocument();
      expect(screen.getByText(model.tagline)).toBeInTheDocument();
      expect(screen.getByText(model.badge)).toBeInTheDocument();

      model.deliverables.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });
  });

  it('renders architectural guarantees and SLA matrix', () => {
    render(<ScopeSection />);

    expect(screen.getByText(/engineering hygiene built in by default/i)).toBeInTheDocument();
    
    scopeData.standards.forEach((std) => {
      expect(screen.getByText(std.label)).toBeInTheDocument();
      expect(screen.getByText(std.value)).toBeInTheDocument();
      expect(screen.getByText(std.detail)).toBeInTheDocument();
    });
  });

  it('provides a direct View Resume CTA pointing to profile.resumeUrl', () => {
    render(<ScopeSection />);

    const resumeLink = screen.getByRole('link', { name: /view resume/i });
    expect(resumeLink).toBeInTheDocument();
    expect(resumeLink).toHaveAttribute('href', profile.resumeUrl);
    expect(resumeLink).toHaveAttribute('target', '_blank');
    expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('provides an Initiate Contact CTA scrolling to #contact', () => {
    render(<ScopeSection />);

    const contactLink = screen.getByRole('link', { name: /initiate contact/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '#contact');
  });
});
