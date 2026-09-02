"use client";
import React, { useState, useMemo } from "react";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  total: number;
  timestamp: number;
  date: string; // YYYY-MM-DD
  items?: OrderItem[];
}

export interface RevenueChartProps {
  orders?: OrderRecord[];
  defaultTimeframe?: "30D" | "6M" | "1Y";
  loading?: boolean;
}

const MONTH_NAMES = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export const RevenueChart: React.FC<RevenueChartProps> = ({
  orders = [],
  defaultTimeframe = "6M",
  loading = false,
}) => {
  const [timeframe, setTimeframe] = useState<"30D" | "6M" | "1Y">(
    defaultTimeframe,
  );
  const [activeBar, setActiveBar] = useState<number | null>(null);

  // Compute real data for each timeframe from orders
  const timeframeData = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-11
    const currentDay = now.getDate();

    // ── 1. 6 Months Data ──
    const sixMonthLabels: string[] = [];
    const sixMonthData: number[] = [];

    for (let i = 5; i >= 0; i--) {
      let targetMonth = currentMonth - i;
      let targetYear = currentYear;
      if (targetMonth < 0) {
        targetMonth += 12;
        targetYear -= 1;
      }
      sixMonthLabels.push(MONTH_NAMES[targetMonth]);

      // Sum orders for this month & year
      const monthSum = orders.reduce((sum, o) => {
        const d = new Date(o.timestamp || o.date);
        if (d.getFullYear() === targetYear && d.getMonth() === targetMonth) {
          return sum + (Number(o.total) || 0);
        }
        return sum;
      }, 0);

      sixMonthData.push(monthSum);
    }
    const sixMonthTotal = sixMonthData.reduce((s, v) => s + v, 0);

    // ── 2. 30 Days (4 Weeks) Data ──
    const thirtyDayLabels = ["W1", "W2", "W3", "W4"];
    const thirtyDayData = [0, 0, 0, 0];
    const nowMs = now.getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;

    orders.forEach((o) => {
      const orderTime = new Date(o.timestamp || o.date).getTime();
      const diffDays = Math.floor((nowMs - orderTime) / oneDayMs);
      const val = Number(o.total) || 0;

      if (diffDays <= 7) {
        thirtyDayData[3] += val; // W4 (Last 7 days)
      } else if (diffDays <= 14) {
        thirtyDayData[2] += val; // W3 (8-14 days ago)
      } else if (diffDays <= 21) {
        thirtyDayData[1] += val; // W2 (15-21 days ago)
      } else if (diffDays <= 30) {
        thirtyDayData[0] += val; // W1 (22-30 days ago)
      }
    });
    const thirtyDayTotal = thirtyDayData.reduce((s, v) => s + v, 0);

    // ── 3. 1 Year (6 Quarters) Data ──
    const currentQ = Math.floor(currentMonth / 3) + 1; // 1-4
    const oneYearLabels: string[] = [];
    const oneYearData: number[] = [];

    for (let i = 5; i >= 0; i--) {
      let q = currentQ - i;
      let yr = currentYear;
      while (q <= 0) {
        q += 4;
        yr -= 1;
      }
      const label = `Q${q} '${String(yr).slice(-2)}`;
      oneYearLabels.push(label);

      // Quarter month range: Q1: 0-2, Q2: 3-5, Q3: 6-8, Q4: 9-11
      const startM = (q - 1) * 3;
      const endM = startM + 2;

      const qSum = orders.reduce((sum, o) => {
        const d = new Date(o.timestamp || o.date);
        const oYr = d.getFullYear();
        const oM = d.getMonth();
        if (oYr === yr && oM >= startM && oM <= endM) {
          return sum + (Number(o.total) || 0);
        }
        return sum;
      }, 0);

      oneYearData.push(qSum);
    }
    const oneYearTotal = oneYearData.reduce((s, v) => s + v, 0);

    return {
      "6M": {
        labels: sixMonthLabels,
        data: sixMonthData,
        total: sixMonthTotal,
        growth: sixMonthTotal > 0 ? "+100%" : "+0%",
      },
      "30D": {
        labels: thirtyDayLabels,
        data: thirtyDayData,
        total: thirtyDayTotal,
        growth: thirtyDayTotal > 0 ? "+100%" : "+0%",
      },
      "1Y": {
        labels: oneYearLabels,
        data: oneYearData,
        total: oneYearTotal,
        growth: oneYearTotal > 0 ? "+100%" : "+0%",
      },
    };
  }, [orders]);

  const current = timeframeData[timeframe];
  const max = Math.max(...current.data, 1);
  const W = 520;
  const H = 140;
  const barCount = current.labels.length;
  const barW = barCount <= 4 ? 44 : 32;
  const gap = (W - barCount * barW) / (barCount + 1);

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 flex flex-col justify-center items-center min-h-[260px] h-full rounded-2xl">
        <div className="w-6 h-6 border-2 border-black dark:border-white border-t-transparent animate-spin rounded-full mb-2" />
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">
          Loading Analytics…
        </span>
      </div>
    ); 
  }

  return (
    <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 flex flex-col justify-between h-full rounded-2xl hover:shadow-md hover:shadow-neutral-200 dark:hover:shadow-none transition-all duration-200 cursor-pointer">
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
              Revenue Analytics
            </span>
            <span className="text-[10px] font-bold text-black dark:text-white bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
              {current.growth}
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight tabular-nums">
            €{current.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-3 text-[10px] font-bold tracking-wider uppercase text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-black dark:bg-white rounded-xs" /> Sales
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-xs" /> Volume
            </span>
          </div>

          <div className="flex items-center border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-0.5 rounded-lg">
            {(["30D", "6M", "1Y"] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-[9px] font-bold tracking-[0.15em] uppercase transition-colors cursor-pointer rounded-md ${
                  timeframe === tf
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
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
            const hasData = val > 0;
            const barH = hasData ? Math.max(8, (val / max) * H) : 4;
            const x = gap + i * (barW + gap);
            const y = H - barH;
            const isHighest = hasData && val === max;
            const isHovered = activeBar === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setActiveBar(i)}
                onMouseLeave={() => setActiveBar(null)}
                className="cursor-pointer transition-opacity"
              >
                {/* Secondary column / background shadow bar */}
                {hasData && (
                  <rect
                    x={x + 4}
                    y={y + 6}
                    width={barW - 8}
                    height={Math.max(0, barH - 6)}
                    rx={2}
                    className="fill-neutral-200 dark:fill-neutral-800"
                  />
                )}

                {/* Main bar */}
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={barH}
                  rx={3}
                  className={`transition-colors ${
                    !hasData
                      ? "fill-neutral-200 dark:fill-neutral-800"
                      : isHovered || isHighest
                        ? "fill-black dark:fill-white"
                        : "fill-neutral-400 dark:fill-neutral-600 hover:fill-black dark:hover:fill-white"
                  }`}
                />

                {/* Amount tooltip above bar */}
                {(isHovered || (isHighest && hasData)) && (
                  <text
                    x={x + barW / 2}
                    y={y - 8}
                    textAnchor="middle"
                    fontSize={9}
                    className="fill-black dark:fill-white font-bold"
                    letterSpacing={0.5}
                  >
                    €{val.toFixed(2)}
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
