import { getPortfolios, deletePortfolioAction } from './actions'
import { PortfolioDialog } from './portfolio-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, ExternalLink, Edit } from 'lucide-react'
import Image from 'next/image'
import { PaginationControls } from '@/components/ui/pagination-controls'

export const dynamic = 'force-dynamic'

export default async function PortfolioAdminPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const page = typeof params?.page === 'string' ? Number(params.page) : 1
    const limit = 10
    const { data: portfolios, totalCount } = await getPortfolios(page, limit)
    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="flex flex-col gap-4" key={page}>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold md:text-2xl">Portfolio CMS</h1>
                    <p className="text-sm text-muted-foreground">Manage the projects shown on your public website.</p>
                </div>
                <PortfolioDialog />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {portfolios.map((item: any) => (
                    <Card key={item.id} className="overflow-hidden group">
                        <div className="relative h-48 w-full bg-slate-100">
                            {item.image_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-slate-300">
                                    No Image
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2">
                                <PortfolioDialog portfolio={item} trigger={
                                    <Button size="icon" variant="secondary" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                } />
                                <form action={async () => {
                                    'use server'
                                    await deletePortfolioAction(item.id)
                                }}>
                                    <Button size="icon" variant="destructive" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.category}</span>
                                </div>
                                {item.live_url && (
                                    <a href={item.live_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                            <p className="text-sm text-slate-600 line-clamp-3">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {portfolios.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border-2 border-dashed rounded-xl">
                    <p className="text-muted-foreground mb-4">No portfolio items yet.</p>
                    <PortfolioDialog />
                </div>
            )}

            <div className="mt-4">
                <PaginationControls
                    hasNextPage={page < totalPages}
                    hasPrevPage={page > 1}
                    totalCount={totalCount}
                    totalPages={totalPages}
                />
            </div>
        </div>
    )
}
