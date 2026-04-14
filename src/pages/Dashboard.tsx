import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, CalendarDays, BookOpen, ArrowRight, Clock, MapPin } from "lucide-react";
import { studyGroups, studySessions, currentUser } from "@/lib/mock-data";

const myGroups = studyGroups.slice(0, 3);
const upcomingSessions = studySessions.slice(0, 3);
const recentGroups = studyGroups.slice(3, 6);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">
          Welcome back, {currentUser.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your study groups.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Users, label: "My Groups", value: myGroups.length, color: "text-primary" },
          { icon: CalendarDays, label: "Upcoming Sessions", value: upcomingSessions.length, color: "text-accent" },
          { icon: BookOpen, label: "Courses", value: 3, color: "text-primary" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold font-[family-name:var(--font-heading)]">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg font-[family-name:var(--font-heading)]">Upcoming Sessions</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/sessions" className="gap-1">View All <ArrowRight className="h-3 w-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-start gap-3 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 shrink-0">
                  <CalendarDays className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{session.description}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{session.groupName}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{session.date} • {session.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{session.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* My Groups */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg font-[family-name:var(--font-heading)]">My Groups</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/my-groups" className="gap-1">View All <ArrowRight className="h-3 w-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {myGroups.map((group) => (
              <Link
                key={group.id}
                to={`/groups/${group.id}`}
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{group.name}</p>
                  <p className="text-xs text-muted-foreground">{group.courseCode} • {group.memberCount} members</p>
                </div>
                <Badge variant="secondary" className="text-xs shrink-0">{group.tags[0]}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recently Created */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg font-[family-name:var(--font-heading)]">Recently Created Groups</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/groups" className="gap-1">Browse All <ArrowRight className="h-3 w-3" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            {recentGroups.map((group) => (
              <Link
                key={group.id}
                to={`/groups/${group.id}`}
                className="rounded-lg border p-4 hover:shadow-sm transition-shadow space-y-2"
              >
                <p className="font-semibold text-sm font-[family-name:var(--font-heading)]">{group.name}</p>
                <p className="text-xs text-muted-foreground">{group.courseName}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {group.memberCount}/{group.maxMembers} members
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
