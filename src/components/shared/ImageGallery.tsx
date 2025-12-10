'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Download, Maximize2 } from 'lucide-react';

interface ImageGalleryProps {
    images: { src: string; alt: string }[];
    trigger: React.ReactNode;
}

export function ImageGallery({ images, trigger }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [zoom, setZoom] = React.useState(1);

    const goNext = () => setCurrentIndex(i => (i + 1) % images.length);
    const goPrev = () => setCurrentIndex(i => (i - 1 + images.length) % images.length);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
    };

    if (images.length === 0) return null;

    return (
        <Dialog onOpenChange={() => { setCurrentIndex(0); setZoom(1); }}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent
                className="max-w-5xl p-0 bg-black border-slate-800 overflow-hidden"
                onKeyDown={handleKeyDown}
            >
                <DialogHeader className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-white text-sm font-medium">
                            {currentIndex + 1} / {images.length}
                        </DialogTitle>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white/70 hover:text-white hover:bg-white/10"
                                onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
                            >
                                <ZoomOut className="h-4 w-4" />
                            </Button>
                            <span className="text-white/70 text-xs min-w-10 text-center">{Math.round(zoom * 100)}%</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white/70 hover:text-white hover:bg-white/10"
                                onClick={() => setZoom(z => Math.min(3, z + 0.25))}
                            >
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                {/* Main Image */}
                <div className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
                    <img
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        className="max-h-full max-w-full object-contain transition-transform duration-200"
                        style={{ transform: `scale(${zoom})` }}
                    />

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={goPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                onClick={goNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="p-4 bg-slate-900 flex gap-2 justify-center overflow-x-auto">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={cn(
                                    "h-16 w-16 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                                    i === currentIndex
                                        ? "border-white ring-2 ring-brand-primary"
                                        : "border-transparent opacity-50 hover:opacity-100"
                                )}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
