import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Facebook, Github, Chrome, Calendar } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // For the demo, we'll login as student
      await login(email, "student");
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="relative min-h-screen font-sans text-slate-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}students.png)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#E7E7FF]/95 via-[#E7E7FF]/80 to-white/70 backdrop-blur-[2px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-3">
          <img 
            src={`${import.meta.env.BASE_URL}logo.png`} 
            alt="UCU Logo" 
            className="h-14 w-14 object-contain shadow-sm rounded-full bg-white p-1"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div>
            <p className="text-xl font-black text-[#3D3A8F] tracking-tight leading-none">STUDENT STUDY GROUP</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#3D3A8F]/60 font-bold">Uganda Christian University</p>
          </div>
        </div>
        
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/groups" className="text-sm font-bold uppercase text-[#3D3A8F] hover:text-[#5E5AF5] transition-colors">Groups</Link>
          <Link to="/sessions" className="text-sm font-bold uppercase text-[#3D3A8F] hover:text-[#5E5AF5] transition-colors">Sessions</Link>
          <Link to="/admin" className="text-sm font-bold uppercase text-[#3D3A8F] hover:text-[#5E5AF5] transition-colors">Admin</Link>
        </div>

        <Button asChild className="bg-[#3D3A8F] hover:bg-[#2A2869] text-white px-8 rounded-full shadow-lg shadow-indigo-200 transition-all active:scale-95">
          <Link to="/register">JOIN NOW</Link>
        </Button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center text-center space-y-12">
          
          <div className="max-w-3xl space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-[#3D3A8F] leading-tight animate-fade-in">
              Collaborate. Study. <span className="text-[#FF6B35]">Succeed.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              The official centralized hub for UCU students to find, create, and manage study groups effectively.
            </p>
          </div>

          {/* Centered Login Card */}
          <div className="w-full max-w-md mx-auto">
            <Card className="rounded-[2.5rem] border-none shadow-2xl p-8 bg-white/95 backdrop-blur-md shadow-[#3D3A8F]/20">
              <CardContent className="p-0 space-y-6">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h3 className="text-2xl font-bold text-[#1A1A1A]">Welcome Back</h3>
                    <p className="text-slate-500 font-medium text-sm">Sign in to your learning dashboard</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5 text-left">
                      <Label htmlFor="email" className="text-xs font-bold uppercase text-slate-400 ml-1">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@ucu.ac.ug"
                        className="bg-slate-50 border-slate-100 h-12 rounded-2xl focus:ring-2 focus:ring-[#3D3A8F]/20"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <Label htmlFor="password" className="text-xs font-bold uppercase text-slate-400 ml-1">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••"
                        className="bg-slate-50 border-slate-100 h-12 rounded-2xl focus:ring-2 focus:ring-[#3D3A8F]/20"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#FF6B35] hover:bg-[#E85A24] text-white h-14 rounded-2xl text-lg font-bold shadow-xl shadow-orange-200 transition-all active:scale-[0.98]">
                    SIGN IN
                  </Button>
                </form>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-center text-sm text-slate-500 font-medium">
                    New to the platform?{" "}
                    <Link to="/register" className="text-[#3D3A8F] hover:underline font-bold">Create Account</Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer / Copyright */}
      <footer className="container mx-auto px-4 pb-12 pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between text-[#3D3A8F]/60 text-xs font-bold uppercase tracking-widest gap-4">
          <p>© 2026 UCU STUDY GROUP FINDER</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-[#3D3A8F]">Terms</Link>
            <Link to="#" className="hover:text-[#3D3A8F]">Privacy</Link>
            <Link to="#" className="hover:text-[#3D3A8F]">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
