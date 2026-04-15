import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Users, MapPin, CalendarDays, Clock, MessageSquare,
  UserPlus, ArrowLeft, Crown, Megaphone, HelpCircle
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getGroups, getSessions, getPosts, savePost, saveSession } from "@/lib/storage";
import { StudySession, GroupPost } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const GroupDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const studyGroups = getGroups();
  const group = studyGroups.find((g) => g.id === id);
  
  const [sessions, setSessions] = useState<StudySession[]>(getSessions(id || ""));
  const [posts, setPosts] = useState<GroupPost[]>(getPosts(id || ""));
  
  const [newPost, setNewPost] = useState("");
  const [isJoined, setIsJoined] = useState(false); // In real app, check if user is in member list
  const [isScheduling, setIsScheduling] = useState(false);
  
  const isLeader = group?.leaderId === user?.id;

  const [sessionForm, setSessionForm] = useState({
    date: "",
    time: "",
    location: "",
    description: "",
  });

  if (!group) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Group not found.</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/groups">Back to Groups</Link>
        </Button>
      </div>
    );
  }

  const postIcon = (type: string) => {
    if (type === 'announcement') return <Megaphone className="h-4 w-4 text-primary" />;
    if (type === 'question') return <HelpCircle className="h-4 w-4 text-accent" />;
    return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="gap-1">
        <Link to="/groups"><ArrowLeft className="h-4 w-4" /> Back to Groups</Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">{group.name}</h1>
          </div>
          <p className="text-muted-foreground">{group.courseCode} — {group.courseName}</p>
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
        {!isJoined && !isLeader ? (
          <Button className="gap-2" onClick={() => { setIsJoined(true); toast.success("Joined group!"); }}>
            <UserPlus className="h-4 w-4" /> Join Group
          </Button>
        ) : (
          <div className="flex gap-2">
            {isLeader && (
              <Dialog open={isScheduling} onOpenChange={setIsScheduling}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 border-primary text-primary">
                    <CalendarDays className="h-4 w-4" /> Schedule Session
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule New Study Session</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input 
                        placeholder="e.g. Chapter 4 Review" 
                        value={sessionForm.description}
                        onChange={e => setSessionForm({...sessionForm, description: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input 
                          type="date" 
                          value={sessionForm.date}
                          onChange={e => setSessionForm({...sessionForm, date: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input 
                          type="time" 
                          value={sessionForm.time}
                          onChange={e => setSessionForm({...sessionForm, time: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input 
                        placeholder="Room number or link" 
                        value={sessionForm.location}
                        onChange={e => setSessionForm({...sessionForm, location: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => {
                       const session: StudySession = {
                         id: Math.random().toString(36).substr(2, 9),
                         groupId: id || "",
                         groupName: group?.name || "",
                         ...sessionForm,
                         attendees: 1
                       };
                       saveSession(session);
                       setSessions(getSessions(id));
                       setIsScheduling(false);
                       toast.success("Session scheduled!");
                    }}>Save Session</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Badge className="bg-accent text-accent-foreground px-3 py-1.5 h-10 flex items-center">
              {isLeader ? "👑 Leader" : "✓ Member"}
            </Badge>
          </div>
        )}
      </div>

      {/* Info cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-sm">{group.memberCount}/{group.maxMembers}</p>
              <p className="text-xs text-muted-foreground">Members</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-sm">{group.meetingLocation}</p>
              <p className="text-xs text-muted-foreground">Meeting Location</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Crown className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-sm">{group.leaderName}</p>
              <p className="text-xs text-muted-foreground">Group Leader</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="sessions">Sessions ({sessions.length})</TabsTrigger>
          <TabsTrigger value="discussion">Discussion ({posts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-4">
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold font-[family-name:var(--font-heading)] mb-2">Description</h3>
              <p className="text-muted-foreground">{group.description}</p>
              <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                <p><span className="text-muted-foreground">Faculty:</span> {group.faculty}</p>
                <p><span className="text-muted-foreground">Created:</span> {group.createdAt}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="mt-4 space-y-3">
          {sessions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No sessions scheduled yet.</p>
          ) : (
            sessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 shrink-0">
                    <CalendarDays className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{session.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{session.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{session.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{session.location}</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{session.attendees} attending</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="discussion" className="mt-4 space-y-4">
          {(isJoined || isLeader) && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <Textarea
                  placeholder="Write a post, ask a question, or share an announcement..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    if (newPost.trim() && id) {
                      const post: GroupPost = {
                        id: Math.random().toString(36).substr(2, 9),
                        groupId: id,
                        authorName: user?.name || "Anonymous",
                        content: newPost,
                        createdAt: new Date().toISOString(),
                        type: isLeader ? 'announcement' : 'general'
                      };
                      savePost(post);
                      setPosts(getPosts(id));
                      setNewPost("");
                      toast.success("Post shared!");
                    }
                  }}
                >
                  Post
                </Button>
              </CardContent>
            </Card>
          )}
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-muted">
                      {post.authorName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{post.authorName}</span>
                      {postIcon(post.type)}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString('en-UG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupDetail;
