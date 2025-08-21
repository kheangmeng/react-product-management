"use client"

import { formatCurrency, formatDateTable } from "@/lib/utils"
import { Link, useRouterState } from "@tanstack/react-router"
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
import type { Pagination } from "@/types"
import type { ProductResponse } from "@/types/product"
import { useQuery } from "@tanstack/react-query"
import { makeData } from "./demo-table-data"

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
          <div className="bg-slate-300 w-8 h-8 rounded-sm" />
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

function PaginationTable({search}: { search: Pagination }) {
  return (
    <div className="flex space-x-2">
      <Link
        to="/admin/products"
        search={{ skip: 1 }}
        disabled={!search.skip || search.skip === 1}
      >
        <Button
          variant="secondary"
          className="text-primary"
          size="sm"
          disabled={!search.skip || search.skip === 1}
        >
          <StepBack />
        </Button>
      </Link>

      {
        [1,2,3,4,5].map((page) => (
          <Link
            to="/admin/products"
            search={{ skip: page }}
            disabled={!search.skip || search.skip === page}
            key={page}
          >
            <Button
              variant={search.skip === page ? undefined : "secondary"}
              className={search.skip === page ? "active:bg-primary active:text-white" : "text-primary"}
              size="sm"
              disabled={!search.skip || search.skip === page}
            >
              {page}
            </Button>
          </Link>
        ))
      }
      <ButtonIcon
        variant="ghost"
        size="sm"
        disabled
      >
        ...
      </ButtonIcon>

      <Link
        to="/admin/products"
        search={{ skip: 6 }}
        disabled={search.skip === 6}
      >
        <ButtonIcon
          variant="secondary"
          className="text-primary"
          size="sm"
          disabled={search.skip === 6}
        >
          <StepForward />
        </ButtonIcon>
      </Link>
    </div>
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

  const routerState = useRouterState();
  const search: Pagination = routerState.location.search;
  const { data } = useQuery({
    queryKey: ['products', search.skip],
    queryFn: () =>
      Promise.resolve(makeData(10)),
    initialData: [],
  })

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
  const showPageInfo = (search: Pagination): string => {
    const pageIndex = search.skip ? search.skip : 1;

    return `${(pageIndex * 10 - 10) || 1} - ${pageIndex * 10} from 30`;
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
          {showPageInfo(search)}
        </div>
          <PaginationTable search={search} />
      </div>
    </div>
  )
}
