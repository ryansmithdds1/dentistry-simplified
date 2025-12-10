'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import {
    CheckCircle,
    MessageCircle,
    DollarSign,
    Calendar,
    FileText,
    Bell,
    ArrowRight
} from 'lucide-react';

interface Activity {
    id: string;
    type: 'bid' | 'message' | 'appointment' | 'case' | 'alert';
    title: string;
    description: string;
    time: string;
    actionable?: boolean;
}

const MOCK_ACTIVITIES: Activity[] = [
    { id: '1', type: 'bid', title: 'New bid received', description: 'Dr. James Wilson submitted $1,150 for Root Canal', time: '10 min ago', actionable: true },
    { id: '2', type: 'message', title: 'Reply from Dr. Chen', description: '"I can fit you in tomorrow afternoon..."', time: '1 hour ago', actionable: true },
    { id: '3', type: 'appointment', title: 'Appointment confirmed', description: 'Tomorrow at 2:00 PM with Dr. Emily Chen', time: '2 hours ago' },
    { id: '4', type: 'case', title: 'Case updated', description: 'Your records were successfully processed', time: '3 hours ago' },
    { id: '5', type: 'alert', title: 'Insurance verified', description: 'Delta Dental coverage confirmed', time: '1 day ago' },
];

export function ActivityFeed() {
    const getIcon = (type: Activity['type']) => {
        switch (type) {
            case 'bid': return <DollarSign className="h-4 w-4" />;
            case 'message': return <MessageCircle className="h-4 w-4" />;
            case 'appointment': return <Calendar className="h-4 w-4" />;
            case 'case': return <FileText className="h-4 w-4" />;
            case 'alert': return <Bell className="h-4 w-4" />;
        }
    };

    const getIconBg = (type: Activity['type']) => {
        switch (type) {
            case 'bid': return 'bg-emerald-100 text-emerald-600';
            case 'message': return 'bg-blue-100 text-blue-600';
            case 'appointment': return 'bg-purple-100 text-purple-600';
            case 'case': return 'bg-amber-100 text-amber-600';
            case 'alert': return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-900">Recent Activity</h3>
                <button className="text-sm text-brand-primary font-medium hover:text-brand-primary/80 transition-colors flex items-center gap-1">
                    View All <ArrowRight className="h-3 w-3" />
                </button>
            </div>

            <div className="space-y-3">
                {MOCK_ACTIVITIES.map(activity => (
                    <div
                        key={activity.id}
                        className={cn(
                            "flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer",
                            activity.actionable ? "bg-blue-50/50 hover:bg-blue-50" : "hover:bg-slate-50"
                        )}
                    >
                        <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                            getIconBg(activity.type)
                        )}>
                            {getIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <p className="font-medium text-slate-900 text-sm">{activity.title}</p>
                                <span className="text-[10px] text-slate-400 whitespace-nowrap">{activity.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 truncate">{activity.description}</p>
                        </div>
                        {activity.actionable && (
                            <div className="h-2 w-2 rounded-full bg-brand-primary shrink-0 mt-2" />
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
}
