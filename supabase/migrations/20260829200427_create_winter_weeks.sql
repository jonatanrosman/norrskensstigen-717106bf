CREATE TABLE public.winter_weeks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week SMALLINT NOT NULL,
  dates TEXT NOT NULL,
  price_sek INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Booked')),
  note TEXT,
  sort_order SMALLINT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.winter_weeks ENABLE ROW LEVEL SECURITY;

-- Pricing/availability is public content shown on the site itself.
CREATE POLICY "Anyone can read winter weeks"
  ON public.winter_weeks
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- No client write access: only the update-week-status edge function
-- (using the service role key, after checking the shared admin code)
-- may change a row. anon/authenticated get no INSERT/UPDATE/DELETE policy,
-- which RLS defaults to deny.

INSERT INTO public.winter_weeks (week, dates, price_sek, status, note, sort_order) VALUES
  (50, '5/12 - 12/12 2026', 6500, 'Available', 'Grand opening', 1),
  (51, '12/12 - 19/12 2026', 9000, 'Available', NULL, 2),
  (52, '19/12 - 26/12 2026', 27500, 'Booked', 'Julveckan', 3),
  (53, '26/12 2026 - 2/1 2027', 29000, 'Available', 'Nyårsveckan', 4),
  (1, '2/1 - 9/1 2027', 15000, 'Booked', NULL, 5),
  (2, '9/1 - 16/1 2027', 11000, 'Booked', NULL, 6),
  (3, '16/1 - 23/1 2027', 11000, 'Booked', NULL, 7),
  (4, '23/1 - 30/1 2027', 15500, 'Available', NULL, 8),
  (5, '30/1 - 6/2 2027', 17500, 'Booked', NULL, 9),
  (6, '6/2 - 13/2 2027', 19500, 'Booked', NULL, 10),
  (7, '13/2 - 20/2 2027', 28000, 'Booked', 'Sportlov', 11),
  (8, '20/2 - 27/2 2027', 28000, 'Available', 'Sportlov', 12),
  (9, '27/2 - 6/3 2027', 28000, 'Available', 'Sportlov', 13),
  (10, '6/3 - 13/3 2027', 21000, 'Available', 'Sportlov', 14),
  (11, '13/3 - 20/3 2027', 19500, 'Booked', NULL, 15),
  (12, '20/3 - 27/3 2027', 23500, 'Available', 'Påsk', 16),
  (13, '27/3 - 3/4 2027', 23500, 'Available', 'Påsk', 17),
  (14, '3/4 - 11/4 2027', 14000, 'Available', NULL, 18);
