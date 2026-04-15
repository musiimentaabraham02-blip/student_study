import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, BookOpen, CalendarDays, TrendingUp, ShieldAlert, Send, Activity, Settings, Search } from "lucide-react";
import { getGroups, getSessions, getStats } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const stats = getStats();
  const allGroups = getGroups();
  const [broadcast, setBroadcast] = useState("");

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (broadcast.trim()) {
      toast.success("Broadcast message sent to all active students!");
      setBroadcast("");
    }
  };

  const handleDeleteGroup = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove the group "${name}"? This action is irreversible.`)) {
      toast.success(`Group "${name}" has been removed for moderation.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-[family-name:var(--font-heading)] text-[#3D3A8F]">
            SYSTEM ADMIN CONSOLE
          </h1>
          <p className="text-muted-foreground text-sm font-medium">Monitoring Uganda Christian University Learning Hub</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 rounded-xl text-xs font-bold uppercase"><Search className="h-4 w-4" /> Audit Logs</Button>
          <Button variant="outline" className="gap-2 rounded-xl text-xs font-bold uppercase"><Settings className="h-4 w-4" /> Config</Button>
        </div>
      </div>

      {/* Global Analytics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Students", value: stats.totalUsers, color: "text-blue-600", bg: "bg-blue-50" },
          { icon: BookOpen, label: "Total Groups", value: allGroups.length, color: "text-[#3D3A8F]", bg: "bg-[#3D3A8F]/5" },
          { icon: CalendarDays, label: "Active Sessions", value: stats.activeSessions, color: "text-[#FF6B35]", bg: "bg-[#FF6B35]/5" },
          { icon: Activity, label: "System Uptime", value: "99.9%", color: "text-green-600", bg: "bg-green-50" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm overflow-hidden text-center sm:text-left">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-black font-[family-name:var(--font-heading)]">{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Moderation Board */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-lg font-bold">Content Moderation Queue</CardTitle>
                <CardDescription className="text-xs">Review groups for compliance and integrity</CardDescription>
              </div>
              <Badge variant="secondary" className="font-black text-[10px] uppercase">5 Pending</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allGroups.slice(0, 5).map((group) => (
                  <div key={group.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-dashed border-slate-200 hover:border-[#3D3A8F]/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                        <ShieldAlert className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-[#1A1A1A]">{group.name}</h3>
                        <p className="text-xs text-slate-500 font-medium line-clamp-1">{group.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                           <Badge variant="outline" className="text-[9px] font-bold uppercase border-slate-200">Leader: {group.leaderName}</Badge>
                           <Badge variant="outline" className="text-[9px] font-bold uppercase border-slate-200 text-[#3D3A8F]">{group.faculty}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="ghost" size="sm" className="h-9 px-4 text-xs font-bold uppercase text-slate-500 hover:text-[#3D3A8F] hover:bg-slate-50">Ignore</Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="h-9 px-4 text-xs font-bold uppercase bg-red-600 hover:bg-red-700 rounded-xl"
                        onClick={() => handleDeleteGroup(group.id, group.name)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Course Trends */}
          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Academic Engagement by Faculty</CardTitle>
              <CardDescription className="text-xs">Distribution of study groups across UCU faculties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stats.mostActiveCourses.map((course, i) => (
                  <div key={course.course} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <span className="text-xs font-black text-slate-300">0{i+1}</span>
                         <p className="font-bold text-sm text-[#3D3A8F]">{course.course}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-500">{course.groups} Groups</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#3D3A8F] transition-all duration-1000"
                        style={{ width: `${(course.members / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Broadcast & Integrity */}
        <div className="space-y-6">
          <Card className="rounded-[2rem] border-none shadow-sm bg-[#3D3A8F] text-white">
            <CardHeader className="pb-3 pt-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Send className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">Global Broadcast</CardTitle>
              </div>
            </CardHeader>
            <form onSubmit={handleBroadcast}>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Type a message to all students..." 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-2xl resize-none h-32 focus:ring-white/20"
                  value={broadcast}
                  onChange={(e) => setBroadcast(e.target.value)}
                />
                <Button className="w-full bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold h-11 rounded-xl shadow-lg shadow-black/20">
                  Send Broadcast
                </Button>
              </CardContent>
            </form>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[#FF6B35]" />
                </div>
                <CardTitle className="text-lg font-bold">System Health</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
               {[
                 { label: "Active Connections", value: "1,240 PKT/s", status: "Healthy" },
                 { label: "Storage Capacity", value: "45% Used", status: "Optimal" },
                 { label: "API Latency", value: "124ms", status: "Nominal" },
               ].map(stat => (
                 <div key={stat.label} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</p>
                      <p className="text-sm font-bold text-slate-800">{stat.value}</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-600 border-none font-bold text-[10px] uppercase h-6">{stat.status}</Badge>
                 </div>
               ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
