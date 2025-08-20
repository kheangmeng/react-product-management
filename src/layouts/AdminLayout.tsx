import { AppSidebar } from "@/components/app-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonIcon } from "@/components/ui/button-icon";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useRouterState } from '@tanstack/react-router';
import { Bell, ChevronDown } from "lucide-react"
import type { ReactNode } from "react"

function displayTitle(path: string): string {
   switch (path) {
    case '/admin/products':
      return 'Product'
    case '/admin/products/add':
      return 'Add Product'
    default:
      return 'Edit Product'
  }
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className='flex items-center gap-2'>
            <SidebarTrigger className="ml-5" />
            <div>{ displayTitle(currentPath) }</div>
          </div>
          <div className="flex items-center gap-3 ml-auto mr-5">
            <Button variant="outline" size="sm">
              Nik Shop <ChevronDown />
            </Button>
            <div className="relative">
              <ButtonIcon className="size-10">
                <Bell />
              </ButtonIcon>
              <Badge
                className="absolute top-0 right-0 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                variant="destructive"
              >
                4
              </Badge>
            </div>
            <Avatar className="rounded-lg">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/20764729?s=48&v=4"
              />
              <AvatarFallback>KM</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
