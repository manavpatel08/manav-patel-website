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
    targetEl.id = 'services';
    targetEl.scrollIntoView = vi.fn();
    document.body.appendChild(targetEl);

    render(<ScrollWayfinding />);

    const servicesButton = screen.getByRole('button', { name: /jump to services/i });
    fireEvent.click(servicesButton);

    expect(targetEl.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(targetEl);
  });

  it('SectionTransition renders connector label, icons, and section names', () => {
    render(
      <SectionTransition
        from="03 / PROJECTS"
        to="04 / SKILLS"
        label="PRODUCTION SYSTEMS → TECHNICAL PROFICIENCIES"
        type="technology"
      />
    );

    expect(screen.getByText('03 / PROJECTS')).toBeInTheDocument();
    expect(screen.getByText('04 / SKILLS')).toBeInTheDocument();
    expect(screen.getByText('PRODUCTION SYSTEMS → TECHNICAL PROFICIENCIES')).toBeInTheDocument();
  });

  it('Footer renders solid deep charcoal background, LinkedIn, GitHub, Email, and exact Resume URL', () => {
    const { container } = render(<Footer />);

    const footerEl = container.querySelector('footer');
    expect(footerEl).toBeInTheDocument();
    expect(footerEl).toHaveClass('bg-[#141413]');

    // Tagline & descriptor
    expect(screen.getByText(/building systems that scale, think, and perform/i)).toBeInTheDocument();
    expect(screen.getByText(/software engineering · backend systems · architecture/i)).toBeInTheDocument();

    // LinkedIn link
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', profile.linkedin);

    // GitHub link
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', profile.github);

    // Email link
    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.getAttribute('href')).toContain(`mailto:${profile.email}`);

    // Resume button
    const resumeLink = screen.getByRole('link', { name: /resume/i });
    expect(resumeLink).toHaveAttribute('href', profile.resumeUrl);
    expect(resumeLink).toHaveAttribute('target', '_blank');

    // Copyright & Back to top button
    expect(screen.getByText(/© 2026 Manav Patel/i)).toBeInTheDocument();
    const backToTop = screen.getByRole('button', { name: /back to top/i });
    expect(backToTop).toBeInTheDocument();
  });
});
