import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_summer_pricing",
  title: "Get spring/summer/autumn pricing",
  description:
    "Returns pricing for the non-winter season (spring, summer, autumn) at Norrskensstigen.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const payload = {
      season: "Spring, Summer & Autumn",
      currency: "SEK",
      cleaningIncluded: true,
      rates: [
        { unit: "Week (7 nights)", priceSek: 5500 },
        { unit: "Long weekend (3 nights)", priceSek: 4000 },
      ],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
