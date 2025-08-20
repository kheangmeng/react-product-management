import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { ProductResponse } from "@/types"
import { toast } from "sonner"

const categories = [
  { value: 'smartphone', label: 'Smartphone' },
  { value: 'laptop', label: 'Laptop'},
  { value: 'tablet', label: 'Tablet' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'wearables', label: 'Wearables' },
  { value: 'gaming', label: 'Gaming' },
]

function submitForm(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  toast.success("Product has been added")
  console.log("Form submitted")
}

export function ProductForm({ id, data }: { id?: string, data?: ProductResponse }) {
  return (
    <form onSubmit={submitForm} id={id} className="flex md:flex-row flex-col gap-6">
      <div className="flex flex-col gap-6 md:w-2/3 w-1/1">
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="productName" className="text-gray-500">Product Name</Label>
                <Input
                  id="productName"
                  type="text"
                  defaultValue={data?.title || ""}
                  placeholder="Type product name here..."
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-gray-500">Description</Label>
                <Textarea
                  id="description"
                  defaultValue={data?.description || ""}
                  placeholder="Type product description here...."
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-gray-500">Base Price</Label>
                <Input
                  id="price"
                  type="number"
                  defaultValue={data?.price || ""}
                  placeholder="$ Type base price here..."
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount" className="text-gray-500">Discount Percentage (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  defaultValue={data?.discountPercentage || ""}
                  placeholder="Type discount percentage here...."
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="grid gap-2 w-1/2">
                <Label htmlFor="sku" className="text-gray-500">SKU</Label>
                <Input
                  id="sku"
                  type="text"
                  defaultValue={data?.sku || ""}
                  placeholder="Type product SKU here..."
                  required
                />
              </div>
              <div className="grid gap-2 w-1/2">
                <Label htmlFor="quantity" className="text-gray-500">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  defaultValue={data?.stock || ""}
                  placeholder="Type product quantity here..."
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="md:w-1/3 w-1/1 mx-auto">
        <Card >
          <CardHeader>
            <CardTitle>Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6 w-full">
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-gray-500">Product Category</Label>
                <Select defaultValue={data?.category || ""} required>
                  <SelectTrigger
                    id="category"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {
                        categories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
