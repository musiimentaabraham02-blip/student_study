import {
  LayoutDashboard,
  Users,
  Search,
  CalendarDays,
  PlusCircle,
  Shield,
  BookOpen,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Browse Groups", url: "/groups", icon: Search },
  { title: "My Groups", url: "/my-groups", icon: Users },
  { title: "Sessions", url: "/sessions", icon: CalendarDays },
  { title: "Create Group", url: "/create-group", icon: PlusCircle },
];

const adminItems = [
  { title: "Admin Panel", url: "/admin", icon: Shield },
];

export function AppSidebar() {
  const { user, isAdmin } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Filter items based on role
  const filteredMainItems = mainItems.filter(item => {
    if (isAdmin) {
      // Admins only need high level navigation
      return ["Dashboard", "Browse Groups", "Sessions"].includes(item.title);
    }
    return true; // Students see all main items
  });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <BookOpen className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-sm font-bold font-[family-name:var(--font-heading)] text-sidebar-foreground">
                StudyFinder
              </h2>
              <p className="text-xs text-sidebar-foreground/60">UCU Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink to={item.url} end>
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
              {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <p className="text-xs font-bold text-sidebar-foreground truncate">{user?.name}</p>
                {isAdmin && <Badge className="text-[8px] h-3 px-1 bg-[#FF6B35]">Admin</Badge>}
              </div>
              <p className="text-[10px] text-sidebar-foreground/60 truncate font-medium">UCU Student</p>
            </div>
          )}
          {!collapsed && (
            <NavLink to="/" className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors p-1 hover:bg-black/5 rounded">
              <LogOut className="h-4 w-4" />
            </NavLink>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
