import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-slate-200/70",
                className
            )}
        />
    );
}

// Pre-built skeleton patterns
export function CardSkeleton() {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 space-y-4">
            <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full rounded-xl" />
        </div>
    );
}

export function QuoteSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-5 border border-slate-100 space-y-3">
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-3 w-12" />
                </div>
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-lg" />
                <Skeleton className="h-6 w-20 rounded-lg" />
            </div>
            <Skeleton className="h-9 w-full rounded-xl" />
        </div>
    );
}

export function ChatSkeleton() {
    return (
        <div className="flex h-full">
            {/* Sidebar skeleton */}
            <div className="w-80 border-r p-4 space-y-3">
                <Skeleton className="h-10 w-full rounded-xl" />
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-3 p-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                    </div>
                ))}
            </div>
            {/* Main area skeleton */}
            <div className="flex-1 p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
                {[1, 2, 3].map(i => (
                    <div key={i} className={cn("flex", i % 2 === 0 ? "justify-end" : "justify-start")}>
                        <Skeleton className={cn("h-16 rounded-2xl", i % 2 === 0 ? "w-48" : "w-64")} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ImageViewerSkeleton() {
    return (
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden">
            <Skeleton className="h-96 w-full bg-slate-800" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-8 w-8 rounded-lg bg-slate-700" />
                ))}
            </div>
        </div>
    );
}
