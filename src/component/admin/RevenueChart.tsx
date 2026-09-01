"use client";
import React, { useState } from "react";

export interface RevenueChartProps {
  defaultTimeframe?: "30D" | "6M" | "1Y";
}

const TIMEFRAMES = {
  "6M": {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
    data: [38, 52, 61, 47, 69, 85],
    total: "€86,400.12",
    growth: "+10%",
  },
  "1Y": {
    labels: ["Q1 '25", "Q2 '25", "Q3 '25", "Q4 '25", "Q1 '26", "Q2 '26"],
    data: [120, 145, 138, 192, 175, 210],
    total: "€980,240.00",
    growth: "+18.4%",
  },
  "30D": {
    labels: ["W1", "W2", "W3", "W4"],
    data: [18, 24, 21, 29],
    total: "€21,850.50",
    growth: "+6.2%",
  },
};

export const RevenueChart: React.FC<RevenueChartProps> = ({
  defaultTimeframe = "6M",
}) => {
  const [timeframe, setTimeframe] = useState<"30D" | "6M" | "1Y">(
    defaultTimeframe,
  );
  const [activeBar, setActiveBar] = useState<number | null>(null);

  const current = TIMEFRAMES[timeframe];
  const max = Math.max(...current.data);
  const W = 520;
  const H = 140;
  const barCount = current.labels.length;
  const barW = barCount <= 4 ? 44 : 32;
  const gap = (W - barCount * barW) / (barCount + 1);

  return (
    <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-5 md:p-6 flex flex-col justify-between h-full rounded-2xl hover:shadow-md hover:shadow-neutral-200 cursor-pointer">
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
              Revenue Analytics
            </span>
            <span className="text-[10px] font-bold text-black dark:text-white bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5">
              {current.growth}
            </span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight tabular-nums">
            {current.total}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-[10px] font-bold tracking-wider uppercase text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-black dark:bg-white " /> Profit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-neutral-200 dark:bg-neutral-800 " />{" "}
              Loss
            </span>
          </div>

          <div className="flex items-center border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-0.5">
            {(["30D", "6M", "1Y"] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-[9px] font-bold tracking-[0.15em] uppercase transition-colors cursor-pointer rounded-2xl ${
                  timeframe === tf
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-neutral-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H + 34}`}
          className="w-full"
          style={{ maxHeight: 180 }}
        >
          {/* Subtle grid line */}
          <line
            x1={0}
            y1={H * 0.5}
            x2={W}
            y2={H * 0.5}
            stroke="currentColor"
            className="text-neutral-100 dark:text-neutral-900"
            strokeWidth={1}
            strokeDasharray="3 3"
          />

          {current.data.map((val, i) => {
            const barH = (val / max) * H;
            const x = gap + i * (barW + gap);
            const y = H - barH;
            const isHighest = val === max;
            const isHovered = activeBar === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setActiveBar(i)}
                onMouseLeave={() => setActiveBar(null)}
                className="cursor-pointer transition-opacity"
              >
                {/* Secondary column */}
                <rect
                  x={x + 4}
                  y={y + 8}
                  width={barW - 8}
                  height={Math.max(0, barH - 8)}
                  className="fill-neutral-200 dark:fill-neutral-800"
                />

                {/* Main bar */}
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={barH}
                  className={`transition-colors ${
                    isHovered || isHighest
                      ? "fill-black dark:fill-white"
                      : "fill-neutral-400 dark:fill-neutral-600 hover:fill-black dark:hover:fill-white"
                  }`}
                />

                {/* Amount tooltip above bar */}
                {(isHovered || isHighest) && (
                  <text
                    x={x + barW / 2}
                    y={y - 8}
                    textAnchor="middle"
                    fontSize={8.5}
                    className="fill-black dark:fill-white font-bold"
                    letterSpacing={0.5}
                  >
                    €{val}K
                  </text>
                )}

                {/* Label */}
                <text
                  x={x + barW / 2}
                  y={H + 22}
                  textAnchor="middle"
                  fontSize={8.5}
                  className={`font-bold tracking-wider ${
                    isHovered
                      ? "fill-black dark:fill-white"
                      : "fill-neutral-400 dark:fill-neutral-500"
                  }`}
                >
                  {current.labels[i]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default RevenueChart;
