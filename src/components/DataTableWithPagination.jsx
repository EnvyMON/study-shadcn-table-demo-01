import React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue(),
  }),
]

// 샘플 데이터 100개 생성
// type User = {
//   id: number
//   name: string
//   age: number
//   email: string
//   date: string
// }

const users = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  age: 20 + (i % 30),
  email: `user${i + 1}@example.com`,
  date: new Date(2024, 0, (i % 30) + 1).toISOString().split("T")[0],
}))

export default function DataTableWithPagination() {
  const [data] = React.useState(() => [...users])

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10, // 기본 페이지 사이즈
  })


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
	state: {
		pagination,
	},
	onPaginationChange: setPagination
  })

  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex

  // 페이지네이션에 표시할 숫자들 계산
  const getVisiblePages = () => {
    if (pageCount <= 7) {
      return [...Array(pageCount).keys()].map((i) => i + 1)
    }

    if (currentPage < 3) {
      return [1, 2, 3, '...', pageCount]
    }

    if (currentPage > pageCount - 4) {
      return [1, '...', pageCount - 2, pageCount - 1, pageCount]
    }

    return [1, '...', currentPage + 1, currentPage + 2, '...', pageCount]
  }


  return (
    <div className="p-4 space-y-4">
      {/* 테이블 */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 페이지 사이즈 선택 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          
          <select
            className="ml-2 border px-2 py-1 rounded"
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination((prev) => ({
                ...prev,
                pageSize: Number(e.target.value),
              }))
            }
          >
            {[5, 10, 20, 50, 100, 1000].map((size) => (
              <option key={size} value={size}>
                {size}개
              </option>
            ))}
          </select>
        </div>

        {/* 페이지네이션 */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  table.previousPage()
                }}
              />
            </PaginationItem>
            {/* {Array.from({ length: table.getPageCount() }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={index === table.getState().pagination.pageIndex}
                  onClick={(e) => {
                    e.preventDefault()
                    table.setPageIndex(index)
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))} */}
			{getVisiblePages().map((page, index) =>
              typeof page === "string" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page - 1}
                    onClick={(e) => {
                      e.preventDefault()
                      table.setPageIndex(page - 1)
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  table.nextPage()
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}