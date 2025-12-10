import { cn } from "@/lib/utils";

interface ToothProps {
    id: number;
    label?: string;
    status?: "healthy" | "treatment-proposed" | "critical" | "watch";
    onClick?: (id: number) => void;
    selected?: boolean;
}

export function Tooth({ id, label, status = "healthy", onClick, selected }: ToothProps) {
    const statusStyles: Record<string, { fill: string; stroke: string; glow?: string }> = {
        healthy: {
            fill: "fill-white",
            stroke: "stroke-slate-300"
        },
        watch: {
            fill: "fill-amber-50",
            stroke: "stroke-amber-400",
            glow: "drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]"
        },
        critical: {
            fill: "fill-red-50",
            stroke: "stroke-red-500",
            glow: "drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
        },
        "treatment-proposed": {
            fill: "fill-blue-50",
            stroke: "stroke-blue-500",
            glow: "drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]"
        },
    };

    const style = statusStyles[status] || statusStyles.healthy;

    // Determine tooth type based on position (simplified)
    const isMolar = id >= 14 && id <= 19 || id >= 30 && id <= 35;
    const isCanine = id === 6 || id === 11 || id === 22 || id === 27;

    return (
        <div
            className={cn(
                "flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-200",
                "hover:scale-110 hover:-translate-y-0.5",
                selected && "scale-115"
            )}
            onClick={() => onClick?.(id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.(id)}
        >
            <svg
                width="44"
                height="54"
                viewBox="0 0 44 54"
                className={cn(
                    "transition-all duration-200",
                    style.fill,
                    style.stroke,
                    style.glow,
                    selected
                        ? "stroke-[3px] scale-110 drop-shadow-lg"
                        : "stroke-[1.5px] hover:stroke-2"
                )}
            >
                {/* Tooth enamel gradient */}
                <defs>
                    <linearGradient id={`toothGrad${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* Main tooth shape - varied by type */}
                {isMolar ? (
                    // Molar - wider, more square
                    <path
                        d="M6,12 C6,4 38,4 38,12 L38,32 C38,44 32,50 22,50 C12,50 6,44 6,32 Z"
                        className="transition-colors"
                    />
                ) : isCanine ? (
                    // Canine - pointed
                    <path
                        d="M10,14 C10,6 34,6 34,14 L32,38 C30,48 26,52 22,52 C18,52 14,48 12,38 Z"
                        className="transition-colors"
                    />
                ) : (
                    // Incisor - narrower
                    <path
                        d="M12,12 C12,5 32,5 32,12 L30,36 C28,48 26,50 22,50 C18,50 16,48 14,36 Z"
                        className="transition-colors"
                    />
                )}

                {/* Subtle crown detail */}
                <ellipse
                    cx="22" cy="18" rx="8" ry="4"
                    className="fill-white/40 stroke-none"
                />

                {/* Root lines */}
                {isMolar && (
                    <>
                        <path d="M15,50 L14,58" className="stroke-slate-200/60 stroke-1" />
                        <path d="M22,50 L22,56" className="stroke-slate-200/60 stroke-1" />
                        <path d="M29,50 L30,58" className="stroke-slate-200/60 stroke-1" />
                    </>
                )}
            </svg>

            {/* Tooth number badge */}
            <span className={cn(
                "text-[10px] font-semibold px-1.5 py-0.5 rounded-full transition-all",
                selected
                    ? "bg-brand-primary text-white shadow-sm"
                    : status === 'critical'
                        ? "bg-red-100 text-red-700"
                        : status === 'watch'
                            ? "bg-amber-100 text-amber-700"
                            : status === 'treatment-proposed'
                                ? "bg-blue-100 text-blue-700"
                                : "bg-slate-100 text-slate-500"
            )}>
                {id}
            </span>
        </div>
    );
}
