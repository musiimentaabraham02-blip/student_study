import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  CalendarDays,
  Search,
  ArrowRight,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Create and Join Groups",
    description: "Build study squads for your courses or discover the teams already working on the topics you care about.",
  },
  {
    icon: CalendarDays,
    title: "Plan Study Sessions",
    description: "Schedule sessions with classmates, set reminders, and stay on track with collaborative study routines.",
  },
  {
    icon: Search,
    title: "Find the Right Match",
    description: "Search groups by subject, faculty, or skill level so you always learn with the best fit.",
  },
  {
    icon: MessageSquare,
    title: "Stay Connected",
    description: "Share announcements, post updates, and keep every member in sync throughout the semester.",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "A polished academic hub",
    description: "Modern tools and fast workflows designed for today’s student experience.",
  },
  {
    icon: ShieldCheck,
    title: "Secure and reliable",
    description: "Your study plans, groups, and sessions are protected by strong, simple access controls.",
  },
  {
    icon: BookOpen,
    title: "Built for UCU",
    description: "Tailored for the rhythms and needs of Uganda Christian University students.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-fuchsia-500/20">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">UCU Study</p>
              <p className="text-base font-semibold">Group Finder</p>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link to="/groups" className="text-sm text-slate-300 transition hover:text-white">
              Groups
            </Link>
            <Link to="/sessions" className="text-sm text-slate-300 transition hover:text-white">
              Sessions
            </Link>
            <Link to="/admin" className="text-sm text-slate-300 transition hover:text-white">
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_35%),_radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_30%)]">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
                  <BookOpen className="h-4 w-4 text-cyan-400" />
                  Designed for collaborative learning at UCU
                </div>
                <div className="space-y-6">
                  <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
                    Modern study groups, organized in one place.
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-slate-300">
                    Discover groups, schedule sessions, and connect with classmates across courses and faculties — all from a clean, polished student platform.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button size="lg" asChild className="justify-center sm:w-auto">
                    <Link to="/register" className="flex items-center gap-2">
                      Get started <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="justify-center sm:w-auto">
                    <Link to="/groups">Browse groups</Link>
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Trusted by", value: "300+ learners" },
                    { label: "Groups", value: "40+ active" },
                    { label: "Sessions", value: "160+ held" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-center">
                      <p className="text-2xl font-semibold text-white">{stat.value}</p>
                      <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-1 rounded-full bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 opacity-70" />
                <div className="space-y-6">
                  <div className="rounded-3xl bg-slate-950/70 p-6">
                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Live group preview</p>
                    <h2 className="mt-4 text-2xl font-semibold text-white">Machine Learning Squad</h2>
                    <p className="mt-2 text-slate-400">A team studying predictive analytics, weekly review sessions and exam prep.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {[
                        "Mon • 4 PM",
                        "CS 101",
                        "Virtual",
                        "12 members",
                      ].map((item) => (
                        <div key={item} className="rounded-2xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-3xl bg-slate-950/70 p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Upcoming session</p>
                        <p className="mt-2 text-lg font-semibold text-white">Group brainstorming session</p>
                      </div>
                      <div className="rounded-2xl bg-cyan-500/15 px-3 py-2 text-sm text-cyan-100">2 days left</div>
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        { label: "Location", value: "Campus Hall 3" },
                        { label: "Duration", value: "90 min" },
                        { label: "Focus", value: "Exam prep" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                          <p className="text-xs uppercase text-slate-500">{item.label}</p>
                          <p className="mt-1 font-medium text-white">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid gap-16 lg:grid-cols-[0.95fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">What you get</p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                The modern landing page for academic teamwork.
              </h2>
              <p className="max-w-xl text-slate-400 leading-7">
                An easy-to-use dashboard that helps students start groups, manage sessions, and stay connected in one polished experience.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">{benefit.title}</h3>
                    <p className="mt-2 text-slate-400">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <article key={feature.title} className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.75)]">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-cyan-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-slate-400 leading-7">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950/90 py-20">
          <div className="container mx-auto px-4">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/20">
              <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Ready to launch</p>
                  <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                    Start your first study group in minutes.
                  </h2>
                  <p className="mt-4 max-w-xl text-slate-400 leading-7">
                    Use the platform to bring classmates together, plan sessions, and keep study goals aligned across every course you take.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                  <Button size="lg" asChild>
                    <Link to="/register">Create group</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/login">Sign in</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/95 py-8 text-slate-400">
        <div className="container mx-auto px-4 text-center sm:flex sm:items-center sm:justify-between">
          <p>© 2026 Uganda Christian University Study Group Finder.</p>
          <p className="mt-3 text-sm sm:mt-0">Built to help students collaborate better.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
