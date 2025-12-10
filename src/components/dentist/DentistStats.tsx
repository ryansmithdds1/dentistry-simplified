'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    Calendar,
    Clock,
    Activity,
    ArrowUpRight,
    Target,
    Award
} from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    change?: number;
    icon: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
}

function StatCard({ title, value, change, icon, trend = 'neutral' }: StatCardProps) {
    return (
        <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">{title}</p>
                    <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
                    {change !== undefined && (
                        <div className={cn(
                            "flex items-center gap-1 text-xs font-medium mt-2",
                            trend === 'up' && "text-emerald-600",
                            trend === 'down' && "text-red-500",
                            trend === 'neutral' && "text-slate-500"
                        )}>
                            {trend === 'up' && <TrendingUp className="h-3 w-3" />}
                            {trend === 'down' && <TrendingDown className="h-3 w-3" />}
                            <span>{change > 0 ? '+' : ''}{change}% from last month</span>
                        </div>
                    )}
                </div>
                <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                    {icon}
                </div>
            </div>
        </Card>
    );
}

export function DentistStats() {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Active Bids"
                    value="12"
                    change={18}
                    trend="up"
                    icon={<Target className="h-5 w-5" />}
                />
                <StatCard
                    title="Cases Won"
                    value="47"
                    change={5}
                    trend="up"
                    icon={<Award className="h-5 w-5" />}
                />
                <StatCard
                    title="Revenue (MTD)"
                    value="$24,350"
                    change={-3}
                    trend="down"
                    icon={<DollarSign className="h-5 w-5" />}
                />
                <StatCard
                    title="Avg Response"
                    value="2.4h"
                    change={12}
                    trend="up"
                    icon={<Clock className="h-5 w-5" />}
                />
            </div>

            {/* Quick Actions */}
            <Card className="p-5">
                <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                        <Activity className="h-5 w-5 text-brand-secondary" />
                        <span className="text-xs">View Analytics</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <span className="text-xs">Manage Schedule</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                        <Users className="h-5 w-5 text-purple-500" />
                        <span className="text-xs">Patient List</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                        <span className="text-xs">Earnings Report</span>
                    </Button>
                </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900">Recent Activity</h3>
                    <Button variant="link" size="sm" className="text-brand-primary gap-1">
                        View All <ArrowUpRight className="h-3 w-3" />
                    </Button>
                </div>
                <div className="space-y-3">
                    {[
                        { action: 'Bid accepted', patient: 'John Doe', time: '2 hours ago', type: 'success' },
                        { action: 'New case matched', patient: 'Sarah Jenkins', time: '4 hours ago', type: 'info' },
                        { action: 'Message received', patient: 'Michael Ross', time: '6 hours ago', type: 'neutral' },
                        { action: 'Appointment completed', patient: 'Emily Chen', time: '1 day ago', type: 'success' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <div className={cn(
                                "h-2 w-2 rounded-full",
                                item.type === 'success' && "bg-emerald-500",
                                item.type === 'info' && "bg-blue-500",
                                item.type === 'neutral' && "bg-slate-400"
                            )} />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">{item.action}</p>
                                <p className="text-xs text-slate-500">{item.patient}</p>
                            </div>
                            <span className="text-xs text-slate-400 whitespace-nowrap">{item.time}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
