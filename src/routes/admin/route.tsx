import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AdminLayout } from '@/layouts/AdminLayout'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<AdminLayout><Outlet /></AdminLayout>)
}
