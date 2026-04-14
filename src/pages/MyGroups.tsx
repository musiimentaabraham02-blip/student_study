import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Crown, PlusCircle } from "lucide-react";
import { studyGroups } from "@/lib/mock-data";

const myGroups = studyGroups.slice(0, 3);

const MyGroups = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">My Groups</h1>
          <p className="text-muted-foreground text-sm mt-1">Groups you've joined or created</p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/create-group"><PlusCircle className="h-4 w-4" /> New Group</Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {myGroups.map((group) => (
          <Link key={group.id} to={`/groups/${group.id}`}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold font-[family-name:var(--font-heading)]">{group.name}</h3>
                  {group.leaderId === "u1" && (
                    <Badge variant="outline" className="gap-1 text-xs"><Crown className="h-3 w-3" /> Leader</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{group.courseCode} — {group.courseName}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
                <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{group.memberCount} members</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{group.meetingLocation}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {myGroups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You haven't joined any groups yet.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/groups">Browse Groups</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
