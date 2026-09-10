import React, { useState } from 'react';
import type { GraphPoint } from '../../types/coding';

interface RatingGraphProps {
  points: GraphPoint[];
  accentColor: string;
  minYPadding?: number;
  height?: number;
}

export const RatingGraph: React.FC<RatingGraphProps> = ({
  points,
  accentColor,
  minYPadding = 60,
  height = 200,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<GraphPoint | null>(null);
  const [pinnedPoint, setPinnedPoint] = useState<GraphPoint | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [pinnedPos, setPinnedPos] = useState<{ x: number; y: number } | null>(null);

  const activePoint = hoveredPoint || pinnedPoint;
  const activePos = hoveredPoint ? hoverPos : pinnedPos;

  if (!points || points.length === 0) {
    return (
      <div className="w-full h-44 rounded-xl bg-[#F7F6F2] border border-black/8 flex items-center justify-center text-xs font-mono text-[#57606A]">
        No rating history available
      </div>
    );
  }

  // Dimensions
  const svgWidth = 600;
  const svgHeight = height;
  const padLeft = 46;
  const padRight = 24;
  const padTop = 26;
  const padBottom = 32;

  const chartWidth = svgWidth - padLeft - padRight;
  const chartHeight = svgHeight - padTop - padBottom;

  const ratings = points.map((p) => p.rating);
  const minRaw = Math.min(...ratings);
  const maxRaw = Math.max(...ratings);

  const minRating = Math.floor((minRaw - minYPadding) / 50) * 50;
  const maxRating = Math.ceil((maxRaw + minYPadding) / 50) * 50;
  const ratingSpan = Math.max(maxRating - minRating, 100);

  // Helper coordinate mappers
  const getX = (index: number) => {
    if (points.length === 1) return padLeft + chartWidth / 2;
    return padLeft + (index / (points.length - 1)) * chartWidth;
  };

  const getY = (rating: number) => {
    const fraction = (rating - minRating) / ratingSpan;
    return padTop + chartHeight - fraction * chartHeight;
  };

  // Build SVG Path
  const coords = points.map((p, i) => ({ x: getX(i), y: getY(p.rating), point: p }));

  const linePath = coords.reduce((acc, curr, i) => {
    if (i === 0) return `M ${curr.x} ${curr.y}`;
    return `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const baselineY = padTop + chartHeight;

  // Grid tick marks (3 horizontal guidelines)
  const midRating = Math.round((minRating + maxRating) / 2 / 50) * 50;
  const gridTicks = [
    { value: maxRating, y: getY(maxRating) },
    { value: midRating, y: getY(midRating) },
    { value: minRating, y: getY(minRating) },
  ];

  return (
    <div className="relative w-full select-none">
      <div className="relative w-full overflow-visible pb-1">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible block"
        >
          {/* Grid lines & axis labels */}
          {gridTicks.map((tick, idx) => (
            <g key={idx}>
              <line
                x1={padLeft}
                y1={tick.y}
                x2={svgWidth - padRight}
                y2={tick.y}
                stroke="rgba(23, 23, 23, 0.08)"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={padLeft - 8}
                y={tick.y + 3.5}
                textAnchor="end"
                className="text-[10px] font-mono fill-[#8C959F]"
              >
                {tick.value}
              </text>
            </g>
          ))}

          {/* Base X Axis line */}
          <line
            x1={padLeft}
            y1={baselineY}
            x2={svgWidth - padRight}
            y2={baselineY}
            stroke="rgba(23, 23, 23, 0.12)"
            strokeWidth="1"
          />

          {/* Solid line path (ZERO GRADIENTS) */}
          <path
            d={linePath}
            fill="none"
            stroke={accentColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {coords.map((item, idx) => {
            const isActive = activePoint?.id === item.point.id;
            return (
              <g
                key={idx}
                className="cursor-pointer"
                data-testid={`graph-point-${idx}`}
                onMouseEnter={() => {
                  setHoveredPoint(item.point);
                  setHoverPos({ x: item.x, y: item.y });
                }}
                onMouseLeave={() => {
                  setHoveredPoint(null);
                  setHoverPos(null);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (pinnedPoint?.id === item.point.id) {
                    setPinnedPoint(null);
                    setPinnedPos(null);
                  } else {
                    setPinnedPoint(item.point);
                    setPinnedPos({ x: item.x, y: item.y });
                  }
                }}
              >
                {/* Hit target */}
                <circle
                  cx={item.x}
                  cy={item.y}
                  r="18"
                  fill="rgba(0,0,0,0.001)"
                  style={{ pointerEvents: 'all' }}
                />

                {/* Visible Point */}
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={isActive ? 6 : 3.5}
                  fill={accentColor}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover / Click Tooltip (Solid Surface, High Contrast, Clamped & Boundary-Aware) */}
        {activePoint && activePos && (() => {
          const topPercent = (activePos.y / svgHeight) * 100;
          const leftPercent = (activePos.x / svgWidth) * 100;
          
          // If point is in the top 50% of the SVG, show tooltip BELOW the point; otherwise ABOVE
          const isNearTop = topPercent < 50;
          
          // Horizontal alignment to prevent clipping on left or right edges
          const isNearLeft = leftPercent < 22;
          const isNearRight = leftPercent > 78;

          const xTransform = isNearLeft ? '0%' : isNearRight ? '-100%' : '-50%';
          const yTransform = isNearTop ? '14px' : 'calc(-100% - 14px)';

          return (
            <div
              className="absolute z-30 pointer-events-none rounded-xl bg-white border border-black/15 shadow-xl p-3 text-left transition-all duration-100 min-w-[210px] max-w-[260px]"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: `translate(${xTransform}, ${yTransform})`,
              }}
            >
              <p className="text-xs font-bold text-[#141413] line-clamp-1 mb-1">
                {activePoint.title}
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#57606A] mb-1.5">
                <span>Rating: <strong className="text-[#141413] font-bold">{activePoint.rating}</strong></span>
                {activePoint.delta !== undefined && (
                  <span
                    className={`font-bold font-mono px-1.5 py-0.5 rounded text-[10px] ${
                      activePoint.delta >= 0 
                        ? 'bg-[#3F6E50]/10 text-[#3F6E50]' 
                        : 'bg-[#BD5338]/10 text-[#BD5338]'
                    }`}
                  >
                    {activePoint.delta >= 0
                      ? `+${activePoint.delta}`
                      : activePoint.delta}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8C959F] border-t border-black/5 pt-1.5">
                <span>Rank: #{activePoint.rank}</span>
                <span>{activePoint.date}</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Axis Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#8C959F] px-4 pt-1">
        <span>Earliest Recorded</span>
        <span>Most Recent Contest</span>
      </div>
    </div>
  );
};

export default RatingGraph;
