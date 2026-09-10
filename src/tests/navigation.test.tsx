import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { navLinks, profile } from '../data/resumeData';

describe('Navigation System & Header', () => {
  it('navLinks data strictly follows the 7-section structure', () => {
    expect(navLinks).toEqual([
      'About',
      'Experience',
      'Projects',
      'Skills',
      'Services',
      'Scope',
      'Contact',
    ]);
  });

  it('renders all 7 navigation links in the desktop header in strict order', () => {
    render(<Navbar />);
    
    // Check brand logo
    expect(screen.getByText('MANAV PATEL')).toBeInTheDocument();

    // Verify all 7 links exist
    navLinks.forEach((link) => {
      const desktopLinks = screen.getAllByRole('link', { name: new RegExp(link, 'i') });
      expect(desktopLinks.length).toBeGreaterThan(0);
      expect(desktopLinks[0]).toHaveAttribute('href', `#${link.toLowerCase()}`);
    });
  });

  it('renders a prominent but minimal Resume button pointing to the exact configured resumeUrl', () => {
    render(<Navbar />);
    
    const resumeLinks = screen.getAllByRole('link', { name: /resume/i });
    expect(resumeLinks.length).toBeGreaterThan(0);

    // Desktop header resume button
    const headerResume = resumeLinks[0];
    expect(headerResume).toHaveAttribute('href', profile.resumeUrl);
    expect(headerResume).toHaveAttribute('target', '_blank');
    expect(headerResume).toHaveAttribute('rel', 'noopener noreferrer');
    expect(profile.resumeUrl).toMatch(/^https:\/\/drive\.google\.com/);
  });

  it('opens mobile menu and displays all 7 links plus Resume button', () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(toggleButton).toBeInTheDocument();

    // Open mobile menu
    fireEvent.click(toggleButton);

    // Verify all 7 links are displayed in the mobile overlay
    navLinks.forEach((link) => {
      const matchingLinks = screen.getAllByRole('link', { name: new RegExp(link, 'i') });
      // Should exist for desktop and mobile
      expect(matchingLinks.length).toBeGreaterThanOrEqual(2);
    });

    // Verify Open Resume PDF button is in mobile drawer
    expect(screen.getByText(/open resume \(pdf\)/i)).toBeInTheDocument();
  });
});
