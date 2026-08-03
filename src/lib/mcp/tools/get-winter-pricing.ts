import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const winterPricing = [
  { week: 50, dates: "5/12 - 12/12 2026", priceSek: 6500, status: "Available", note: "Grand opening" },
  { week: 51, dates: "12/12 - 19/12 2026", priceSek: 9000, status: "Available" },
  { week: 52, dates: "19/12 - 26/12 2026", priceSek: 27500, status: "Available", note: "Julveckan (Christmas week)" },
  { week: 53, dates: "26/12 2026 - 2/1 2027", priceSek: 29000, status: "Available", note: "Nyårsveckan (New Year week)" },
  { week: 1, dates: "2/1 - 9/1 2027", priceSek: 13795, status: "Booked" },
  { week: 2, dates: "9/1 - 16/1 2027", priceSek: 10095, status: "Booked" },
  { week: 3, dates: "16/1 - 23/1 2027", priceSek: 11000, status: "Booked" },
  { week: 4, dates: "23/1 - 30/1 2027", priceSek: 15500, status: "Available" },
  { week: 5, dates: "30/1 - 6/2 2027", priceSek: 17500, status: "Booked" },
  { week: 6, dates: "6/2 - 13/2 2027", priceSek: 19500, status: "Booked" },
  { week: 7, dates: "13/2 - 20/2 2027", priceSek: 28000, status: "Available", note: "Sportlov" },
  { week: 8, dates: "20/2 - 27/2 2027", priceSek: 28000, status: "Available", note: "Sportlov" },
  { week: 9, dates: "27/2 - 6/3 2027", priceSek: 28000, status: "Available", note: "Sportlov" },
  { week: 10, dates: "6/3 - 13/3 2027", priceSek: 21000, status: "Available", note: "Sportlov" },
  { week: 11, dates: "13/3 - 20/3 2027", priceSek: 19500, status: "Booked" },
  { week: 12, dates: "20/3 - 27/3 2027", priceSek: 23500, status: "Available", note: "Påsk (Easter)" },
  { week: 13, dates: "27/3 - 3/4 2027", priceSek: 23500, status: "Available", note: "Påsk (Easter)" },
  { week: 14, dates: "3/4 - 11/4 2027", priceSek: 14000, status: "Available" },
];

export default defineTool({
  name: "get_winter_pricing",
  title: "Get winter pricing and availability",
  description:
    "Returns the full winter season 2026/2027 pricing table with week number, dates, price in SEK, and booking status (Saturday-to-Saturday, 7-night stays). Optionally filter by status.",
  inputSchema: {
    status: z
      .enum(["Available", "Booked", "All"])
      .optional()
      .describe("Filter to only available, only booked, or all weeks. Defaults to All."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ status }) => {
    const filtered =
      !status || status === "All"
        ? winterPricing
        : winterPricing.filter((w) => w.status === status);
    const payload = {
      season: "Winter 2026/2027",
      currency: "SEK",
      stayRule: "Saturday to Saturday, 7 nights",
      cleaningIncluded: true,
      weeks: filtered,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
