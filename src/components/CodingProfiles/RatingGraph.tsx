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
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  if (!points || points.length === 0) {
    return (
      <div className="w-full h-44 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-xs font-mono text-[#D7E2EA]/40">
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

  // Subtle Area fill path
  const firstX = coords[0].x;
  const lastX = coords[coords.length - 1].x;
  const baselineY = padTop + chartHeight;
  const areaPath = `${linePath} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;

  // Grid tick marks (3 horizontal guidelines)
  const midRating = Math.round((minRating + maxRating) / 2 / 50) * 50;
  const gridTicks = [
    { value: maxRating, y: getY(maxRating) },
    { value: midRating, y: getY(midRating) },
    { value: minRating, y: getY(minRating) },
  ];

  return (
    <div className="relative w-full select-none">
      <div className="relative w-full overflow-x-auto pb-1">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible block"
          style={{ minWidth: '400px' }}
        >
          <defs>
            <linearGradient id={`area-grad-${accentColor.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.12" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines & axis labels */}
          {gridTicks.map((tick, idx) => (
            <g key={idx}>
              <line
                x1={padLeft}
                y1={tick.y}
                x2={svgWidth - padRight}
                y2={tick.y}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={padLeft - 10}
                y={tick.y + 3.5}
                textAnchor="end"
                className="text-[10px] font-mono fill-[#D7E2EA]/35"
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
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />

          {/* Area fill */}
          <path d={areaPath} fill={`url(#area-grad-${accentColor.replace('#', '')})`} />

          {/* Line path */}
          <path
            d={linePath}
            fill="none"
            stroke={accentColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {coords.map((item, idx) => {
            const isHovered = hoveredPoint?.id === item.point.id;
            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => {
                  setHoveredPoint(item.point);
                  setHoverPos({ x: item.x, y: item.y });
                }}
                onMouseLeave={() => {
                  setHoveredPoint(null);
                  setHoverPos(null);
                }}
                onClick={() => {
                  setHoveredPoint(item.point);
                  setHoverPos({ x: item.x, y: item.y });
                }}
              >
                {/* Generous hit area for easy hover on mobile and desktop */}
                <circle cx={item.x} cy={item.y} r="14" fill="transparent" />

                {/* Point circle */}
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={isHovered ? '5' : '3'}
                  fill="#0D0E12"
                  stroke={accentColor}
                  strokeWidth={isHovered ? '2.5' : '1.5'}
                  className="transition-all duration-150"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Tooltip */}
      {hoveredPoint && hoverPos && (
        <div
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#12141A]/95 backdrop-blur-md shadow-2xl text-left transition-all duration-150"
          style={{
            left: `${(hoverPos.x / svgWidth) * 100}%`,
            top: `${(hoverPos.y / svgHeight) * 100}%`,
            minWidth: '180px',
            maxWidth: '260px',
          }}
        >
          <div className="flex items-start justify-between gap-2 border-b border-white/[0.08] pb-1.5 mb-1.5">
            <span className="text-[11px] font-medium text-[#D7E2EA] line-clamp-2 leading-tight">
              {hoveredPoint.title}
            </span>
          </div>

          <div className="space-y-1 text-xs font-mono">
            <div className="flex items-center justify-between text-[#D7E2EA]/60">
              <span>Rating:</span>
              <div className="flex items-center gap-1.5">
                {hoveredPoint.oldRating !== undefined && (
                  <span className="text-[#D7E2EA]/40">{hoveredPoint.oldRating} →</span>
                )}
                <span className="font-bold text-[#D7E2EA]">{hoveredPoint.rating}</span>
                {hoveredPoint.delta !== undefined && (
                  <span
                    className={
                      hoveredPoint.delta >= 0
                        ? 'text-emerald-400 font-semibold'
                        : 'text-rose-400 font-semibold'
                    }
                  >
                    ({hoveredPoint.delta >= 0 ? `+${hoveredPoint.delta}` : hoveredPoint.delta})
                  </span>
                )}
              </div>
            </div>

            {hoveredPoint.rank !== undefined && (
              <div className="flex items-center justify-between text-[#D7E2EA]/60">
                <span>Rank:</span>
                <span className="font-semibold" style={{ color: accentColor }}>
                  #{hoveredPoint.rank}
                </span>
              </div>
            )}

            {hoveredPoint.date && (
              <div className="flex items-center justify-between text-[#D7E2EA]/40 text-[10px] pt-0.5">
                <span>Date:</span>
                <span>{hoveredPoint.date}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingGraph;
