# Markera vecka 7 (13/2–20/2 2027) som bokad

## Mål
Uppdatera vecka 7:s status från "Ledig" till "Bokad" på alla ställen där vinterpriserna för säsongen 2026/2027 finns, så att UI, MCP-verktyg och projektminne är synkroniserade.

## Nuvarande läge
- `src/components/PricingSection.tsx`: vecka 7 har status `'Ledig'`.
- `src/lib/mcp/tools/get-winter-pricing.ts`: vecka 7 har status `"Available"`.
- `mem://features/winter-2026-2027-pricing`: vecka 7 har status `Ledig`.

## Åtgärder
1. Ändra status för vecka 7 till `'Bokad'` i `src/components/PricingSection.tsx`.
2. Ändra status för vecka 7 till `"Booked"` i `src/lib/mcp/tools/get-winter-pricing.ts`.
3. Ändra status för vecka 7 till `Bokad` i `mem://features/winter-2026-2027-pricing`.
4. Kör TypeScript-kontroll (`bunx tsc`) för att säkerställa att ändringarna inte introducerar fel.

## Förväntat resultat
Vecka 7 visas som bokad i prislistan på hemsidan och returneras som bokad av MCP-verktyget `get_winter_pricing`.