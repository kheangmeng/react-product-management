import { getProductList } from "@/api/product/fetch-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { AppDispatch, RootState } from '@/store';
import { resetStore } from '@/store/productSlice';
import type { Pagination } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useRouterState } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Download, Plus, Search } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "sonner"
import { ProductTable } from '../../../components/tables/product-table'

export const Route = createFileRoute('/admin/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const search: Pagination = routerState.location.search;
  const { data, status: fetchingStatus } = useQuery({
    queryKey: ['products', search.skip],
    queryFn: () => getProductList({skip: search.skip || 1, limit: 10}),
    initialData: undefined,
  })

  const dispatch: AppDispatch = useDispatch();
  const { error, status, successMessage } = useSelector((state: RootState) => state.products);

  if (status === 'succeeded' && successMessage) {
    toast.success(successMessage)
    dispatch(resetStore())
    queryClient.invalidateQueries({ queryKey: ['products'] })
  }
  if (status === 'failed' && error) {
    toast.error(error)
    dispatch(resetStore())
  }

  return (
    <main>
      <div className="flex items-center py-4 gap-2">
        <div className="w-full relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <span className="sr-only">Search</span>
            <Input
              placeholder="Search order..."
              className="block w-full py-2 pr-3 pl-9 text-gray-700"
              type="text" name="search"
            />
        </div>
        <Button variant="secondary" className="text-primary">
          <Download /> Export
        </Button>
        <Link to="/admin/products/add">
          <Button>
            <Plus /> Add Product
          </Button>
        </Link>
      </div>
      <ProductTable data={data} status={fetchingStatus} search={search} />
    </main>
  )
}
