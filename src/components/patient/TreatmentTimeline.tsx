'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import {
    CheckCircle,
    Clock,
    Calendar,
    Stethoscope,
    FileText,
    DollarSign,
    ChevronRight
} from 'lucide-react';

interface TimelineEvent {
    id: string;
    date: string;
    title: string;
    description: string;
    type: 'diagnosis' | 'bid' | 'appointment' | 'treatment' | 'payment';
    status: 'completed' | 'upcoming' | 'current';
}

const MOCK_TIMELINE: TimelineEvent[] = [
    { id: '1', date: 'Dec 15, 2025', title: 'Treatment Complete', description: 'Root canal and crown procedure completed', type: 'treatment', status: 'upcoming' },
    { id: '2', date: 'Dec 10, 2025', title: 'Appointment Scheduled', description: 'Dr. Emily Chen confirmed your visit', type: 'appointment', status: 'current' },
    { id: '3', date: 'Dec 8, 2025', title: 'Bid Accepted', description: 'You selected Dr. Emily Chen\'s proposal for $1,250', type: 'bid', status: 'completed' },
    { id: '4', date: 'Dec 6, 2025', title: '5 Bids Received', description: 'Multiple dentists submitted competitive offers', type: 'bid', status: 'completed' },
    { id: '5', date: 'Dec 5, 2025', title: 'Case Created', description: 'Uploaded X-rays and created treatment case', type: 'diagnosis', status: 'completed' },
];

export function TreatmentTimeline() {
    const getIcon = (type: TimelineEvent['type']) => {
        switch (type) {
            case 'diagnosis': return <FileText className="h-4 w-4" />;
            case 'bid': return <DollarSign className="h-4 w-4" />;
            case 'appointment': return <Calendar className="h-4 w-4" />;
            case 'treatment': return <Stethoscope className="h-4 w-4" />;
            case 'payment': return <DollarSign className="h-4 w-4" />;
        }
    };

    const getIconBg = (type: TimelineEvent['type'], status: TimelineEvent['status']) => {
        if (status === 'completed') return 'bg-emerald-500 text-white';
        if (status === 'current') return 'bg-brand-primary text-white animate-pulse';
        return 'bg-slate-200 text-slate-500';
    };

    return (
        <Card className="p-6">
            <h3 className="font-bold text-lg text-slate-900 mb-6">Treatment Timeline</h3>

            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />

                <div className="space-y-6">
                    {MOCK_TIMELINE.map((event, index) => (
                        <div key={event.id} className="relative pl-10 group">
                            {/* Icon */}
                            <div className={cn(
                                "absolute left-0 top-0 h-8 w-8 rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-110",
                                getIconBg(event.type, event.status)
                            )}>
                                {event.status === 'completed' ? (
                                    <CheckCircle className="h-4 w-4" />
                                ) : event.status === 'current' ? (
                                    <Clock className="h-4 w-4" />
                                ) : (
                                    getIcon(event.type)
                                )}
                            </div>

                            {/* Content */}
                            <div className={cn(
                                "p-4 rounded-xl transition-all",
                                event.status === 'current'
                                    ? "bg-brand-primary/5 border border-brand-primary/20"
                                    : "bg-slate-50 hover:bg-slate-100"
                            )}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-semibold text-slate-900">{event.title}</p>
                                        <p className="text-sm text-slate-500 mt-0.5">{event.description}</p>
                                    </div>
                                    <span className="text-xs text-slate-400 whitespace-nowrap ml-4">
                                        {event.date}
                                    </span>
                                </div>
                                {event.status === 'current' && (
                                    <button className="mt-3 text-xs font-semibold text-brand-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        View Details <ChevronRight className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
