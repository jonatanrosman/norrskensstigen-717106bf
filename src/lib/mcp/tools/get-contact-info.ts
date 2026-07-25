import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description:
    "Returns contact information for booking inquiries at Norrskensstigen.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const payload = {
      email: "info@norrskensstigen.se",
      phone: "+46 705 85 58 55",
      website: "https://norrskensstigen.lovable.app",
      contactPage: "https://norrskensstigen.lovable.app/#contact",
      responseTime: "Within 24 hours",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
