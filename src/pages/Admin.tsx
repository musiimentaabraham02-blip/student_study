import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, CalendarDays, TrendingUp, ShieldAlert } from "lucide-react";
import { getGroups, getSessions, getStats } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Admin = () => {
  const stats = getStats();
  const allGroups = getGroups();

  const handleDeleteGroup = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove the group "${name}"? This action is irreversible.`)) {
      // Logic for actual deletion would go here in a real app
      toast.success(`Group "${name}" has been removed for moderation.`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Admin Management Console</h1>
        <p className="text-muted-foreground text-sm mt-1">Platform-wide oversight and moderation.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Students", value: stats.totalUsers, color: "text-blue-500" },
          { icon: BookOpen, label: "Total Groups", value: allGroups.length, color: "text-primary" },
          { icon: CalendarDays, label: "Active Sessions", value: stats.activeSessions, color: "text-accent" },
          { icon: TrendingUp, label: "Engagement", value: "+18%", color: "text-green-500" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold font-[family-name:var(--font-heading)]">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Moderation Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-[family-name:var(--font-heading)]">Platform Content Moderation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allGroups.slice(0, 5).map((group) => (
              <div key={group.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-dashed hover:border-red-200 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{group.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{group.description}</p>
                    <div className="flex gap-2 mt-2">
                       <Badge variant="outline" className="text-[10px]">Leader: {group.leaderName}</Badge>
                       <Badge variant="outline" className="text-[10px]">{group.faculty}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="h-8 text-[10px] uppercase">Review</Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="h-8 text-[10px] uppercase bg-red-600 hover:bg-red-700"
                    onClick={() => handleDeleteGroup(group.id, group.name)}
                  >
                    Delete Group
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Most Active Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-[family-name:var(--font-heading)]">Study Engagement by Course</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.mostActiveCourses.map((course, i) => (
              <div key={course.course} className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{course.course}</p>
                  <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${(course.members / 100) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium">{course.groups} groups</p>
                  <p className="text-xs text-muted-foreground">{course.members} members</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
