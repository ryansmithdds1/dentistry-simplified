'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, X, Clock, TrendingUp, ArrowRight, FileText, User, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
    id: string;
    type: 'case' | 'dentist' | 'message';
    title: string;
    subtitle: string;
    href: string;
}

const MOCK_RESULTS: SearchResult[] = [
    { id: '1', type: 'case', title: 'Emergency: Molar Pain', subtitle: 'Case #c101 • 3 bids received', href: '/patient/dashboard' },
    { id: '2', type: 'dentist', title: 'Dr. Emily Chen', subtitle: 'General Dentistry • 4.9★', href: '/patient/dashboard' },
    { id: '3', type: 'message', title: 'Dr. Sarah Smith', subtitle: '"I have an opening this Thursday..."', href: '/patient/messages' },
    { id: '4', type: 'case', title: 'Cosmetic: Gap Closure', subtitle: 'Case #c102 • 5 bids received', href: '/patient/dashboard' },
];

const RECENT_SEARCHES = ['Root canal', 'Emergency dentist', 'Teeth whitening'];
const TRENDING = ['Invisalign', 'Dental implants', 'Wisdom teeth removal'];

export function GlobalSearch() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const filteredResults = query.trim()
        ? MOCK_RESULTS.filter(r =>
            r.title.toLowerCase().includes(query.toLowerCase()) ||
            r.subtitle.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(true);
            }
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    React.useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);

    const getIcon = (type: SearchResult['type']) => {
        switch (type) {
            case 'case': return <FileText className="h-4 w-4" />;
            case 'dentist': return <User className="h-4 w-4" />;
            case 'message': return <MessageCircle className="h-4 w-4" />;
        }
    };

    const getIconColor = (type: SearchResult['type']) => {
        switch (type) {
            case 'case': return 'bg-blue-100 text-blue-600';
            case 'dentist': return 'bg-emerald-100 text-emerald-600';
            case 'message': return 'bg-purple-100 text-purple-600';
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className="hidden md:flex items-center gap-2 text-slate-400 hover:text-slate-600 bg-slate-50 border-slate-200 w-64"
            >
                <Search className="h-4 w-4" />
                <span className="flex-1 text-left text-sm">Search...</span>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border rounded">⌘K</kbd>
            </Button>

            {/* Modal */}
            {open && (
                <>
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                        onClick={() => setOpen(false)}
                    />
                    <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 p-4 border-b border-slate-100">
                                <Search className="h-5 w-5 text-slate-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search cases, dentists, messages..."
                                    className="flex-1 outline-none text-lg placeholder:text-slate-300"
                                />
                                {query && (
                                    <button onClick={() => setQuery('')} className="p-1 hover:bg-slate-100 rounded-md">
                                        <X className="h-4 w-4 text-slate-400" />
                                    </button>
                                )}
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded"
                                >
                                    ESC
                                </button>
                            </div>

                            <ScrollArea className="max-h-80">
                                {query.trim() ? (
                                    /* Search Results */
                                    <div className="p-2">
                                        {filteredResults.length === 0 ? (
                                            <div className="text-center py-8 text-slate-400">
                                                <Search className="h-8 w-8 mx-auto mb-2 opacity-30" />
                                                <p>No results for &quot;{query}&quot;</p>
                                            </div>
                                        ) : (
                                            filteredResults.map(result => (
                                                <Link
                                                    key={result.id}
                                                    href={result.href}
                                                    onClick={() => setOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                                                >
                                                    <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", getIconColor(result.type))}>
                                                        {getIcon(result.type)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-slate-900 truncate">{result.title}</p>
                                                        <p className="text-xs text-slate-500 truncate">{result.subtitle}</p>
                                                    </div>
                                                    <ArrowRight className="h-4 w-4 text-slate-300" />
                                                </Link>
                                            ))
                                        )}
                                    </div>
                                ) : (
                                    /* Empty State - Recent & Trending */
                                    <div className="p-4 space-y-4">
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> Recent Searches
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {RECENT_SEARCHES.map(term => (
                                                    <button
                                                        key={term}
                                                        onClick={() => setQuery(term)}
                                                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-600 transition-colors"
                                                    >
                                                        {term}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                                <TrendingUp className="h-3 w-3" /> Trending
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {TRENDING.map(term => (
                                                    <button
                                                        key={term}
                                                        onClick={() => setQuery(term)}
                                                        className="px-3 py-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 rounded-lg text-sm text-brand-primary transition-colors"
                                                    >
                                                        {term}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ScrollArea>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
