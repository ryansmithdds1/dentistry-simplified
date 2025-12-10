'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, MoreHorizontal, MessageCircle } from 'lucide-react';

interface Appointment {
    id: string;
    dentistName: string;
    dentistId: string;
    date: string;
    time: string;
    location: string;
    procedures: string[];
    status: 'upcoming' | 'completed' | 'cancelled';
    price: number;
}

const MOCK_APPOINTMENTS: Appointment[] = [
    {
        id: 'a1',
        dentistName: 'Dr. Emily Chen',
        dentistId: 'd1',
        date: 'Tomorrow',
        time: '2:00 PM',
        location: '123 Market St, SF',
        procedures: ['Root Canal (D3330)', 'Crown (D2750)'],
        status: 'upcoming',
        price: 1250
    },
    {
        id: 'a2',
        dentistName: 'Dr. Sarah Smith',
        dentistId: 'd2',
        date: 'Dec 5, 2025',
        time: '10:00 AM',
        location: '456 Mission St, SF',
        procedures: ['Cleaning', 'X-Rays'],
        status: 'completed',
        price: 200
    }
];

export function AppointmentsList() {
    const [filter, setFilter] = React.useState<'all' | 'upcoming' | 'completed'>('all');

    const filteredAppointments = MOCK_APPOINTMENTS.filter(apt =>
        filter === 'all' || apt.status === filter
    );

    return (
        <div className="space-y-6">
            {/* Filter Tabs */}
            <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                {(['all', 'upcoming', 'completed'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                            filter === tab
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
                {filteredAppointments.length === 0 ? (
                    <Card className="p-8 text-center">
                        <Calendar className="h-12 w-12 text-slate-200 mx-auto mb-3" />
                        <p className="text-slate-500">No appointments found</p>
                    </Card>
                ) : (
                    filteredAppointments.map(apt => (
                        <Card key={apt.id} className={cn(
                            "p-5 transition-all hover:shadow-md",
                            apt.status === 'upcoming' && "border-l-4 border-l-brand-primary"
                        )}>
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div className={cn(
                                        "h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg",
                                        apt.status === 'upcoming' ? "bg-brand-primary/10 text-brand-primary" : "bg-slate-100 text-slate-500"
                                    )}>
                                        {apt.dentistName.split(' ').slice(-1)[0]?.[0] || 'D'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{apt.dentistName}</h3>
                                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3.5 w-3.5" /> {apt.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5" /> {apt.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                                            <MapPin className="h-3 w-3" /> {apt.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className={cn(
                                        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
                                        apt.status === 'upcoming' && "bg-blue-50 text-blue-700",
                                        apt.status === 'completed' && "bg-emerald-50 text-emerald-700",
                                        apt.status === 'cancelled' && "bg-red-50 text-red-700"
                                    )}>
                                        {apt.status === 'upcoming' && <Clock className="h-3 w-3" />}
                                        {apt.status === 'completed' && <CheckCircle className="h-3 w-3" />}
                                        {apt.status === 'cancelled' && <XCircle className="h-3 w-3" />}
                                        {apt.status}
                                    </span>
                                    <p className="text-lg font-bold text-slate-900 mt-2">${apt.price}</p>
                                </div>
                            </div>

                            {/* Procedures */}
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="flex flex-wrap gap-2">
                                    {apt.procedures.map((proc, i) => (
                                        <span key={i} className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded-lg">
                                            {proc}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            {apt.status === 'upcoming' && (
                                <div className="mt-4 flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                                        <MessageCircle className="h-4 w-4" /> Message
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                                        Cancel
                                    </Button>
                                    <Button size="sm" className="bg-brand-primary hover:bg-brand-primary/90">
                                        Reschedule
                                    </Button>
                                </div>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
