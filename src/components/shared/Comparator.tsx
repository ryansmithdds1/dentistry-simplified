'use client';

import { Bid } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Star, Check } from "lucide-react";

interface ComparatorProps {
    bids: Bid[];
}

export function Comparator({ bids }: ComparatorProps) {
    if (bids.length === 0) {
        return (
            <div className="text-center py-10 text-slate-500">
                <p>No bids to compare yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-200">
                        <th className="p-4 w-32 bg-slate-50 font-semibold text-slate-500 rounded-tl-lg">Criteria</th>
                        {bids.map(bid => (
                            <th key={bid.id} className="p-4 align-top min-w-[200px] bg-slate-50">
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold text-lg text-slate-900">{bid.dentistName}</span>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span>{bid.rating}</span>
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {/* Price Row */}
                    <tr className="hover:bg-slate-50/50">
                        <td className="p-4 font-medium text-slate-700 bg-slate-50/30">Total Price</td>
                        {bids.map(bid => (
                            <td key={bid.id} className="p-4">
                                <span className="text-2xl font-bold text-brand-primary">${bid.price}</span>
                            </td>
                        ))}
                    </tr>

                    {/* Procedures Row */}
                    <tr className="hover:bg-slate-50/50">
                        <td className="p-4 font-medium text-slate-700 bg-slate-50/30">Procedures</td>
                        {bids.map(bid => (
                            <td key={bid.id} className="p-4">
                                <div className="space-y-1">
                                    {bid.procedures.map((proc, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                            <Check className="h-3 w-3 text-emerald-500" />
                                            <span>{proc}</span>
                                        </div>
                                    ))}
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Status Row */}
                    <tr className="hover:bg-slate-50/50">
                        <td className="p-4 font-medium text-slate-700 bg-slate-50/30">Status</td>
                        {bids.map(bid => (
                            <td key={bid.id} className="p-4">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${bid.status === 'active' ? 'bg-emerald-50 text-emerald-700' :
                                        bid.status === 'accepted' ? 'bg-blue-50 text-blue-700' :
                                            'bg-slate-100 text-slate-500'
                                    }`}>
                                    {bid.status === 'active' ? 'Available' : bid.status}
                                </span>
                            </td>
                        ))}
                    </tr>

                    {/* Timestamp Row */}
                    <tr className="hover:bg-slate-50/50">
                        <td className="p-4 font-medium text-slate-700 bg-slate-50/30">Submitted</td>
                        {bids.map(bid => (
                            <td key={bid.id} className="p-4 text-sm text-slate-500">
                                {bid.timestamp}
                            </td>
                        ))}
                    </tr>
                </tbody>
                <tfoot>
                    <tr className="bg-slate-50">
                        <td className="p-4 rounded-bl-lg"></td>
                        {bids.map(bid => (
                            <td key={bid.id} className="p-4">
                                <Button className="w-full bg-slate-900 hover:bg-brand-primary text-white">
                                    Select {bid.dentistName.split(' ').slice(-1)[0]}
                                </Button>
                            </td>
                        ))}
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
