import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Facebook, Github, Chrome, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In this redesign, we handle admin/student detection
      const role = email.includes("admin") ? "admin" : "student";
      await login(email, role);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#E7E7FF] flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-[2.5rem] border-none shadow-2xl p-8 bg-white">
        <CardContent className="p-0 space-y-8">
          <div className="text-center space-y-4">
             <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3D3A8F]">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-[#1A1A1A]">Welcome Back</h1>
              <p className="text-slate-500 font-medium text-sm text-center">Sign in to your Study Finder account</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold uppercase text-slate-400 ml-1">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@university.ac.ug"
                  className="bg-slate-50 border-slate-100 h-12 rounded-xl focus:ring-[#3D3A8F] focus:border-[#3D3A8F]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold uppercase text-slate-400 ml-1">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="bg-slate-50 border-slate-100 h-12 rounded-xl focus:ring-[#3D3A8F] focus:border-[#3D3A8F]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#3D3A8F] hover:bg-[#2A2869] text-white h-12 rounded-xl text-base font-bold transition-all shadow-lg active:scale-[0.98]">
              Sign In
            </Button>
          </form>

          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-400 font-bold">Or</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" className="h-12 w-12 rounded-full p-0 flex items-center justify-center border-slate-200 hover:bg-slate-50">
                <Chrome className="h-5 w-5 text-slate-600" />
              </Button>
              <Button variant="outline" className="h-12 w-12 rounded-full p-0 flex items-center justify-center border-slate-200 hover:bg-slate-50">
                <Github className="h-5 w-5 text-slate-600" />
              </Button>
              <Button variant="outline" className="h-12 w-12 rounded-full p-0 flex items-center justify-center border-slate-200 hover:bg-slate-50">
                <Facebook className="h-5 w-5 text-slate-600" />
              </Button>
            </div>

            <p className="text-center text-sm text-slate-500 font-medium">
              New here?{" "}
              <Link to="/register" className="text-[#FF6B35] hover:underline font-bold">Create Account</Link>
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Return Home Link */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-[#3D3A8F] font-bold text-sm uppercase tracking-wider hover:opacity-70 transition-opacity"
      >
        <GraduationCap className="h-5 w-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default Login;
