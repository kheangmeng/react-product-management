import * as React from "react"
import {
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  Box,
  BaggageClaim,
  Users,
  FileText,
} from "lucide-react"
import { NavMain } from "@/components/ui/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/products",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Product Management",
      url: "/admin/products/add",
      icon: Box,
    },
    {
      title: "Order Management",
      url: "/admin/products/123",
      icon: BaggageClaim,
    },
    {
      title: "Customer Management",
      url: "/admin/products/123/edit",
      icon: Users,
    },
    {
      title: "Report",
      url: "#",
      icon: FileText,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Logo</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
