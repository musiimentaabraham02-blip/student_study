import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    program: "",
    year: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.program || !formData.year) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      // Simulate registration then auto-login
      await login(formData.email, "student");
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#E7E7FF] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg rounded-[2.5rem] border-none shadow-2xl p-8 bg-white">
        <CardContent className="p-0 space-y-8">
          <div className="text-center space-y-4">
             <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3D3A8F]">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-[#1A1A1A]">Create Account</h1>
              <p className="text-slate-500 font-medium text-sm">Join the UCU student learning community</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs font-semibold uppercase text-slate-400 ml-1">Full Name</Label>
                <Input 
                  placeholder="John Mukasa" 
                  className="bg-slate-50 border-slate-100 h-11 rounded-xl"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase text-slate-400 ml-1">Email</Label>
                <Input 
                  type="email" 
                  placeholder="name@ucu.ac.ug" 
                  className="bg-slate-50 border-slate-100 h-11 rounded-xl"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase text-slate-400 ml-1">Password</Label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-slate-50 border-slate-100 h-11 rounded-xl"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase text-slate-400 ml-1">Program</Label>
                <Select value={formData.program} onValueChange={(v) => setFormData({...formData, program: v})}>
                  <SelectTrigger className="bg-slate-50 border-slate-100 h-11 rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">BSc IT</SelectItem>
                    <SelectItem value="cs">BSc Computer Science</SelectItem>
                    <SelectItem value="se">BSc Software Eng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase text-slate-400 ml-1">Year</Label>
                <Select value={formData.year} onValueChange={(v) => setFormData({...formData, year: v})}>
                  <SelectTrigger className="bg-slate-50 border-slate-100 h-11 rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Year 1</SelectItem>
                    <SelectItem value="2">Year 2</SelectItem>
                    <SelectItem value="3">Year 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#3D3A8F] hover:bg-[#2A2869] text-white h-12 rounded-xl text-base font-bold transition-all shadow-lg mt-4">
              Create Account
            </Button>

            <p className="text-center text-sm text-slate-500 font-medium pt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-[#3D3A8F] hover:underline font-bold">Sign In</Link>
            </p>
          </form>
        </CardContent>
      </Card>
      
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-[#3D3A8F] font-bold text-sm uppercase tracking-wider hover:opacity-70 transition-opacity"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default Register;
