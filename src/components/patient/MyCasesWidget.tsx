'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    FileText,
    Clock,
    DollarSign,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    Eye
} from 'lucide-react';
import Link from 'next/link';

interface Case {
    id: string;
    title: string;
    status: 'Open for Bids' | 'In Progress' | 'Completed';
    createdAt: string;
    bidsCount: number;
    lowestBid?: number;
}

const MOCK_CASES: Case[] = [
    { id: 'c101', title: 'Emergency: Molar Pain', status: 'Open for Bids', createdAt: '2 hours ago', bidsCount: 3, lowestBid: 850 },
    { id: 'c102', title: 'Cosmetic: Gap Closure', status: 'In Progress', createdAt: '2 days ago', bidsCount: 5, lowestBid: 1200 },
    { id: 'c103', title: 'Routine Cleaning', status: 'Completed', createdAt: '1 week ago', bidsCount: 4, lowestBid: 150 },
];

export function MyCasesWidget() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-900">My Cases</h3>
                <Link href="/patient/cases">
                    <Button variant="link" size="sm" className="gap-1 text-brand-primary">
                        View All <ArrowRight className="h-3 w-3" />
                    </Button>
                </Link>
            </div>

            <div className="space-y-3">
                {MOCK_CASES.map(caseItem => (
                    <div
                        key={caseItem.id}
                        className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer group"
                    >
                        <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center",
                            caseItem.status === 'Open for Bids' && "bg-blue-100 text-blue-600",
                            caseItem.status === 'In Progress' && "bg-amber-100 text-amber-600",
                            caseItem.status === 'Completed' && "bg-emerald-100 text-emerald-600"
                        )}>
                            {caseItem.status === 'Open for Bids' && <FileText className="h-5 w-5" />}
                            {caseItem.status === 'In Progress' && <Clock className="h-5 w-5" />}
                            {caseItem.status === 'Completed' && <CheckCircle className="h-5 w-5" />}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 truncate">{caseItem.title}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                                <span>{caseItem.createdAt}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />
                                    {caseItem.bidsCount} bids
                                </span>
                                {caseItem.lowestBid && (
                                    <>
                                        <span>•</span>
                                        <span className="text-emerald-600 font-medium">From ${caseItem.lowestBid}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <span className={cn(
                            "px-2 py-1 rounded-lg text-xs font-semibold whitespace-nowrap",
                            caseItem.status === 'Open for Bids' && "bg-blue-50 text-blue-700",
                            caseItem.status === 'In Progress' && "bg-amber-50 text-amber-700",
                            caseItem.status === 'Completed' && "bg-emerald-50 text-emerald-700"
                        )}>
                            {caseItem.status}
                        </span>

                        <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </Card>
    );
}
