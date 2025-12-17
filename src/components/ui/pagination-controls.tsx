'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationControlsProps {
    hasNextPage: boolean
    hasPrevPage: boolean
    totalCount: number
    totalPages: number
}

export function PaginationControls({
    hasNextPage,
    hasPrevPage,
    totalCount,
    totalPages,
}: PaginationControlsProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '10'

    const currentPage = Number(page)
    const itemsPerPage = Number(per_page)

    const start = (currentPage - 1) * itemsPerPage + 1
    const end = Math.min(currentPage * itemsPerPage, totalCount)

    return (
        <div className="flex items-center justify-between px-2">
            <div className="hidden text-sm text-muted-foreground md:block">
                Showing {start}-{end} of {totalCount} rows
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={!hasPrevPage}
                    onClick={() => {
                        const params = new URLSearchParams(searchParams.toString())
                        params.set('page', String(currentPage - 1))
                        router.push(`?${params.toString()}`)
                    }}
                >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={!hasNextPage}
                    onClick={() => {
                        const params = new URLSearchParams(searchParams.toString())
                        params.set('page', String(currentPage + 1))
                        router.push(`?${params.toString()}`)
                    }}
                >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
