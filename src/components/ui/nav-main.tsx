"use client"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import { useRouterState } from '@tanstack/react-router';
import type { LucideIcon } from "lucide-react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isActive = (url: string):boolean => {
    const urls = url.split('?');
    if (urls.length > 1) {
      return currentPath === urls[0];
    }
    return currentPath === url;
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <Link disabled={!item.url} to={item.url} key={item.title}>
              <SidebarMenuItem
                key={item.title}
                className={isActive(item.url) ? "font-bold my-1" : "hover:text-black my-1"}
              >
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
