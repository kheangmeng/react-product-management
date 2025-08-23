import { getProduct } from "@/api/product/fetch-api"
import { ProductForm } from "@/components/forms/product-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { AppDispatch, RootState } from '@/store';
import { resetStore } from '@/store/productSlice';
import { useQuery } from "@tanstack/react-query"
import { Link, createFileRoute, useParams } from '@tanstack/react-router'
import { useRouter } from "@tanstack/react-router"
import { Save, X } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "sonner"

export const Route = createFileRoute('/admin/products/$productId/edit')({
  component: EditProduct,
})

function EditProduct() {
  const { productId } = useParams({ from: '/admin/products/$productId/edit' });
  const { data, status: fetchingStatus } = useQuery({
    queryKey: ['product-detail', productId],
    queryFn: () => getProduct(Number(productId)),
    initialData: undefined,
  })

  const router = useRouter()
  const dispatch: AppDispatch = useDispatch();
  const { error, status, successMessage } = useSelector((state: RootState) => state.products);

  if (status === 'succeeded' && successMessage) {
    toast.success(successMessage)
    dispatch(resetStore())
    router.navigate({ to: '/admin/products', search: { skip: 1 } })
  }
  if (status === 'failed' && error) {
    toast.error(error)
    dispatch(resetStore())
  }

  return <div>
    <div className="flex justify-between items-center gap-2 px-3 mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">
              Product
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='flex gap-3'>
        <Link to="/admin/products" search={{ skip: 1 }}>
          <Button variant="outline"> <X /> Cancel</Button>
        </Link>
        <Button disabled={status === 'loading'} type="submit" form="edit-product">
          { status === 'loading' ? 'Loading...' : <><Save /> Save Product</> }
        </Button>
      </div>
    </div>
    {
      fetchingStatus === 'pending' ?
          <Skeleton className="mt-6 h-[325px] w-full rounded-xl" />
        : <ProductForm id="edit-product" data={data} action="edit" />
    }
  </div>
}

