
import { getExpenses } from './actions'
import { getProjects } from '../projects/actions'
import { ExpenseDialog } from './expense-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function ExpensesPage() {
    const expenses = await getExpenses()
    const projects = await getProjects()

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Expenses</h1>
                <ExpenseDialog projects={projects} />
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
                </CardContent>
            </Card>
        </div>
    )
}
