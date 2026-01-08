'use client'

import React from 'react'
import { Check, X } from 'lucide-react'

export function PricingLogic() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-midnight mb-4">Pricing Transparency: Single Services vs. Bundles</h2>
                        <p className="text-slate-600">We want you to see exactly where the value comes from.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Left: Separate Services */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-400 uppercase text-sm tracking-wider mb-6">Typical Separate Costs</h3>

                            <div className="flex justify-between items-center py-3 border-b border-slate-200 border-dashed">
                                <span className="text-slate-600 font-medium">Landing Page</span>
                                <span className="font-bold text-slate-800">RM 899</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-slate-200 border-dashed">
                                <span className="text-slate-600 font-medium">Multi-Page Website</span>
                                <span className="font-bold text-slate-800">RM 1,899</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-slate-200 border-dashed">
                                <span className="text-slate-600 font-medium">Google Ads Mgmt</span>
                                <span className="font-bold text-slate-800">RM 800 - 2,500/mo</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-slate-200 border-dashed">
                                <span className="text-slate-600 font-medium">Meta Ads Mgmt</span>
                                <span className="font-bold text-slate-800">RM 700 - 2,800/mo</span>
                            </div>

                            <div className="pt-4 text-right">
                                <p className="text-sm text-slate-500 italic">Separate vendors often mean misaligned goals.</p>
                            </div>
                        </div>

                        {/* Right: Bundle Logic */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-brand-indigo uppercase text-sm tracking-wider mb-6">Why Bundle With Us?</h3>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <Check className="h-3 w-3 text-green-600" />
                                    </div>
                                    <span className="text-slate-700 text-sm">Better value than separate purchases</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <Check className="h-3 w-3 text-green-600" />
                                    </div>
                                    <span className="text-slate-700 text-sm">Professional agency margins maintained</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <Check className="h-3 w-3 text-green-600" />
                                    </div>
                                    <span className="text-slate-700 text-sm">One cohesive growth strategy</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <Check className="h-3 w-3 text-green-600" />
                                    </div>
                                    <span className="text-slate-700 text-sm">Everything fully integrated & tracked</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
