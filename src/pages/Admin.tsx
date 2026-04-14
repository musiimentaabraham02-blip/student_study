import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, CalendarDays, TrendingUp } from "lucide-react";
import { adminStats } from "@/lib/mock-data";

const Admin = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Platform overview and statistics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Users", value: adminStats.totalUsers, color: "text-primary" },
          { icon: BookOpen, label: "Study Groups", value: adminStats.totalGroups, color: "text-accent" },
          { icon: CalendarDays, label: "Active Sessions", value: adminStats.activeSessions, color: "text-primary" },
          { icon: TrendingUp, label: "Growth", value: "+12%", color: "text-accent" },
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

      {/* Most Active Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-[family-name:var(--font-heading)]">Most Active Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adminStats.mostActiveCourses.map((course, i) => (
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
