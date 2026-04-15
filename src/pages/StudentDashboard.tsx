import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, CalendarDays, BookOpen, ArrowRight, Clock, MapPin, TrendingUp, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getGroups, getSessions } from "@/lib/storage";

const StudentDashboard = () => {
  const { user } = useAuth();
  const allGroups = getGroups();
  const allSessions = getSessions();

  // Student specific data filtering
  const myGroups = allGroups.filter(g => g.leaderId === user?.id).slice(0, 3);
  const upcomingSessions = allSessions.slice(0, 3);
  const recommendedGroups = allGroups.filter(g => g.faculty === user?.program || !myGroups.includes(g)).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Personalized Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#3D3A8F] p-8 rounded-[2rem] text-white">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">
            Welcome back, {user?.name.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-white/80 mt-1 font-medium">
            You have {upcomingSessions.length} study sessions scheduled for this week.
          </p>
        </div>
        <Button asChild className="bg-white text-[#3D3A8F] hover:bg-white/90 rounded-xl font-bold">
          <Link to="/create-group">Start a New Group</Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Users, label: "My Active Groups", value: myGroups.length, color: "text-[#3D3A8F]" },
          { icon: CalendarDays, label: "Upcoming Meetings", value: upcomingSessions.length, color: "text-[#FF6B35]" },
          { icon: Star, label: "Study Points", value: "120", color: "text-yellow-500" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold font-[family-name:var(--font-heading)]">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-3 bg-slate-50/50">
              <CardTitle className="text-lg font-bold">Your Study Schedule</CardTitle>
              <Button variant="ghost" size="sm" asChild className="text-[#3D3A8F] font-bold">
                <Link to="/sessions" className="gap-1 text-xs">View Calendar <ArrowRight className="h-3.3 w-3" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {upcomingSessions.length === 0 ? (
                  <div className="p-8 text-center text-slate-400">
                    <CalendarDays className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p>No sessions scheduled yet.</p>
                  </div>
                ) : (
                  upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-start gap-4 p-5 hover:bg-slate-50/50 transition-colors">
                      <div className="flex flex-col items-center justify-center h-14 w-14 rounded-2xl bg-[#E7E7FF] text-[#3D3A8F] shrink-0">
                        <span className="text-xs font-bold uppercase">{session.date.split(' ')[0]}</span>
                        <span className="text-lg font-black">{session.date.split(' ')[1]}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-800 truncate">{session.description}</p>
                        <p className="text-sm text-slate-500 font-medium">{session.groupName}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs font-bold text-slate-400">
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{session.time}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{session.location}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-lg h-8 text-[10px] font-bold uppercase border-slate-200">Reminder</Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Groups */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Discover New Groups</h3>
              <Link to="/groups" className="text-xs font-bold text-[#3D3A8F] hover:underline uppercase tracking-wider">Browse All</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {recommendedGroups.map((group) => (
                <Card key={group.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#E7E7FF] text-[#3D3A8F] border-none font-bold text-[10px] uppercase">
                        {group.courseCode}
                      </Badge>
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-slate-200" />
                        ))}
                      </div>
                    </div>
                    <h4 className="font-bold text-[#1A1A1A] leading-tight">{group.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{group.description}</p>
                    <Button variant="secondary" className="w-full rounded-xl h-9 text-xs font-bold bg-slate-100 hover:bg-slate-200" asChild>
                      <Link to={`/groups/${group.id}`}>View Group</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - My Groups & Activity */}
        <div className="space-y-6">
          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader className="pb-3 px-6 pt-6">
              <CardTitle className="text-lg font-bold">My Study Groups</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-3">
                {myGroups.map((group) => (
                  <Link
                    key={group.id}
                    to={`/groups/${group.id}`}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-[#E7E7FF] group transition-colors"
                  >
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white text-[#3D3A8F] shadow-sm group-hover:bg-[#3D3A8F] group-hover:text-white transition-colors">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-slate-800 truncate">{group.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{group.courseCode}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#3D3A8F] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </Link>
                ))}
                {myGroups.length === 0 && (
                  <p className="text-center text-xs text-slate-400 py-4 font-medium italic">You haven't joined any groups yet.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-sm bg-gradient-to-br from-[#FF6B35]/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Study Analytics</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Weekly Activity</p>
                </div>
              </div>
              <div className="space-y-3">
                 <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#FF6B35] rounded-full w-[65%]" />
                 </div>
                 <p className="text-xs font-bold text-slate-500">65% toward your weekly goal</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
