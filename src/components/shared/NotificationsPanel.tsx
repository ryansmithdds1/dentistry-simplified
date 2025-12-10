'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Bell, X, Check, Calendar, MessageCircle, DollarSign, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
    id: string;
    type: 'bid' | 'message' | 'appointment' | 'alert';
    title: string;
    description: string;
    time: string;
    read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'n1', type: 'bid', title: 'New bid received', description: 'Dr. Chen submitted a bid for $1,250', time: '5 min ago', read: false },
    { id: 'n2', type: 'message', title: 'New message', description: 'Dr. Smith sent you a message', time: '1 hour ago', read: false },
    { id: 'n3', type: 'appointment', title: 'Appointment reminder', description: 'Tomorrow at 2:00 PM with Dr. Chen', time: '2 hours ago', read: true },
    { id: 'n4', type: 'alert', title: 'Case expiring soon', description: 'Your case #c101 expires in 24 hours', time: '3 hours ago', read: true },
];

export function NotificationsPanel() {
    const [open, setOpen] = React.useState(false);
    const [notifications, setNotifications] = React.useState(MOCK_NOTIFICATIONS);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'bid': return <DollarSign className="h-4 w-4" />;
            case 'message': return <MessageCircle className="h-4 w-4" />;
            case 'appointment': return <Calendar className="h-4 w-4" />;
            case 'alert': return <AlertCircle className="h-4 w-4" />;
        }
    };

    const getIconColor = (type: Notification['type']) => {
        switch (type) {
            case 'bid': return 'bg-emerald-100 text-emerald-600';
            case 'message': return 'bg-blue-100 text-blue-600';
            case 'appointment': return 'bg-purple-100 text-purple-600';
            case 'alert': return 'bg-amber-100 text-amber-600';
        }
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-500 hover:text-brand-primary hover:bg-brand-primary/10 relative"
                onClick={() => setOpen(!open)}
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-brand-warm text-[10px] font-bold text-white flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </Button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900">Notifications</h3>
                            <Button variant="ghost" size="sm" className="text-xs text-brand-primary" onClick={markAllRead}>
                                Mark all read
                            </Button>
                        </div>
                        <ScrollArea className="max-h-80">
                            <div className="p-2">
                                {notifications.map(notif => (
                                    <div
                                        key={notif.id}
                                        className={cn(
                                            "flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer",
                                            !notif.read ? "bg-blue-50/50" : "hover:bg-slate-50"
                                        )}
                                    >
                                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center shrink-0", getIconColor(notif.type))}>
                                            {getIcon(notif.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn("text-sm truncate", !notif.read ? "font-semibold text-slate-900" : "text-slate-700")}>
                                                {notif.title}
                                            </p>
                                            <p className="text-xs text-slate-500 truncate">{notif.description}</p>
                                            <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                                        </div>
                                        {!notif.read && (
                                            <div className="h-2 w-2 rounded-full bg-brand-primary shrink-0 mt-1" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="p-3 border-t border-slate-100">
                            <Button variant="outline" className="w-full text-sm" onClick={() => setOpen(false)}>
                                View All Notifications
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
