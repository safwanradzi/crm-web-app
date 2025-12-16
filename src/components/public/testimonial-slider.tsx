'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Testimonial {
    name: string
    role: string
    text: string
    initial: string
}

const testimonials: Testimonial[] = [
    {
        name: "Sarah Jenkins",
        role: "Marketing Director, Aura Glow",
        text: "SR Digital completely transformed our online presence. The new design isn't just beautiful—it actually doubled our lead value in the first month.",
        initial: "S"
    },
    {
        name: "David Chen",
        role: "Founder, Urban Estates",
        text: "Professional, fast, and incredibly talented. They understood our brand vision immediately and delivered a site that exceeded our expectations.",
        initial: "D"
    },
    {
        name: "Michael Ross",
        role: "CEO, TechFlow",
        text: "The best web agency we've worked with. The process was smooth, transparent, and the final result is a high-performance machine.",
        initial: "M"
    },
    {
        name: "Emily Clarke",
        role: "Owner, The Green Pantry",
        text: "I was blown away by the attention to detail. Every pixel feels intentional. Highly recommend SR Digital for any growing business.",
        initial: "E"
    },
    {
        name: "James Wilson",
        role: "Director, Elevate Consulting",
        text: "Their strategic approach to UX/UI is unmatched. We saw an immediate increase in engagement metrics after the relaunch.",
        initial: "J"
    }
]

export function TestimonialSlider() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScrollButtons = () => {
        if (!scrollContainerRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // buffer
    }

    // Update active index based on scroll position
    const handleScroll = () => {
        checkScrollButtons()
        if (!scrollContainerRef.current) return
        const { scrollLeft, clientWidth } = scrollContainerRef.current
        const index = Math.round(scrollLeft / 350) // Approx card width + gap
        setActiveIndex(index)
    }

    useEffect(() => {
        checkScrollButtons()
        window.addEventListener('resize', checkScrollButtons)
        return () => window.removeEventListener('resize', checkScrollButtons)
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return
        const container = scrollContainerRef.current
        const scrollAmount = 400 // card width + gap
        const targetScroll = direction === 'left'
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount

        container.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        })
    }

    const scrollToIndx = (index: number) => {
        if (!scrollContainerRef.current) return
        const container = scrollContainerRef.current
        // Center the card
        const cardWidth = 400
        // const containerWidth = container.clientWidth

        container.scrollTo({
            left: index * cardWidth, // Simple scroll to item
            behavior: 'smooth'
        })
    }

    return (
        <div className="relative max-w-7xl mx-auto">
            {/* Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 hidden md:block">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full shadow-lg border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-0 transition-opacity"
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                >
                    <ArrowLeft className="h-5 w-5 text-brand-midnight" />
                </Button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 hidden md:block">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full shadow-lg border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-0 transition-opacity"
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                >
                    <ArrowRight className="h-5 w-5 text-brand-midnight" />
                </Button>
            </div>

            {/* Scroll Container */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-4 no-scrollbar touch-pan-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {testimonials.map((t, i) => (
                    <div key={i} className="snap-center shrink-0 w-[320px] md:w-[380px]">
                        <Card className="h-full border-none shadow-xl shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-shadow duration-300 relative bg-white overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5">
                                <Quote className="w-24 h-24 text-brand-indigo" />
                            </div>
                            <CardContent className="p-8 flex flex-col h-full relative z-10">
                                <div className="flex text-amber-400 mb-6 space-x-1">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-slate-600 italic leading-relaxed mb-6 flex-grow text-lg">
                                    "{t.text}"
                                </p>
                                <div className="flex items-center gap-4 mt-auto border-t border-slate-50 pt-6">
                                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-brand-indigo font-bold text-xl ring-4 ring-white shadow-sm">
                                        {t.initial}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-midnight">{t.name}</h4>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">{t.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToIndx(i)}
                        className={cn(
                            "h-2.5 rounded-full transition-all duration-300",
                            activeIndex === i
                                ? "w-8 bg-brand-indigo"
                                : "w-2.5 bg-slate-200 hover:bg-slate-300"
                        )}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
