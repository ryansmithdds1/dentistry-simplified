'use client';

import { Button } from "@/components/ui/button";
import { Stethoscope, User, Bell, PlusCircle, Settings, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { GlobalSearch } from "@/components/shared/GlobalSearch";
import { NotificationsPanel } from "@/components/shared/NotificationsPanel";
import { CreateCaseDialog } from "@/components/patient/CreateCaseDialog";
import { LoginDialog } from "@/components/shared/LoginDialog";
import { useAuth, getInitials } from "@/lib/auth";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, logout, isLoading } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50/50">
            <header className="sticky top-0 z-30 flex h-20 items-center gap-4 px-6 md:px-10 glass-nav border-b border-white/20 shadow-sm backdrop-blur-xl bg-white/70">
                <Link href="/" className="flex items-center gap-3 font-bold text-xl tracking-tight text-slate-800 transition-opacity hover:opacity-80">
                    <div className="bg-brand-primary/10 p-2 rounded-lg">
                        <Stethoscope className="h-6 w-6 text-brand-primary" />
                    </div>
                    <span className="hidden sm:inline">Dentistry <span className="text-brand-primary">Simplified</span></span>
                </Link>

                {/* Global Search */}
                <div className="hidden md:block ml-4">
                    <GlobalSearch />
                </div>

                <div className="ml-auto flex items-center gap-4">
                    <nav className="hidden lg:flex items-center gap-1 mr-4 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
                        <Link href="/patient/dashboard" className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-white transition-all">Dashboard</Link>
                        <Link href="/patient/appointments" className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-white transition-all">Appointments</Link>
                        <Link href="/patient/messages" className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-white transition-all">Messages</Link>
                    </nav>

                    {/* Create Case Button */}
                    <CreateCaseDialog
                        trigger={
                            <Button className="gap-2 bg-brand-primary hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20">
                                <PlusCircle className="h-4 w-4" />
                                <span className="hidden sm:inline">New Case</span>
                            </Button>
                        }
                    />

                    {/* Notifications */}
                    <NotificationsPanel />

                    {/* Settings */}
                    <Link href="/patient/settings">
                        <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:text-brand-primary hover:bg-brand-primary/10">
                            <Settings className="h-5 w-5" />
                        </Button>
                    </Link>

                    {/* Profile / Login */}
                    {isLoading ? (
                        <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse" />
                    ) : user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-md hover:shadow-lg transition-shadow px-1 pr-2"
                            >
                                <div className="h-10 w-10 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold">{getInitials(user.name)}</span>
                                </div>
                                <ChevronDown className={cn(
                                    "h-4 w-4 transition-transform",
                                    showDropdown && "rotate-180"
                                )} />
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-2 border-b border-slate-100">
                                        <p className="font-semibold text-slate-900">{user.name}</p>
                                        <p className="text-xs text-slate-500">{user.email}</p>
                                    </div>
                                    <Link
                                        href="/patient/settings"
                                        onClick={() => setShowDropdown(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        <User className="h-4 w-4 text-slate-400" />
                                        Profile Settings
                                    </Link>
                                    <Link
                                        href="/patient/settings"
                                        onClick={() => setShowDropdown(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        <Settings className="h-4 w-4 text-slate-400" />
                                        Account Settings
                                    </Link>
                                    <div className="border-t border-slate-100 mt-2 pt-2">
                                        <button
                                            onClick={() => {
                                                setShowDropdown(false);
                                                logout();
                                            }}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <LoginDialog
                            trigger={
                                <Button variant="outline" className="gap-2">
                                    <User className="h-4 w-4" />
                                    Sign In
                                </Button>
                            }
                        />
                    )}
                </div>
            </header>
            <main className="container mx-auto p-6 md:p-10 max-w-[1600px] animate-in fade-in duration-500">
                {children}
            </main>
        </div>
    );
}
