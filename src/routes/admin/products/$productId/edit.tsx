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
import { Save, X } from "lucide-react"
import { makeData } from "../../../../components/tables/demo-table-data"

export const Route = createFileRoute('/admin/products/$productId/edit')({
  component: EditProduct,
})

const tempData = makeData(1)

function EditProduct() {
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
        <Button variant="outline"> <X /> Cancel</Button>
        <Button type="submit" form="edit-product"><Save /> Save Product</Button>
      </div>
    </div>
    <ProductForm id="edit-product" data={tempData[0]} />
  </div>
}

