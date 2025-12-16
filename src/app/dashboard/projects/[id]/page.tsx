
import { getProjectById } from '../actions'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WebsiteDetailsTab } from './website-details-tab'

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const project = await getProjectById(id)

    if (!project) return <div>Project not found</div>

    // Calculations
    const totalInvoiced = project.invoices?.reduce((sum: number, inv: any) => sum + (inv.total || 0), 0) || 0
    const totalExpenses = project.expenses?.reduce((sum: number, exp: any) => sum + (exp.amount || 0), 0) || 0
    const totalAddons = project.addons?.reduce((sum: number, add: any) => sum + (add.price || 0), 0) || 0
    const profit = totalInvoiced - totalExpenses

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold">{project.name}</h1>
                    <p className="text-muted-foreground">{project.clients?.name}</p>
                    {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{project.url}</a>
                    )}
                </div>
                <Badge className="text-lg" variant="outline">
                    {project.status?.toUpperCase()}
                </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Billed Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">RM {totalInvoiced.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Total from Invoices</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">- RM {totalExpenses.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Total Project Costs</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Add-ons Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">RM {totalAddons.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Extra Services Logged</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            RM {profit.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">Revenue - Expenses</p>
                    </CardContent>
                </Card>
            </div>



            <Tabs defaultValue="invoices" className="w-full">
                <TabsList>
                    <TabsTrigger value="invoices">Invoices</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    <TabsTrigger value="addons">Add-ons</TabsTrigger>
                    <TabsTrigger value="financials">Financials</TabsTrigger>
                    <TabsTrigger value="web_details">Website Details</TabsTrigger>
                </TabsList>
                <TabsContent value="invoices">
                    {/* ... invoices content ... */}
                    <Card>
                        <CardHeader><CardTitle>Project Invoices</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Number</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {project.invoices?.map((inv: any) => (
                                        <TableRow key={inv.id}>
                                            <TableCell>{inv.invoice_number}</TableCell>
                                            <TableCell>{inv.date}</TableCell>
                                            <TableCell><Badge variant="outline">{inv.status}</Badge></TableCell>
                                            <TableCell className="text-right">RM {inv.total?.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                    {(!project.invoices || project.invoices.length === 0) && <TableRow><TableCell colSpan={4} className="text-center">No invoices found.</TableCell></TableRow>}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="expenses">
                    <Card>
                        <CardHeader><CardTitle>Project Expenses</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {project.expenses?.map((exp: any) => (
                                        <TableRow key={exp.id}>
                                            <TableCell>{exp.date}</TableCell>
                                            <TableCell>{exp.description}</TableCell>
                                            <TableCell className="capitalize">{exp.category?.replace('_', ' ')}</TableCell>
                                            <TableCell className="text-right">RM {exp.amount?.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                    {(!project.expenses || project.expenses.length === 0) && <TableRow><TableCell colSpan={4} className="text-center">No expenses found.</TableCell></TableRow>}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="addons">
                    <Card>
                        <CardHeader><CardTitle>Add-on Services</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Note</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {project.addons?.map((add: any) => (
                                        <TableRow key={add.id}>
                                            <TableCell>{add.date}</TableCell>
                                            <TableCell>{add.description}</TableCell>
                                            <TableCell>{add.note}</TableCell>
                                            <TableCell className="text-right">RM {add.price?.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                    {(!project.addons || project.addons.length === 0) && <TableRow><TableCell colSpan={4} className="text-center">No add-ons found.</TableCell></TableRow>}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="financials">
                    <Card>
                        <CardHeader>
                            <CardTitle>Financial Details</CardTitle>
                            <CardDescription>Breakdown of project financials.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span>Base Price</span>
                                <span>RM {project.base_price?.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                                <span>Total Invoiced</span>
                                <span>RM {totalInvoiced.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-red-600">
                                <span>Total Expenses</span>
                                <span>- RM {totalExpenses.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Net Profit</span>
                                <span>RM {profit.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="web_details">
                    <WebsiteDetailsTab project={project} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
