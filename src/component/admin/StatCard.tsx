"use client";
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string;
  percentChange: string;
  subText: string;
  trend: "up" | "down";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentChange,
  subText,
  trend,
}) => {
  const isUp = trend === "up";

  return (
    <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 flex flex-col justify-between hover:border-neutral-300 hover:shadow-md hover:shadow-neutral-200 dark:hover:border-neutral-700 dark:hover:shadow-none transition-all duration-200 group rounded-2xl cursor-pointer">
      {/* Top Row: Title */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-neutral-500 dark:text-neutral-400">
          {title}
        </span>
      </div>

      {/* Main Metric */}
      <div className="my-1">
        <div className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight tabular-nums">
          {value}
        </div>

        {/* Change badge on top, vs last month always on the next line */}
        <div className="flex flex-col items-start gap-1 mt-2">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-wider px-2 py-0.5 whitespace-nowrap rounded ${
              isUp
                ? "bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {isUp ? (
              <TrendingUp size={11} strokeWidth={2.5} />
            ) : (
              <TrendingDown size={11} strokeWidth={2.5} />
            )}
            <span>{percentChange}</span>
            <span className="font-normal opacity-80">{subText}</span>
          </span>

          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
            vs last month
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
