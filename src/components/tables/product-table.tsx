"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ButtonIcon } from "@/components/ui/button-icon"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { formatCurrency, formatDateTable } from "@/lib/utils"
import type { AppDispatch } from '@/store';
import { deleteProduct } from '@/store/productSlice';
import type { Pagination } from "@/types"
import type { ProductListResponse, ProductResponse } from "@/types/product"
import { Link } from "@tanstack/react-router"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  CalendarDays,
  Pencil,
  Search,
  SlidersHorizontal,
  Trash,
  TriangleAlert,
} from "lucide-react"
import * as React from "react"
import { useDispatch } from 'react-redux';
import { TablePagination } from "../table-pagination"
import { Skeleton } from "../ui/skeleton"

export const columns: ColumnDef<ProductResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Product",
    cell: ({ row }) => {
      const original = row.original

      return (
        <div className="flex items-center gap-2">
          <Avatar className="rounded-lg">
            <AvatarImage
              src={original.thumbnail}
            />
          </Avatar>
          <div>
            <div className="capitalize">{row.getValue("title")}</div>
            <div className="text-gray-400 text-xs capitalize">
              {original.variant} Variants
            </div>
          </div>
        </div>
      )},
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => (
      <div className="capitalize text-blue-600">{row.getValue("sku")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("stock")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = Number(row.getValue("price"))
      return <div className="text-right font-medium">{formatCurrency(price)}</div>
    },
  },
  {
    accessorKey: "added",
    header: () => <div className="text-right">Added</div>,
    cell: ({ row }) => (
      <div className="text-right capitalize">
        {formatDateTable(row.getValue("added"))}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const original = row.original

      return (
        <div className="text-right space-x-1">
          <Link
            to="/admin/products/$productId/edit"
            params={{ productId: `${original.id}` }}
          >
            <ButtonIcon>
              <Pencil />
            </ButtonIcon>
          </Link>
          <DeleteProductDialog productId={original.id} />
        </div>
      )
    },
  },
]

function DeleteProductDialog({ productId }: { productId: number | string }) {
  const dispatch: AppDispatch = useDispatch();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ButtonIcon>
          <Trash />
        </ButtonIcon>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this product from servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => dispatch(deleteProduct(`${productId}`))}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function MainTable({ data }: { data?: ProductListResponse }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    columns,
    data: data?.products || [],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return <div className="overflow-hidden rounded-md border">
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
}

export function ProductTable({ data, status, search }: { data?: ProductListResponse, status:"error" | "success" | "pending", search: Pagination }) {
  const showPageInfo = (search: Pagination): string => {
    const pageIndex = search.skip ? search.skip : 1;
    const total = data?.total ? data.total : 0;
    const fromRow = (pageIndex * 10 - 10) || 1
    const toRow = (pageIndex * 10) > total ? total : (pageIndex * 10)

    return `${fromRow} - ${toRow} from ${total ?? 0}`;
  }

  return (
    <div className="w-full">
      <div className="flex md:flex-row flex-col items-center justify-between">
        <Tabs defaultValue="All Product">
          <TabsList>
            <TabsTrigger className="text-primary" value="All Product">All Product</TabsTrigger>
            <TabsTrigger className="text-primary" value="Published">Published</TabsTrigger>
            <TabsTrigger className="text-primary" value="Low Stock">Low Stock</TabsTrigger>
            <TabsTrigger className="text-primary" value="Draft">Draft</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center py-4 gap-2">
          <div className="w-3xs relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <span className="sr-only">Search</span>
              <Input
                placeholder="Search product..."
                className="block w-full py-2 pr-3 pl-9 text-gray-700"
                type="text" name="search"
              />
          </div>
          <Button variant="outline" size="sm">
            <CalendarDays /> Select Date
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal /> Filters
          </Button>
        </div>
      </div>
      {
        status === 'pending' ?
          <Skeleton className="mt-6 h-[500px] w-full rounded-xl" />
        : status === 'error' ?
          <div className="mt-6 h-[325px] w-full rounded-xl flex gap-2 items-center justify-center text-red-500">
            <TriangleAlert /> Failed to load data
          </div>
        : <MainTable data={data} />
      }

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {showPageInfo(search)}
        </div>
          <TablePagination search={search} totalItems={data?.total ?? 0} />
      </div>
    </div>
  )
}
