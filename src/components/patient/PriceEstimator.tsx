'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    DollarSign,
    TrendingDown,
    TrendingUp,
    Info,
    Calculator
} from 'lucide-react';

interface PriceEstimate {
    procedure: string;
    code: string;
    avgPrice: number;
    lowPrice: number;
    highPrice: number;
    yourEstimate: number;
}

const MOCK_ESTIMATES: PriceEstimate[] = [
    { procedure: 'Root Canal (Molar)', code: 'D3330', avgPrice: 1200, lowPrice: 800, highPrice: 1800, yourEstimate: 950 },
    { procedure: 'Porcelain Crown', code: 'D2740', avgPrice: 1400, lowPrice: 900, highPrice: 2200, yourEstimate: 1100 },
    { procedure: 'Dental Cleaning', code: 'D1110', avgPrice: 150, lowPrice: 80, highPrice: 250, yourEstimate: 120 },
];

export function PriceEstimator() {
    const [selectedProcedure, setSelectedProcedure] = React.useState<PriceEstimate>(MOCK_ESTIMATES[0]);

    const savingsPercent = Math.round(((selectedProcedure.avgPrice - selectedProcedure.yourEstimate) / selectedProcedure.avgPrice) * 100);
    const savings = selectedProcedure.avgPrice - selectedProcedure.yourEstimate;

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-brand-primary" />
                    Price Estimator
                </h3>
            </div>

            {/* Procedure Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
                {MOCK_ESTIMATES.map(est => (
                    <button
                        key={est.code}
                        onClick={() => setSelectedProcedure(est)}
                        className={cn(
                            "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                            selectedProcedure.code === est.code
                                ? "bg-brand-primary text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                    >
                        {est.procedure}
                    </button>
                ))}
            </div>

            {/* Price Visualization */}
            <div className="space-y-4">
                {/* Range Bar */}
                <div className="relative pt-8 pb-4">
                    <div className="h-3 bg-gradient-to-r from-emerald-200 via-amber-200 to-red-200 rounded-full" />

                    {/* Your Estimate Marker */}
                    <div
                        className="absolute top-0 transform -translate-x-1/2"
                        style={{
                            left: `${((selectedProcedure.yourEstimate - selectedProcedure.lowPrice) / (selectedProcedure.highPrice - selectedProcedure.lowPrice)) * 100}%`
                        }}
                    >
                        <div className="bg-brand-primary text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                            ${selectedProcedure.yourEstimate}
                        </div>
                        <div className="w-0.5 h-4 bg-brand-primary mx-auto" />
                    </div>

                    {/* Labels */}
                    <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>${selectedProcedure.lowPrice}</span>
                        <span className="font-medium">Avg: ${selectedProcedure.avgPrice}</span>
                        <span>${selectedProcedure.highPrice}</span>
                    </div>
                </div>

                {/* Savings Card */}
                {savings > 0 && (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <TrendingDown className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-bold text-emerald-800">
                                Save ${savings} ({savingsPercent}% below average)
                            </p>
                            <p className="text-xs text-emerald-600">
                                Based on bids from dentists in your area
                            </p>
                        </div>
                    </div>
                )}

                {/* Info */}
                <div className="flex items-start gap-2 text-xs text-slate-500">
                    <Info className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Prices based on San Francisco area. Actual costs may vary based on your insurance and specific needs.</span>
                </div>
            </div>
        </Card>
    );
}
