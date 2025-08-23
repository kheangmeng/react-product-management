import { getCategoryList } from "@/api/category/fetch-api"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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
import type { AppDispatch } from '@/store';
import { addProduct, editProduct } from '@/store/productSlice';
import type { Product, ProductResponse } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { type UseFormReturn, useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';

import { z } from "zod"

type SchemaForm = UseFormReturn<Product, any, Product>
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  discountPercentage: z.coerce.number({
    message: "Discount percentage must be a positive number.",
  }),
  sku: z.string().min(1, {
    message: "SKU is required.",
  }),
  stock: z.coerce.number().min(1, {
    message: "Quantity must be a non-negative number.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
})

function GeneralInformationForm({form}: { form: SchemaForm}) {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">Product Name</FormLabel>
                <FormControl>
                  <Input className="bg-slate-50" placeholder="Type product name here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">Description</FormLabel>
                <FormControl>
                  <Textarea className="bg-slate-50" placeholder="Type product description here...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function PriceForm({form}: { form: SchemaForm}) {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Price</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">Base Price</FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-50"
                    type="number"
                    placeholder="$ Type base price here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">Discount Percentage</FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-50"
                    type="number"
                    placeholder="Type discount percentage here...."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function InventoryForm({form}: { form: SchemaForm}) {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          <div className="grid gap-2 w-1/2">
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">SKU</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-50"
                      type="text"
                      placeholder="Type product SKU here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2 w-1/2">
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">Quantity</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-50"
                      type="number"
                      placeholder="Type product quantity here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CategoryForm({form}: { form: SchemaForm}) {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategoryList(),
    initialData: [],
  })

  return (
    <Card >
      <CardHeader>
        <CardTitle>Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 w-full">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">Product Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger
                          id="category"
                          className="w-full bg-slate-50"
                          {...field}
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {
                            data.map((category) => (
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductForm({ id, data, action }: { id?: string, data?: ProductResponse, action: 'add' | 'edit' }) {
  const dispatch: AppDispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      price: data?.price || 0,
      discountPercentage: data?.discountPercentage || 0,
      sku: data?.sku || "",
      stock: data?.stock || 0,
      category: data?.category || "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    if(action === 'add') {
      dispatch(addProduct(values))
    } else {
      dispatch(editProduct({ ...values, id: data?.id || '' }))
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id={id} className="flex md:flex-row flex-col gap-6">
        <div className="flex flex-col gap-6 md:w-2/3 w-1/1">
          <GeneralInformationForm form={form} />
          <PriceForm form={form} />
          <InventoryForm form={form} />
        </div>
        <div className="md:w-1/3 w-1/1 mx-auto">
          <CategoryForm form={form} />
        </div>
      </form>
    </Form>
  )
}
