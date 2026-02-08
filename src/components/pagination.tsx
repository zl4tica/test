import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {
    // Calculate which page numbers to show (current, before, after)
    const getPageNumbers = () => {
        const pages: number[] = [];

        // Always show current page
        pages.push(currentPage);

        // Add previous page if exists
        if (currentPage > 1) {
            pages.unshift(currentPage - 1);
        }

        // Add next page if exists
        if (currentPage < lastPage) {
            pages.push(currentPage + 1);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    if (lastPage <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 py-4">
            {/* Previous Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-9 w-9 p-0 disabled:opacity-50"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            <div className="flex gap-1">
                {pageNumbers.map((pageNum) => (
                    <Button
                        key={pageNum}
                        variant={pageNum === currentPage ? "default" : "ghost"}
                        size="sm"
                        onClick={() => onPageChange(pageNum)}
                        className={`h-9 w-9 p-0 ${pageNum === currentPage
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "hover:bg-gray-100 dark:hover:bg-slate-800"
                            }`}
                    >
                        {pageNum}
                    </Button>
                ))}
            </div>

            {/* Next Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="h-9 w-9 p-0 disabled:opacity-50"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
        </div>
    );
}
