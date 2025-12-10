'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, RefreshCw, Sun, Contrast, Move } from "lucide-react";

interface ImageViewerProps {
    src: string;
    alt: string;
}

export function ImageViewer({ src, alt }: ImageViewerProps) {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [isInverted, setIsInverted] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startPan, setStartPan] = useState({ x: 0, y: 0 });

    const containerRef = useRef<HTMLDivElement>(null);

    // Reset tools
    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        setBrightness(100);
        setContrast(100);
        setIsInverted(false);
    };

    // Pan handlers
    const onMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return; // Only left click
        setIsDragging(true);
        setStartPan({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        setPosition({
            x: e.clientX - startPan.x,
            y: e.clientY - startPan.y
        });
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    // Zoom handlers
    const zoomIn = () => setScale(prev => Math.min(prev + 0.5, 5));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));

    // Wheel zoom
    const onWheel = (e: React.WheelEvent) => {
        // e.ctrlKey checks for pinch-to-zoom on trackpads usually, or allow simple scroll to zoom
        // keeping it simple: scroll up to zoom in
        e.preventDefault();
        if (e.deltaY < 0) {
            setScale(prev => Math.min(prev + 0.1, 5));
        } else {
            setScale(prev => Math.max(prev - 0.1, 1));
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-slate-100 p-2 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={zoomOut} disabled={scale <= 1}>
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-xs font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
                    <Button variant="ghost" size="icon" onClick={zoomIn} disabled={scale >= 5}>
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <div className="h-4 w-px bg-slate-300 mx-2" />
                    <Button
                        variant={isInverted ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setIsInverted(!isInverted)}
                        className="text-xs"
                    >
                        Invert
                    </Button>
                </div>

                <div className="flex items-center gap-4 px-2">
                    <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-slate-500" />
                        <Slider
                            value={[brightness]}
                            min={50}
                            max={150}
                            step={5}
                            onValueChange={(val) => setBrightness(val[0])}
                            className="w-24"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Contrast className="h-4 w-4 text-slate-500" />
                        <Slider
                            value={[contrast]}
                            min={50}
                            max={150}
                            step={5}
                            onValueChange={(val) => setContrast(val[0])}
                            className="w-24"
                        />
                    </div>
                </div>

                <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-muted-foreground hover:text-foreground">
                    <RefreshCw className="mr-1 h-3 w-3" /> Reset
                </Button>
            </div>

            {/* Viewport */}
            <div
                ref={containerRef}
                className="relative w-full h-[500px] bg-black overflow-hidden rounded-xl border border-slate-900 cursor-move group"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onWheel={onWheel}
            >
                <div className="absolute top-4 right-4 z-10 bg-black/50 text-white px-2 py-1 rounded text-xs pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Move className="h-3 w-3" /> Pan & Scroll to Zoom
                </div>

                <div
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        filter: `brightness(${brightness}%) contrast(${contrast}%) invert(${isInverted ? 1 : 0})`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                    className="w-full h-full flex items-center justify-center origin-center"
                >
                    {/* Using Next.js Image might be tricky with transforms if not contained properly, using standard img for manipulation simplicity */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-full max-h-full object-contain select-none pointer-events-none"
                        draggable={false}
                    />
                </div>
            </div>
        </div>
    );
}
