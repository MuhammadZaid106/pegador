"use client";
import React, { useMemo } from "react";
import { Product } from "@/data";
import collectionsDataRaw from "@/data/collectionsData.json";

export interface CategoryDistributionProps {
  products: Product[];
}

export const CategoryDistribution: React.FC<CategoryDistributionProps> = ({
  products,
}) => {
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      const cat = p.category ? p.category.toUpperCase() : "OTHER";
      map[cat] = (map[cat] || 0) + 1;
    });
    return map;
  }, [products]);

  const total = products.length || 1;
  const cats = Object.keys(counts);

  const SHADES = [
    { light: "#000000", dark: "#ffffff" },
    { light: "#525252", dark: "#a3a3a3" },
    { light: "#8c8c8c", dark: "#525252" },
    { light: "#cccccc", dark: "#262626" },
  ];

  const topCats = cats.slice(0, 3);
  const data = topCats.map((cat, i) => {
    const count = counts[cat];
    const pct = Math.round((count / total) * 100);
    return {
      label: cat,
      count,
      pct,
      color: SHADES[i] || SHADES[SHADES.length - 1],
    };
  });

  if (cats.length > 3) {
    const otherCount = cats.slice(3).reduce((s, c) => s + counts[c], 0);
    const otherPct = Math.max(0, 100 - data.reduce((s, d) => s + d.pct, 0));
    data.push({
      label: "OTHER",
      count: otherCount,
      pct: otherPct,
      color: SHADES[3],
    });
  }

  // SVG Geometry
  const cx = 60;
  const cy = 60;
  const r = 40;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * r;
  let cumulativePct = 0;

  const slices = data.map((d) => {
    const dashLength = (d.pct / 100) * circumference;
    const gapLength = circumference - dashLength;
    const strokeDashoffset = -((cumulativePct / 100) * circumference);
    cumulativePct += d.pct;
    return {
      ...d,
      dashLength,
      gapLength,
      strokeDashoffset,
    };
  });

  return (
    <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-5 md:p-6 flex flex-col justify-between h-full rounded-2xl hover:shadow-xl  cursor-pointer">
      <div>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-1">
          Categories
        </p>
        <h3 className="text-[15px] font-bold text-black dark:text-white mb-6">
          Distribution
        </h3>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Donut Graphic */}
          <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28">
            <svg
              viewBox="0 0 120 120"
              className="w-full h-full transform -rotate-90"
            >
              {/* Background circle track */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                strokeWidth={strokeWidth}
                className="stroke-neutral-100 dark:stroke-neutral-900"
              />

              {/* Light mode slices */}
              {slices.map((s, i) => (
                <circle
                  key={`light-${i}`}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  strokeWidth={strokeWidth}
                  stroke={s.color.light}
                  strokeDasharray={`${s.dashLength} ${s.gapLength}`}
                  strokeDashoffset={s.strokeDashoffset}
                  className="transition-all duration-500 dark:hidden"
                />
              ))}

              {/* Dark mode slices */}
              {slices.map((s, i) => (
                <circle
                  key={`dark-${i}`}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  strokeWidth={strokeWidth}
                  stroke={s.color.dark}
                  strokeDasharray={`${s.dashLength} ${s.gapLength}`}
                  strokeDashoffset={s.strokeDashoffset}
                  className="transition-all duration-500 hidden dark:block"
                />
              ))}
            </svg>

            {/* Centered label inside donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[13px] font-bold text-black dark:text-white tabular-nums leading-none">
                100%
              </span>
              <span className="text-[7px] font-bold tracking-[0.15em] text-neutral-400 dark:text-neutral-500 mt-1 uppercase">
                Products
              </span>
            </div>
          </div>

          {/* Legend list */}
          <div className="flex flex-col gap-2.5 flex-1 min-w-0">
            {data.map((d) => (
              <div
                key={d.label}
                className="flex items-center justify-between gap-2 min-w-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2 h-2 shrink-0 dark:hidden"
                    style={{ background: d.color.light }}
                  />
                  <span
                    className="w-2 h-2 shrink-0 hidden dark:block"
                    style={{ background: d.color.dark }}
                  />
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-600 dark:text-neutral-400 truncate">
                    {d.label}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-black dark:text-white tabular-nums shrink-0 ml-1">
                  {d.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-900 flex flex-col gap-2">
        <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.18em] uppercase">
          <span className="text-neutral-400 dark:text-neutral-500">
            Collections
          </span>
          <span className="text-black dark:text-white tabular-nums">
            {collectionsDataRaw.length}
          </span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.18em] uppercase">
          <span className="text-neutral-400 dark:text-neutral-500">
            Categories
          </span>
          <span className="text-black dark:text-white tabular-nums">
            {cats.length || 3}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryDistribution;
