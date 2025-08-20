import { createFileRoute } from '@tanstack/react-router'
import { ProductTable } from '../../../components/tables/ProductTable'
import { Plus, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Search product..."
          className="max-w"
        />
        <Button variant="outline" size="sm">
          <Download /> Export
        </Button>
        <Link to="/admin/products/add">
          <Button variant="outline" size="sm">
            <Plus /> Add Product
          </Button>
        </Link>
      </div>
      <ProductTable />
    </main>
  )
}
