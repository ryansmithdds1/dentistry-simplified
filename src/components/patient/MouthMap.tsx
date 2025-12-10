'use client';

import { useState } from "react";
import { Tooth } from "./Tooth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ToothCondition } from "@/lib/store";

interface MouthMapProps {
    onToothSelect?: (toothId: number) => void;
    teeth?: ToothCondition[];
}

export function MouthMap({ onToothSelect, teeth = [] }: MouthMapProps) {
    const [selectedTooth, setSelectedTooth] = useState<number | null>(null);

    const handleToothClick = (id: number) => {
        setSelectedTooth(id);
        onToothSelect?.(id);
    };

    // Helper to get status
    const getToothData = (id: number) => teeth.find(t => t.id === id);
    const getStatus = (id: number) => {
        const t = getToothData(id);
        return t ? t.status : 'healthy';
    };

    // Universal Numbering System
    const upperArch = Array.from({ length: 16 }, (_, i) => i + 1);
    const lowerArch = Array.from({ length: 16 }, (_, i) => 32 - i);

    return (
        <div className="flex flex-col gap-8 items-center p-6 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-center w-full">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Upper Arch</h3>
                <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
                    {upperArch.map((id) => (
                        <div key={id} className={cn(id === 8 ? "mr-4" : "")}>
                            <Tooth
                                id={id}
                                selected={selectedTooth === id}
                                onClick={handleToothClick}
                                status={getStatus(id)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full border-t border-dashed border-slate-300 my-2"></div>

            <div className="text-center w-full">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Lower Arch</h3>
                <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
                    {lowerArch.map((id) => (
                        <div key={id} className={cn(id === 25 ? "mr-4" : "")}>
                            <Tooth
                                id={id}
                                selected={selectedTooth === id}
                                onClick={handleToothClick}
                                status={getStatus(id)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {selectedTooth && (
                <Card className="mt-4 w-full max-w-md animate-in fade-in slide-in-from-bottom-4">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Tooth #{selectedTooth} Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">
                            {getToothData(selectedTooth) ? (
                                <div className="space-y-2">
                                    <p className="font-medium text-slate-900 capitalize">Status: <span className={cn(
                                        getStatus(selectedTooth) === 'critical' ? "text-red-600" :
                                            getStatus(selectedTooth) === 'treatment-proposed' ? "text-blue-600" : "text-amber-600"
                                    )}>{getStatus(selectedTooth).replace('-', ' ')}</span></p>
                                    <p className="text-slate-600 italic">"{getToothData(selectedTooth)?.notes}"</p>
                                </div>
                            ) : (
                                <p>Status: Healthy / No Active Treatment Proposed</p>
                            )}
                            <div className="mt-4 p-4 bg-slate-100 rounded-md flex items-center justify-center h-32">
                                <span className="text-slate-400 text-xs">Radiograph / Intraoral Photo</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
