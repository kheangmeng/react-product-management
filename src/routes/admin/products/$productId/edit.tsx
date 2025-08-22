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
import { useQuery } from "@tanstack/react-query"
import { Link, createFileRoute, useParams } from '@tanstack/react-router'
import { Save, X } from "lucide-react"

export const Route = createFileRoute('/admin/products/$productId/edit')({
  component: EditProduct,
})

function EditProduct() {
  const { productId } = useParams({ from: '/admin/products/$productId/edit' });
  const { data, status } = useQuery({
    queryKey: ['product-detail', productId],
    queryFn: () => getProduct(Number(productId)),
    initialData: undefined,
  })

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
        <Button type="submit" form="edit-product"><Save /> Save Product</Button>
      </div>
    </div>
    { status === 'success' && <ProductForm id="edit-product" data={data} action="edit" /> }
  </div>
}

