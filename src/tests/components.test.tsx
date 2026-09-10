import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollWayfinding from '../components/ScrollWayfinding';
import SectionTransition from '../components/SectionTransition';
import Footer from '../sections/Footer';
import { profile } from '../data/resumeData';

describe('Wayfinding & Transition Components', () => {
  it('ScrollWayfinding renders step counter and jump dots for all 7 sections', () => {
    render(<ScrollWayfinding />);

    // Step counter shows 07 total sections
    expect(screen.getByText('07')).toBeInTheDocument();
    expect(screen.getByText('/' )).toBeInTheDocument();

    // 7 navigation jump buttons
    const buttons = screen.getAllByRole('button', { name: /jump to/i });
    expect(buttons).toHaveLength(7);
  });

  it('clicking a jump dot in ScrollWayfinding smoothly scrolls to the target section', () => {
    // Create target element in DOM
    const targetEl = document.createElement('div');
    targetEl.id = 'scope';
    targetEl.scrollIntoView = vi.fn();
    document.body.appendChild(targetEl);

    render(<ScrollWayfinding />);

    const scopeButton = screen.getByRole('button', { name: /jump to scope/i });
    fireEvent.click(scopeButton);

    expect(targetEl.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(targetEl);
  });

  it('SectionTransition renders connector label, icons, and section names', () => {
    render(
      <SectionTransition
        from="05 / SERVICES"
        to="06 / SCOPE"
        label="DELIVERED SOLUTIONS → ENGAGEMENT & SLAs"
        type="engagement"
      />
    );

    expect(screen.getByText('05 / SERVICES')).toBeInTheDocument();
    expect(screen.getByText('06 / SCOPE')).toBeInTheDocument();
    expect(screen.getByText('DELIVERED SOLUTIONS → ENGAGEMENT & SLAs')).toBeInTheDocument();
  });

  it('Footer renders solid deep charcoal background, Hire Me CTA, and exact Resume URL', () => {
    const { container } = render(<Footer />);

    const footerEl = container.querySelector('footer');
    expect(footerEl).toBeInTheDocument();
    expect(footerEl).toHaveClass('bg-[#141413]');

    // Statement
    expect(screen.getByText(/building systems that scale with clarity/i)).toBeInTheDocument();

    // Hire Me CTA
    const hireMe = screen.getByRole('link', { name: /hire me/i });
    expect(hireMe).toBeInTheDocument();
    expect(hireMe.getAttribute('href')).toContain(`mailto:${profile.email}`);

    // Resume button
    const resumeLink = screen.getByRole('link', { name: /resume/i });
    expect(resumeLink).toHaveAttribute('href', profile.resumeUrl);
    expect(resumeLink).toHaveAttribute('target', '_blank');

    // Back to top button
    const backToTop = screen.getByRole('button', { name: /scroll back to top/i });
    expect(backToTop).toBeInTheDocument();
  });
});
