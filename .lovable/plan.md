## What you're asking

1. Remember the current winter 2026/2027 pricing so we can restore it later.
2. Revert the site's pricing back to the previous 2025/2026 season as it was.

## 1. Save 26/27 pricing to project memory

I'll write a new memory file `mem://features/winter-2026-2027-pricing` with the full week list (weeks 50–14), Saturday-to-Saturday dates, prices in SEK, statuses, and notes (Grand opening, Julveckan, Nyårsveckan, Sportlov, Påsk), plus the summer/spring/autumn rates. I'll add a reference to it in `mem://index.md` under Memories. This preserves the 26/27 data even after we roll the UI back to 25/26.

## 2. Reverting to the 25/26 season

I do not rewrite prior state by hand — that's what your built-in history is for, and it's the safe way to get an exact byte-for-byte restore of the old pricing (plus anything else that was in the file at that point).

Two options:

**Option A — Revert from chat history:** scroll back to the assistant message right before the "Nu är säsongen över…" turn (the one where the table still showed weeks 51–16 of 2025/2026 with the original bookings and week 15 discount reversed) and click the revert button on that message.

**Option B — Use the History tab:**

<presentation-actions>
  <presentation-open-history>View History</presentation-open-history>
</presentation-actions>

Pick the version from just before we updated to the 26/27 season.

## Important caveats before you revert

Reverting rolls back **all** file changes made after that point, not only `PricingSection.tsx`. Since then, we also:

- Added the MCP server (package install, `src/lib/mcp/**`, `vite.config.ts` plugin, deployed `supabase/functions/mcp`).
- Did the SEO pass (`react-helmet-async` install, `HelmetProvider` in `main.tsx`, Helmet tags in `Index.tsx` / `Villkor.tsx`, `public/sitemap.xml`, `public/llms.txt`, updated `public/robots.txt`, `index.html` title, accessibility tweaks in Hero/Cabin/Seasons/Location sections).

A revert to pre-26/27 pricing would undo those too. If you want to keep MCP and SEO, tell me and I'll instead re-enter the 25/26 pricing table directly in `PricingSection.tsx` from the saved memory of that season — but I'll need to reconstruct the 25/26 values (they're in older chat history; I'll recall them before editing). Just tell me which path you want:

- **Revert (clean rollback, loses MCP + SEO work)** — you click the revert button; nothing for me to code.
- **Surgical rollback (keep MCP + SEO)** — I save the 26/27 memory, recall the 25/26 pricing from chat history, and rewrite only the pricing table.

Either way, step 1 (saving 26/27 to memory) happens first so nothing is lost.
