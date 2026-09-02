import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import defaultAnalyticsRaw from "@/data/analyticsData.json";

const SOURCE_FILE = path.join(process.cwd(), "src", "data", "analyticsData.json");
const TMP_FILE = path.join(os.tmpdir(), "analyticsData.json");

interface VisitRecord {
  visitorId: string;
  path: string;
  timestamp: number;
  date: string; // YYYY-MM-DD
}

interface AnalyticsData {
  baselineVisitors?: number;
  baselinePageviews?: number;
  visits: VisitRecord[];
}

let memoryAnalyticsCache: AnalyticsData | null = null;

function getActiveFile(): string {
  try {
    if (fs.existsSync(TMP_FILE)) return TMP_FILE;

    let initialData: AnalyticsData = defaultAnalyticsRaw as AnalyticsData;
    if (fs.existsSync(SOURCE_FILE)) {
      try {
        const raw = fs.readFileSync(SOURCE_FILE, "utf-8");
        initialData = JSON.parse(raw);
      } catch {
        // fallback to default
      }
    }

    fs.writeFileSync(TMP_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return TMP_FILE;
  } catch {
    return SOURCE_FILE;
  }
}

function readAnalytics(): AnalyticsData {
  try {
    const file = getActiveFile();
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf-8");
      const parsed = JSON.parse(raw);
      memoryAnalyticsCache = parsed;
      return parsed;
    }
  } catch (err) {
    console.warn("Could not read analytics file:", err);
  }

  if (memoryAnalyticsCache) return memoryAnalyticsCache;
  memoryAnalyticsCache = defaultAnalyticsRaw as AnalyticsData;
  return defaultAnalyticsRaw as AnalyticsData;
}

function writeAnalytics(data: AnalyticsData) {
  memoryAnalyticsCache = data;

  // 1. Write to /tmp (always writable)
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed writing TMP_FILE for analytics:", err);
  }

  // 2. In local dev, also write to source file if possible
  try {
    if (process.env.NODE_ENV !== "production" && fs.existsSync(SOURCE_FILE)) {
      fs.writeFileSync(SOURCE_FILE, JSON.stringify(data, null, 2), "utf-8");
    }
  } catch {
    // Ignore EROFS
  }
}

// ─── GET: Compute and return real-time metrics ────────────────────────────────
export async function GET() {
  try {
    const data = readAnalytics();
    const visits = data.visits || [];

    // Unique visitors (unique devices)
    const uniqueVisitorIds = new Set(visits.map((v) => v.visitorId));
    const totalUniqueVisitors = Math.max(1, (data.baselineVisitors || 0) + uniqueVisitorIds.size);

    // Total page visits (hits)
    const totalVisitsCount = Math.max(1, (data.baselinePageviews || 0) + visits.length);

    // Today's stats
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayVisits = visits.filter((v) => v.date === todayStr);
    const todayCount = Math.max(1, todayVisits.length);

    return NextResponse.json({
      visitors: totalUniqueVisitors,
      visits: totalVisitsCount,
      pageviews: totalVisitsCount,
      percentChange: "+100%",
      subText: `+${todayCount} today`,
      trend: "up",
      isLive: true,
    });
  } catch (error) {
    console.error("GET /api/analytics error:", error);
    return NextResponse.json({
      visitors: 1,
      visits: 1,
      pageviews: 1,
      percentChange: "+100%",
      subText: "+1 today",
      trend: "up",
      isLive: false,
    });
  }
}

// ─── POST: Record a new visit ─────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { visitorId, path: pagePath } = body;

    if (!visitorId) {
      return NextResponse.json({ error: "visitorId required" }, { status: 400 });
    }

    const data = readAnalytics();
    const now = Date.now();
    const todayStr = new Date(now).toISOString().slice(0, 10);

    const newVisit: VisitRecord = {
      visitorId: String(visitorId),
      path: String(pagePath || "/"),
      timestamp: now,
      date: todayStr,
    };

    // Keep the last 10,000 visit logs
    const updatedVisits = [...(data.visits || []), newVisit].slice(-10000);

    const updatedData: AnalyticsData = {
      baselineVisitors: 0,
      baselinePageviews: 0,
      visits: updatedVisits,
    };

    writeAnalytics(updatedData);

    return NextResponse.json({ success: true, totalVisits: updatedVisits.length });
  } catch (error) {
    console.error("POST /api/analytics error:", error);
    return NextResponse.json({ error: "Failed to record visit" }, { status: 500 });
  }
}
