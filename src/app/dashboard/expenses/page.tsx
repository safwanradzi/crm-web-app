import { getExpenses } from './actions'
import { getProjects } from '../projects/actions'
import { ExpenseDialog } from './expense-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { PaginationControls } from '@/components/ui/pagination-controls'

export const dynamic = 'force-dynamic'

export default async function ExpensesPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1
    const limit = 10
    const { data: expenses, totalCount } = await getExpenses(page, limit)
    const { data: allProjects } = await getProjects(1, 1000) // Fetch all projects for dropdown
    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="flex flex-col gap-4" key={page}>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Expenses</h1>
                <ExpenseDialog projects={allProjects} />
            </div>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Expense Log</CardTitle>
                    <CardDescription>
                        Track your business spending.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="hidden sm:table-cell">Project</TableHead>
                                <TableHead className="hidden sm:table-cell">Recurring</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {expenses.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell>
                                        {expense.date}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {expense.description}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">{expense.category?.replace('_', ' ')}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {expense.projects?.name || '-'}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {expense.is_recurring ? (
                                            <Badge variant="secondary" className="capitalize">{expense.recurring_interval}</Badge>
                                        ) : '-'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        RM {expense.amount?.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-4">
                        <PaginationControls
                            hasNextPage={page < totalPages}
                            hasPrevPage={page > 1}
                            totalCount={totalCount}
                            totalPages={totalPages}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
