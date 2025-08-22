import { getProductList } from "@/api/product/fetch-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Pagination } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useRouterState } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Download, Plus } from "lucide-react"
import { ProductTable } from '../../../components/tables/product-table'

export const Route = createFileRoute('/admin/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const routerState = useRouterState();
  const search: Pagination = routerState.location.search;
  const { data, status } = useQuery({
    queryKey: ['products', search.skip],
    queryFn: () => getProductList({skip: search.skip, limit: 10}),
    initialData: undefined,
  })

  return (
    <main>
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Search product..."
          className="max-w"
        />
        <Button variant="secondary" className="text-primary">
          <Download /> Export
        </Button>
        <Link to="/admin/products/add">
          <Button>
            <Plus /> Add Product
          </Button>
        </Link>
      </div>
      { status === 'pending' ?
          <span>Loading...</span>
        : <ProductTable data={data} search={search} />
      }
    </main>
  )
}
