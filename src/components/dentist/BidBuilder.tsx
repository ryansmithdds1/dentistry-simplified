'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, DollarSign } from "lucide-react";
import { addBid } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";

interface BidBuilderProps {
    toothId: number | null;
    caseId: string;
}

const COMMON_PROCEDURES = [
    { code: "D2740", description: "Crown - Porcelain/Ceramic", avgPrice: 1200 },
    { code: "D2750", description: "Crown - PFM", avgPrice: 1100 },
    { code: "D2391", description: "Resin-based Composite - 1 Surface", avgPrice: 200 },
    { code: "D3330", description: "Root Canal - Molar", avgPrice: 1400 },
    { code: "D4341", description: "Perio Scaling & Root Planing", avgPrice: 300 },
];

export function BidBuilder({ toothId, caseId }: BidBuilderProps) {
    const router = useRouter();
    const { addToast } = useToast();
    const [selectedCode, setSelectedCode] = useState("");
    const [price, setPrice] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const procedure = COMMON_PROCEDURES.find(p => p.code === selectedCode);
        const procedureLabel = procedure
            ? `${procedure.code} - ${procedure.description} ($${price})`
            : `Custom Procedure ($${price})`;

        addBid({
            caseId: caseId,
            dentistId: "d1",
            dentistName: "Dr. Ryan Smith",
            price: parseFloat(price) || 0,
            procedures: [procedureLabel],
            rating: 5.0
        });

        // Reset form
        setSelectedCode("");
        setPrice("");
        setNotes("");
        setIsSubmitting(false);

        // Success feedback with toast
        addToast('success', 'Bid submitted successfully! The patient has been notified.');
        router.push("/dentist/dashboard");
    };

    if (!toothId) {
        return (
            <Card className="h-full flex items-center justify-center border-dashed border-2 border-slate-200 bg-slate-50/50">
                <div className="text-center text-muted-foreground p-6">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                        <DollarSign className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="font-medium">Select a tooth from the Mouth Map</p>
                    <p className="text-sm text-slate-400 mt-1">Click on any tooth to start building a bid</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="border-brand-secondary/30 shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-brand-primary to-brand-secondary" />
            <CardHeader className="bg-slate-50 border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-brand-secondary/10 flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-brand-secondary" />
                    </div>
                    Bid for Tooth #{toothId}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Procedure Code (ADA)</label>
                        <select
                            className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                            value={selectedCode}
                            onChange={(e) => {
                                setSelectedCode(e.target.value);
                                const proc = COMMON_PROCEDURES.find(p => p.code === e.target.value);
                                if (proc) setPrice(proc.avgPrice.toString());
                            }}
                            required
                        >
                            <option value="">Select Procedure...</option>
                            {COMMON_PROCEDURES.map((proc) => (
                                <option key={proc.code} value={proc.code}>
                                    {proc.code} - {proc.description}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Your &quot;Out the Door&quot; Price</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-500 font-medium">$</span>
                            <Input
                                type="number"
                                placeholder="0.00"
                                className="pl-7 h-10"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <p className="text-xs text-slate-400">Include all fees - no hidden costs for the patient</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Doctor&apos;s Notes (Optional)</label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary resize-none"
                            placeholder="e.g., Recommend Zirconia for durability. Sedation available on request..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-semibold shadow-lg shadow-brand-secondary/20"
                        disabled={isSubmitting || !selectedCode || !price}
                    >
                        {isSubmitting ? "Sending..." : "Submit Proposal"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
