"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  Pencil,
  Trash,
  StepBack,
  StepForward,
  CalendarDays,
  SlidersHorizontal
} from "lucide-react"
import { formatDateTable, formatCurrency } from "@/lib/utils"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
import { makeData } from "./demo-table-data"
import type { ProductResponse } from "@/types/product"

const data: ProductResponse[] = makeData(10)
console.log(data)

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
      const price = parseFloat(row.getValue("price"))
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
      const payment = row.original

      return (
        <div className="text-right space-x-1">
          <ButtonIcon disabled onClick={() => navigator.clipboard.writeText(payment.id + '')}>
            <Pencil />
          </ButtonIcon>
          <ButtonIcon disabled>
            <Trash />
          </ButtonIcon>
        </div>
      )
    },
  },
]

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
