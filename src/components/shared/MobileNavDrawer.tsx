'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Menu,
    X,
    Home,
    Calendar,
    MessageCircle,
    Settings,
    PlusCircle,
    FileText,
    LogOut,
    Stethoscope
} from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const patientNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/patient/dashboard', icon: <Home className="h-5 w-5" /> },
    { label: 'Appointments', href: '/patient/appointments', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Messages', href: '/patient/messages', icon: <MessageCircle className="h-5 w-5" /> },
    { label: 'My Cases', href: '/patient/cases', icon: <FileText className="h-5 w-5" /> },
    { label: 'Settings', href: '/patient/settings', icon: <Settings className="h-5 w-5" /> },
];

export function MobileNavDrawer() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            {/* Toggle Button */}
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-brand-primary text-white shadow-lg shadow-brand-primary/30 hover:bg-brand-primary/90"
                onClick={() => setOpen(true)}
            >
                <Menu className="h-6 w-6" />
            </Button>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Drawer */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 lg:hidden",
                open ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Header */}
                <div className="h-20 border-b border-slate-100 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-brand-primary/10 rounded-lg">
                            <Stethoscope className="h-5 w-5 text-brand-primary" />
                        </div>
                        <span className="font-bold text-slate-900">Menu</span>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                {/* User Info */}
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold">
                            JD
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900">John Doe</p>
                            <p className="text-xs text-slate-500">john.doe@example.com</p>
                        </div>
                    </div>
                </div>

                {/* Quick Action */}
                <div className="p-4">
                    <Button className="w-full gap-2 bg-brand-primary hover:bg-brand-primary/90">
                        <PlusCircle className="h-4 w-4" /> New Case
                    </Button>
                </div>

                {/* Nav Items */}
                <nav className="p-4 space-y-1">
                    {patientNavItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
                    <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl w-full transition-colors">
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </div>
        </>
    );
}
