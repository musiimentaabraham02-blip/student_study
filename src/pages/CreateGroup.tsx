import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { saveGroup } from "@/lib/storage";
import { StudyGroup } from "@/lib/mock-data";

const CreateGroup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    courseCode: "",
    courseName: "",
    description: "",
    meetingLocation: "",
    faculty: "",
    maxMembers: "20",
  });

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.courseCode || !form.courseName || !form.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newGroup: StudyGroup = {
      id: Math.random().toString(36).substr(2, 9),
      name: form.name,
      courseCode: form.courseCode,
      courseName: form.courseName,
      description: form.description,
      meetingLocation: form.meetingLocation,
      faculty: form.faculty,
      leaderId: user?.id || "u1",
      leaderName: user?.name || "System",
      memberCount: 1,
      maxMembers: parseInt(form.maxMembers),
      createdAt: new Date().toISOString().split('T')[0],
      tags: [form.courseCode.split(' ')[0]],
    };

    saveGroup(newGroup);
    toast.success("Study group created successfully!");
    navigate("/groups");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">Create Study Group</CardTitle>
          <CardDescription>Set up a new study group and become its leader</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Group Name *</Label>
              <Input id="name" placeholder="e.g. Web Dev Warriors" value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseCode">Course Code *</Label>
                <Input id="courseCode" placeholder="e.g. CSC1202" value={form.courseCode} onChange={(e) => update("courseCode", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name *</Label>
                <Input id="courseName" placeholder="e.g. Web & Mobile Dev" value={form.courseName} onChange={(e) => update("courseName", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" placeholder="What will this group focus on?" rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Meeting Location</Label>
              <Input id="location" placeholder="e.g. Library Room 204 or Online - Zoom" value={form.meetingLocation} onChange={(e) => update("meetingLocation", e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Faculty</Label>
                <Select value={form.faculty} onValueChange={(v) => update("faculty", v)}>
                  <SelectTrigger><SelectValue placeholder="Select faculty" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering, Design & Technology">Engineering & Technology</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Law">Law</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">Max Members</Label>
                <Input id="max" type="number" min="2" max="50" value={form.maxMembers} onChange={(e) => update("maxMembers", e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full">Create Group</Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default CreateGroup;
