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
import { createFileRoute } from '@tanstack/react-router'
import { Plus, X } from "lucide-react"

export const Route = createFileRoute('/admin/products/add')({
  component: AddProduct,
})

function AddProduct() {
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
            <BreadcrumbPage>Add Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='flex gap-3'>
        <Button variant="outline"> <X /> Cancel</Button>
        <Button type="submit" form="add-product"><Plus /> Add Product</Button>
      </div>
    </div>
    <ProductForm id="add-product" />
  </div>
}
