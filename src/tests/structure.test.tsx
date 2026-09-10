import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('7-Section Full Page Structure & DOM Sequencing', () => {
  it('renders all 7 sections in the exact required sequence', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const expectedSectionIds = [
      'about',
      'experience',
      'projects',
      'skills',
      'services',
      'scope',
      'contact',
    ];

    const foundElements = expectedSectionIds.map((id) => {
      const el = container.querySelector(`#${id}`);
      expect(el).toBeInTheDocument();
      return el!;
    });

    // Verify DOM order: each element must follow the previous one in the DOM tree
    for (let i = 0; i < foundElements.length - 1; i++) {
      const current = foundElements[i];
      const next = foundElements[i + 1];
      const position = current.compareDocumentPosition(next);
      // Node.DOCUMENT_POSITION_FOLLOWING is 4
      expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it('renders all SectionTransition visual connectors between sections', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const transitions = container.querySelectorAll('[aria-hidden="true"]');
    expect(transitions.length).toBeGreaterThanOrEqual(6);
  });
});
