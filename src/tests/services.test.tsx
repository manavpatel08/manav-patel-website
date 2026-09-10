import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServicesSection from '../sections/ServicesSection';
import { servicesData, profile } from '../data/resumeData';

describe('Services Section (06 — SERVICES)', () => {
  it('renders section with id="services" and heading with "06 / WHAT I BUILD"', () => {
    const { container } = render(<ServicesSection />);
    const section = container.querySelector('#services');
    expect(section).toBeInTheDocument();

    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('06 / WHAT I BUILD')).toBeInTheDocument();
  });

  it('renders all 4 concise service cards with descriptions and capabilities', () => {
    render(<ServicesSection />);

    servicesData.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
      service.scope.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });
  });

  it('renders final CTA banner "LET\'S BUILD SOMETHING USEFUL."', () => {
    render(<ServicesSection />);

    expect(screen.getByText("LET'S BUILD SOMETHING USEFUL.")).toBeInTheDocument();
    expect(
      screen.getByText('Have a system, product, or engineering problem worth solving?')
    ).toBeInTheDocument();
  });

  it('provides a direct HIRE ME button with proper mailto to patelmanav0805@gmail.com', () => {
    render(<ServicesSection />);

    const hireMeBtn = screen.getByRole('link', { name: /hire me/i });
    expect(hireMeBtn).toBeInTheDocument();
    expect(hireMeBtn.getAttribute('href')).toContain(`mailto:${profile.email}`);
    expect(hireMeBtn.getAttribute('href')).toContain('Engineering%20Opportunity');
  });

  it('provides a VIEW RESUME button pointing to the verified profile.resumeUrl', () => {
    render(<ServicesSection />);

    const resumeBtn = screen.getByRole('link', { name: /view resume/i });
    expect(resumeBtn).toBeInTheDocument();
    expect(resumeBtn).toHaveAttribute('href', profile.resumeUrl);
    expect(resumeBtn).toHaveAttribute('target', '_blank');
    expect(resumeBtn).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
