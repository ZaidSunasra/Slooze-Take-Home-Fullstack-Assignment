import { useUser } from "@/context/UserContext"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { ChevronsUpDown, LogOut } from "lucide-react"
import { useLocation, useNavigate } from "react-router"
import { navItems } from "@/utils/NavLink"
import type { role } from "@/lib/globalType"
import { useIsMobile } from "@/hooks/use-mobile";
import { useLogout } from "@/api/auth/auth.mutation";
import Logo from "@/assets/logo.svg"
import { useCart } from "@/context/CartContext";
import { Badge } from "./ui/badge";

const SideBar = () => {

  const { user } = useUser();
  const {items} = useCart();
  const isMobile = useIsMobile()
  const navigate = useNavigate();
  const location = useLocation()
  const logout = useLogout();

  const accessibleMenuItems = navItems[user?.role as role];
  const totalItem = items.reduce((sum, qty) => sum + qty.quantity, 0);

  const handleLogut = () => {
    logout.mutate();
  }

  return (
    <div className="flex min-h-screen bg-card">
      <SidebarProvider>
        <Sidebar variant="sidebar" collapsible="icon" className="border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-200">
            <SidebarMenuButton>
              <img src={Logo} className="w-10 h-auto"/>
              <h2 className="text-lg font-semibold"> Multiverse </h2>
            </SidebarMenuButton>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {accessibleMenuItems.map((item, index) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={index} >
                        <SidebarMenuButton
                          isActive={isActive}
                          onClick={() => navigate(item.url)}
                          className="transition-colors data-[active=true]:bg-primary data-[active=true]:text-primary-foreground text-muted-foreground hover:bg-accent hover:text-foreground "
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          {item.title == "Cart" && <Badge>{totalItem}</Badge>}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center border-2 border-sidebar-border">
                        {user?.name[0].toUpperCase()}
                       {user?.name?.split(" ")?.[1]?.[0]?.toUpperCase()}
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold capitalize">
                          {user?.name as string}
                        </span>
                        <span className="truncate text-xs">{user?.email}</span>
                      </div>
                      <ChevronsUpDown />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg  border bg-sidebar"
                    side={isMobile ? 'top' : 'right'}
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={handleLogut}>
                        <LogOut />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarTrigger />
      </SidebarProvider>
    </div>
  )
}

export default SideBar