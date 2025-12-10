'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface Toast {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (type: Toast['type'], message: string) => void;
    removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const addToast = React.useCallback((type: Toast['type'], message: string) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, type, message }]);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = React.useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[], onRemove: (id: string) => void }) {
    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={cn(
                        "flex items-center gap-3 p-4 rounded-xl shadow-lg backdrop-blur-sm animate-in slide-in-from-right-5 fade-in duration-300",
                        toast.type === 'success' && "bg-emerald-500 text-white",
                        toast.type === 'error' && "bg-red-500 text-white",
                        toast.type === 'info' && "bg-slate-900 text-white"
                    )}
                >
                    {toast.type === 'success' && <CheckCircle className="h-5 w-5 shrink-0" />}
                    {toast.type === 'error' && <XCircle className="h-5 w-5 shrink-0" />}
                    {toast.type === 'info' && <AlertCircle className="h-5 w-5 shrink-0" />}
                    <p className="text-sm font-medium flex-1">{toast.message}</p>
                    <button
                        onClick={() => onRemove(toast.id)}
                        className="p-1 hover:bg-white/20 rounded-md transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
