import { defineMcp } from "@lovable.dev/mcp-js";
import getCabinInfo from "./tools/get-cabin-info";
import getWinterPricing from "./tools/get-winter-pricing";
import getSummerPricing from "./tools/get-summer-pricing";
import getContactInfo from "./tools/get-contact-info";

export default defineMcp({
  name: "norrskensstigen-mcp",
  title: "Norrskensstigen MCP",
  version: "0.1.0",
  instructions:
    "Public tools for the Norrskensstigen mountain cabin in Stöten, Granfjällsbyn. Use these to look up cabin facts, winter 2026/2027 pricing and availability by week, spring/summer/autumn pricing, and contact details for booking inquiries.",
  tools: [getCabinInfo, getWinterPricing, getSummerPricing, getContactInfo],
});
