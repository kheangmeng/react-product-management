import { useRouterState } from '@tanstack/react-router';
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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
          <SidebarTrigger className="ml-5" />
          <div>{ displayTitle(currentPath) }</div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
