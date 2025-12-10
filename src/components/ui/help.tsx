'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { HelpCircle, X } from 'lucide-react';

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ children, content, side = 'top' }: TooltipProps) {
    const [show, setShow] = React.useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    const arrowClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-900',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-900',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-900',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-900'
    };

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && (
                <div className={cn(
                    "absolute z-50 px-3 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95 duration-150",
                    positionClasses[side]
                )}>
                    {content}
                    <div className={cn(
                        "absolute w-0 h-0 border-4 border-transparent",
                        arrowClasses[side]
                    )} />
                </div>
            )}
        </div>
    );
}

interface HelpIconProps {
    content: string;
    className?: string;
}

export function HelpIcon({ content, className }: HelpIconProps) {
    return (
        <Tooltip content={content}>
            <button className={cn(
                "inline-flex items-center justify-center h-4 w-4 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors",
                className
            )}>
                <HelpCircle className="h-3 w-3 text-slate-400" />
            </button>
        </Tooltip>
    );
}

interface InfoBannerProps {
    children: React.ReactNode;
    variant?: 'info' | 'success' | 'warning' | 'tip';
    dismissible?: boolean;
    onDismiss?: () => void;
}

export function InfoBanner({ children, variant = 'info', dismissible, onDismiss }: InfoBannerProps) {
    const [visible, setVisible] = React.useState(true);

    if (!visible) return null;

    const variantClasses = {
        info: 'bg-blue-50 border-blue-200 text-blue-700',
        success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        warning: 'bg-amber-50 border-amber-200 text-amber-700',
        tip: 'bg-purple-50 border-purple-200 text-purple-700'
    };

    const handleDismiss = () => {
        setVisible(false);
        onDismiss?.();
    };

    return (
        <div className={cn(
            "flex items-start gap-3 p-4 rounded-xl border",
            variantClasses[variant]
        )}>
            <HelpCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">{children}</div>
            {dismissible && (
                <button onClick={handleDismiss} className="shrink-0 p-1 hover:bg-black/5 rounded">
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
