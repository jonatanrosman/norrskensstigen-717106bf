import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const CODE_STORAGE_KEY = 'norrskensstigen_admin_code';

type WinterWeek = {
  id: string;
  week: number;
  dates: string;
  price_sek: number;
  status: 'Available' | 'Booked';
  note: string | null;
  sort_order: number;
};

const CodeGate = ({ onUnlock }: { onUnlock: (code: string) => void }) => {
  const [code, setCode] = useState('');

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-sm p-6 space-y-4">
        <h1 className="font-serif text-2xl text-foreground">Adminkod</h1>
        <p className="text-sm text-muted-foreground">
          Ange koden för att hantera bokningsstatus för vinterveckorna.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (code.trim()) onUnlock(code.trim());
          }}
          className="space-y-3"
        >
          <div className="space-y-1">
            <Label htmlFor="admin-code">Kod</Label>
            <Input
              id="admin-code"
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full" disabled={!code.trim()}>
            Lås upp
          </Button>
        </form>
      </Card>
    </div>
  );
};

const WeeksTable = ({ code, onWrongCode }: { code: string; onWrongCode: () => void }) => {
  const queryClient = useQueryClient();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: weeks = [], isLoading } = useQuery({
    queryKey: ['winter-weeks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('winter_weeks')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data as WinterWeek[];
    },
  });

  const toggleWeek = async (week: WinterWeek) => {
    const nextStatus = week.status === 'Available' ? 'Booked' : 'Available';
    setPendingId(week.id);
    setError(null);

    const { error: invokeError } = await supabase.functions.invoke('update-week-status', {
      body: { code, id: week.id, status: nextStatus },
    });

    setPendingId(null);

    if (invokeError) {
      let message: string | null = null;
      const context = (invokeError as { context?: Response }).context;
      if (context) {
        try {
          const body = await context.json();
          if (typeof body?.error === 'string') message = body.error;
        } catch {
          // Response body wasn't JSON; fall back to the generic message below.
        }
      }
      if (message === 'Fel kod') {
        onWrongCode();
      } else {
        setError(message ?? 'Något gick fel. Försök igen.');
      }
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['winter-weeks'] });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="font-serif text-3xl text-foreground mb-6">Vinterveckor 2026/2027</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 text-red-700 text-sm px-4 py-2">
          {error}
        </div>
      )}

      <Card className="divide-y divide-border">
        {weeks.map((week) => (
          <div key={week.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <div className="font-medium text-foreground">
                Vecka {week.week}
                {week.note && <span className="text-muted-foreground font-normal"> — {week.note}</span>}
              </div>
              <div className="text-sm text-muted-foreground">
                {week.dates} · {week.price_sek.toLocaleString('sv-SE')} kr
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className={cn(
                  'text-sm font-medium',
                  week.status === 'Available' ? 'text-green-700' : 'text-red-700'
                )}
              >
                {week.status === 'Available' ? 'Ledig' : 'Bokad'}
              </span>
              {pendingId === week.id ? (
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              ) : (
                <Switch
                  checked={week.status === 'Booked'}
                  onCheckedChange={() => toggleWeek(week)}
                />
              )}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

const Admin = () => {
  const [code, setCode] = useState<string | null>(() => sessionStorage.getItem(CODE_STORAGE_KEY));

  const handleUnlock = (enteredCode: string) => {
    sessionStorage.setItem(CODE_STORAGE_KEY, enteredCode);
    setCode(enteredCode);
  };

  const handleWrongCode = () => {
    sessionStorage.removeItem(CODE_STORAGE_KEY);
    setCode(null);
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin | Norrskensstigen</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        {code ? (
          <WeeksTable code={code} onWrongCode={handleWrongCode} />
        ) : (
          <CodeGate onUnlock={handleUnlock} />
        )}
      </div>
    </>
  );
};

export default Admin;
