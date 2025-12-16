'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PortfolioItem {
    id: string
    title: string
    category: string
    description: string
    image_url: string
    live_url?: string
}

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
    const [filter, setFilter] = useState("All")

    const filteredItems = items.filter((item) => {
        if (filter === "All") return true
        return item.category === filter
    })

    const categories = ["All", "Landing Page", "Corporate Website", "Ecommerce Website"]

    return (
        <div className="space-y-12">
            {/* Filter Tabs */}
            <div className="flex justify-center">
                <Tabs defaultValue="All" className="w-full max-w-3xl" onValueChange={setFilter}>
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-slate-100/80 rounded-full">
                        {categories.map((cat) => (
                            <TabsTrigger
                                key={cat}
                                value={cat}
                                className="rounded-full data-[state=active]:bg-brand-indigo data-[state=active]:text-white data-[state=active]:shadow-md py-3 transition-all duration-300"
                            >
                                {cat}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            {/* Grid */}
            {filteredItems.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 bg-white flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
                            <div className="relative h-64 bg-slate-100 overflow-hidden">
                                {item.image_url ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-slate-300 font-medium">Coming Soon</div>
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-2">
                                    <span className="text-xs font-bold text-brand-indigo uppercase tracking-wider">{item.category}</span>
                                </div>
                                <h3 className="text-xl font-bold text-brand-midnight mb-3 group-hover:text-brand-indigo transition-colors">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                    {item.description}
                                </p>
                                {item.live_url && (
                                    <a href={item.live_url} target="_blank" rel="noopener noreferrer" className="mt-auto">
                                        <Button variant="outline" className="w-full border-slate-200 hover:border-brand-indigo hover:text-brand-indigo gap-2 group-hover:bg-indigo-50">
                                            Visit Website <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-500 mb-4">No projects found in this category.</p>
                </div>
            )}
        </div>
    )
}
