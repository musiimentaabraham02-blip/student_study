import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, MapPin, PlusCircle } from "lucide-react";
import { getGroups } from "@/lib/storage";

const Groups = () => {
  const [search, setSearch] = useState("");
  const [faculty, setFaculty] = useState("all");
  const studyGroups = getGroups();

  const filtered = studyGroups.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.courseCode.toLowerCase().includes(search.toLowerCase()) ||
      g.courseName.toLowerCase().includes(search.toLowerCase());
    const matchesFaculty = faculty === "all" || g.faculty === faculty;
    return matchesSearch && matchesFaculty;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Browse Study Groups</h1>
          <p className="text-muted-foreground text-sm mt-1">Discover and join groups that match your courses</p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/create-group"><PlusCircle className="h-4 w-4" /> Create Group</Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by group name, course code, or course name..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={faculty} onValueChange={setFaculty}>
          <SelectTrigger className="w-full sm:w-[240px]">
            <SelectValue placeholder="Filter by faculty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Faculties</SelectItem>
            <SelectItem value="Engineering, Design & Technology">Engineering & Technology</SelectItem>
            <SelectItem value="Science">Science</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((group) => (
          <Link key={group.id} to={`/groups/${group.id}`}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold font-[family-name:var(--font-heading)] leading-tight">{group.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{group.courseCode} — {group.courseName}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{group.memberCount}/{group.maxMembers}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{group.meetingLocation}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No groups found matching your search.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/create-group">Create a new group</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Groups;
