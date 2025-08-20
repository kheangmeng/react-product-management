"use client"

import { formatCurrency, formatDateTable } from "@/lib/utils"
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
  SlidersHorizontal,
  StepBack,
  StepForward,
  Trash
} from "lucide-react"
import * as React from "react"

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
import type { ProductResponse } from "@/types/product"
import { makeData } from "./demo-table-data"

const data: ProductResponse[] = makeData(10)

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
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="bg-muted/80 w-8 h-8 rounded-sm" />
        <div>
          <div className="capitalize">{row.getValue("title")}</div>
          <div className="text-gray-400 text-xs capitalize">{2} Variants</div>
        </div>
      </div>
    ),
  },
  // {
  //   accessorKey: "variant",
  //   header: "Variant",
  //   cell: ({ row }) => (
  //     <div className="capitalize text-blue-600">{row.getValue("variant")}</div>
  //   ),
  // },
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
      <div className="text-right capitalize">{formatDateTable(row.getValue("added"))}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const original = row.original

      return (
        <div className="text-right space-x-1">
          <Link to={`/admin/products/${original.id}/edit`}>
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
  const handleDelete = () => {
    console.log(`Product with ID ${productId} deleted.`)
  }

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
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function ProductTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
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

  return (
    <div className="w-full">
      <div className="flex md:flex-row flex-col items-center justify-between">
        <Tabs defaultValue="All Product">
          <TabsList>
            <TabsTrigger value="All Product">All Product</TabsTrigger>
            <TabsTrigger value="Published">Published</TabsTrigger>
            <TabsTrigger value="Low Stock">Low Stock</TabsTrigger>
            <TabsTrigger value="Draft">Draft</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder="Search product..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="w-3xs"
          />
          <Button variant="outline" size="sm">
            <CalendarDays /> Select Date
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal /> Filters
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          Showing 1-10 from {table.getFilteredRowModel().rows.length}
        </div>
        <div className="flex space-x-2">
          <ButtonIcon
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <StepBack />
          </ButtonIcon>

          <ButtonIcon
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            1
          </ButtonIcon>
          <ButtonIcon
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            2
          </ButtonIcon>
          <ButtonIcon
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            3
          </ButtonIcon>

          <ButtonIcon
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <StepForward />
          </ButtonIcon>
        </div>
      </div>
    </div>
  )
}
