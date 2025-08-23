import type { Pagination } from "@/types";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonIcon } from "./ui/button-icon";

const getPagination = ({ totalItems, pageSize, siblingCount = 1, currentPage }: {
  totalItems: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}) => {
  const totalPageCount = Math.ceil(totalItems / pageSize);

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  // Pages shown on either side of the current page.
  const totalPageNumbers = siblingCount + 5;

  // Case 1: Total pages less than the number of page buttons we want to show.
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  // Case 2: No left ellipsis, but right ellipsis.
  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, '...', totalPageCount];
  }

  // Case 3: No right ellipsis, but left ellipsis.
  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
    return [firstPageIndex, '...', ...rightRange];
  }

  // Case 4: Both left and right ellipsis.
  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  }

  // Default case (no ellipsis needed)
  return range(1, totalPageCount);
};

export function TablePagination({search, totalItems}: { search: Pagination, totalItems: number }) {
  const pageSize = search.limit ?? 10;
  const currentPage = search.skip ?? 1;
  const paginationRange = getPagination({ totalItems, pageSize, currentPage });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <div className="flex space-x-2">
      <Link
        to="/admin/products"
        search={{ skip: currentPage > 1 ? currentPage - 1 : 1 }}
        disabled={currentPage === 1}
      >
        <Button
          variant="secondary"
          className="text-primary"
          size="sm"
        >
          <ChevronLeft />
        </Button>
      </Link>
      {
        paginationRange.map((pageNumber, index) => {
          const currIndex = `${index}'page'`
          if (pageNumber === '...') {
            return <ButtonIcon key={currIndex} variant="ghost" size="sm" disabled> &#8230; </ButtonIcon>
          }

          return <Link
            to="/admin/products"
            search={{ skip: pageNumber }}
            disabled={pageNumber === currentPage}
            key={currIndex}
          >
            <Button
              variant={pageNumber === currentPage ? undefined : "secondary"}
              className={pageNumber === currentPage ? "active:bg-primary active:text-white" : "text-primary"}
              size="sm"
            >
              {pageNumber}
            </Button>
          </Link>
        })
      }

      <Link
        to="/admin/products"
        search={{ skip: currentPage < Math.ceil(totalItems / pageSize) ? currentPage + 1 : currentPage }}
        disabled={currentPage === Math.ceil(totalItems / pageSize)}
      >
        <ButtonIcon
          variant="secondary"
          className="text-primary"
          size="sm"
        >
          <ChevronRight />
        </ButtonIcon>
      </Link>
    </div>
  )
}
