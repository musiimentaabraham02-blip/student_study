import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { studySessions } from "@/lib/mock-data";

const Sessions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Study Sessions</h1>
        <p className="text-muted-foreground text-sm mt-1">Upcoming sessions from your groups</p>
      </div>

      <div className="space-y-3">
        {studySessions.map((session) => (
          <Card key={session.id}>
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <span className="text-xs font-medium text-primary">
                  {new Date(session.date).toLocaleDateString('en-UG', { month: 'short' })}
                </span>
                <span className="text-lg font-bold text-primary leading-none">
                  {new Date(session.date).getDate()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold font-[family-name:var(--font-heading)]">{session.description}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{session.groupName}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{session.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{session.location}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{session.attendees} attending</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sessions;
