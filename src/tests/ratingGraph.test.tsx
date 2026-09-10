import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RatingGraph from '../components/CodingProfiles/RatingGraph';
import type { GraphPoint } from '../types/coding';

const mockPoints: GraphPoint[] = [
  {
    id: 101,
    title: 'Codeforces Round 1100',
    date: 'Jan 10, 2026',
    rating: 1400,
    oldRating: 1350,
    delta: 50,
    rank: 600,
  },
  {
    id: 102,
    title: 'Codeforces Round 1105',
    date: 'Feb 15, 2026',
    rating: 1550,
    oldRating: 1400,
    delta: 150,
    rank: 450,
  },
  {
    id: 103,
    title: 'Codeforces Round 1114',
    date: 'Mar 20, 2026',
    rating: 1629,
    oldRating: 1550,
    delta: 79,
    rank: 320,
  },
];

describe('RatingGraph Component & Tooltip Boundary Safety', () => {
  it('renders rating graph with axis labels and data points', () => {
    const { container } = render(
      <RatingGraph points={mockPoints} accentColor="#3B76A6" />
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    const pointElements = screen.getAllByTestId(/^graph-point-/);
    expect(pointElements).toHaveLength(mockPoints.length);
  });

  it('renders "No rating history available" when points array is empty', () => {
    render(<RatingGraph points={[]} accentColor="#3B76A6" />);
    expect(screen.getByText('No rating history available')).toBeInTheDocument();
  });

  it('pins tooltip when clicking a data point and unpins when clicked again', () => {
    render(<RatingGraph points={mockPoints} accentColor="#3B76A6" />);

    const point2 = screen.getByTestId('graph-point-2');

    // Click to pin tooltip
    fireEvent.click(point2);

    expect(screen.getByText('Codeforces Round 1114')).toBeInTheDocument();
    expect(screen.getByText('1629')).toBeInTheDocument();
    expect(screen.getByText('+79')).toBeInTheDocument();
    expect(screen.getByText('Rank: #320')).toBeInTheDocument();
    expect(screen.getByText('Mar 20, 2026')).toBeInTheDocument();

    // Click again to unpin
    fireEvent.click(point2);
    expect(screen.queryByText('Codeforces Round 1114')).not.toBeInTheDocument();
  });

  it('displays tooltip on mouseEnter and clears on mouseLeave', () => {
    render(<RatingGraph points={mockPoints} accentColor="#3B76A6" />);

    const point0 = screen.getByTestId('graph-point-0');

    fireEvent.mouseEnter(point0);
    expect(screen.getByText('Codeforces Round 1100')).toBeInTheDocument();
    expect(screen.getByText('1400')).toBeInTheDocument();

    fireEvent.mouseLeave(point0);
    expect(screen.queryByText('Codeforces Round 1100')).not.toBeInTheDocument();
  });

  it('applies smart boundary directional flipping to prevent clipping at the top or edges', () => {
    const { container } = render(
      <RatingGraph points={mockPoints} accentColor="#3B76A6" />
    );

    // Click highest peak point (index 2) - should position below the point
    const peakPoint = screen.getByTestId('graph-point-2');
    fireEvent.click(peakPoint);

    const tooltip = container.querySelector('.absolute.z-30') as HTMLElement;
    expect(tooltip).toBeInTheDocument();

    // Highest point is in the upper part of chart, so yTransform should be '14px' (placed below to avoid clipping top)
    expect(tooltip.style.transform).toContain('14px');

    // Click leftmost point (index 0) - should align left edge (0% xTransform) to avoid clipping left
    const leftPoint = screen.getByTestId('graph-point-0');
    fireEvent.click(leftPoint);

    const leftTooltip = container.querySelector('.absolute.z-30') as HTMLElement;
    expect(leftTooltip.style.transform).toContain('translate(0%');
  });
});
