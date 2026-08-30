# Deploya update-week-status

Målet: få edge-funktionen `update-week-status` (som kom in via GitHub-push) utrullad så att `/admin` fungerar. Ingen kodändring.

## Vad som redan är verifierat

- `supabase/functions/update-week-status/index.ts` finns i repot och är komplett: CORS, POST-only, Zod-validering, jämförelse mot `ADMIN_CODE`, uppdatering av `winter_weeks` via service role.
- Secrets `ADMIN_CODE`, `SUPABASE_URL` och `SUPABASE_SERVICE_ROLE_KEY` finns redan i backend-projektet.
- Tabellen `public.winter_weeks` finns och innehåller 18 rader. Läsning är tillåten för alla (policy "Anyone can read winter weeks"). Tabellen skapas inte om.
- `/admin` (`src/pages/Admin.tsx`) läser veckorna direkt från tabellen och anropar funktionen via `supabase.functions.invoke('update-week-status')`.

## Steg

1. Deploya `update-week-status` som den är (deploy-verktyget för edge functions), utan att röra filens innehåll.
2. Kontrollera att funktionen syns bland de utrullade funktionerna tillsammans med `send-booking-inquiry`, `notify-form-error` och `mcp`.
3. Smoke-test mot den utrullade endpointen: ett anrop med fel kod ska ge 401 ("Fel kod"), inte 500 ("Server misconfigured"). Det bekräftar att secrets är läsbara i runtime utan att röja koden.
4. Läs funktionsloggarna för att bekräfta att inga konfigurationsfel loggas.
5. Testa `/admin` i den körande appen: ange adminkoden, se listan med vinterveckor och växla status på en vecka fram och tillbaka så att den slutar i sitt ursprungliga läge.

## Tekniska noteringar

- `supabase/config.toml` innehåller idag bara ett block för `notify-form-error`. Lovable-hanterade funktioner rullas ut med `verify_jwt = false` som standard, så inget nytt block behövs. Om smoke-testet ändå ger 401 från plattformen (inte från funktionens egen kodkontroll) läggs ett `[functions.update-week-status] verify_jwt = false`-block till — det är i så fall den enda tillkommande ändringen, och jag stämmer av med dig först.
- Inga migrationer körs, inga andra filer ändras.
