import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_cabin_info",
  title: "Get cabin info",
  description:
    "Returns key facts about the Norrskensstigen cabin: location, capacity, sleeping arrangements, ski access, and amenities.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Norrskensstigen",
      location: "Stöten, Granfjällsbyn, Sweden",
      style: "Nordic mountain log cabin",
      skiAccess: "Ski-in/Ski-out",
      beds: 12,
      amenities: [
        "Sauna",
        "Mountain view",
        "Fully equipped kitchen",
        "Fireplace",
        "Free parking",
      ],
      website: "https://norrskensstigen.lovable.app",
      languages: ["Swedish", "English", "German"],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
