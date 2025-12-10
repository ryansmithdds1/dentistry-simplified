'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    date: string;
    procedure?: string;
}

const MOCK_REVIEWS: Review[] = [
    {
        id: '1',
        name: 'Sarah M.',
        location: 'San Francisco, CA',
        rating: 5,
        text: 'I saved over $800 on my crown by comparing bids from different dentists. The process was so easy and transparent!',
        date: 'Dec 2025',
        procedure: 'Crown'
    },
    {
        id: '2',
        name: 'Michael R.',
        location: 'Oakland, CA',
        rating: 5,
        text: 'Finally a way to understand dental pricing. Got 5 bids within 24 hours and picked the best option for my budget.',
        date: 'Nov 2025',
        procedure: 'Root Canal'
    },
    {
        id: '3',
        name: 'Emily C.',
        location: 'San Jose, CA',
        rating: 5,
        text: 'The second opinion feature helped me avoid an unnecessary procedure. This platform is a game changer!',
        date: 'Nov 2025',
        procedure: 'Consultation'
    },
];

export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const goNext = () => setCurrentIndex(i => (i + 1) % MOCK_REVIEWS.length);
    const goPrev = () => setCurrentIndex(i => (i - 1 + MOCK_REVIEWS.length) % MOCK_REVIEWS.length);

    React.useEffect(() => {
        const interval = setInterval(goNext, 5000);
        return () => clearInterval(interval);
    }, []);

    const review = MOCK_REVIEWS[currentIndex];

    return (
        <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-blue-50/30">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                    Trusted by Thousands
                </h2>
                <p className="text-slate-600 mb-10">
                    See what patients are saying about their experience
                </p>

                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                        onClick={goPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 h-10 w-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors z-10"
                    >
                        <ChevronLeft className="h-5 w-5 text-slate-600" />
                    </button>
                    <button
                        onClick={goNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 h-10 w-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors z-10"
                    >
                        <ChevronRight className="h-5 w-5 text-slate-600" />
                    </button>

                    {/* Review Card */}
                    <Card className="p-8 md:p-12 relative overflow-hidden">
                        <Quote className="absolute top-6 left-6 h-8 w-8 text-brand-primary/10" />

                        <div className="relative z-10">
                            {/* Stars */}
                            <div className="flex items-center justify-center gap-1 mb-6">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "h-5 w-5",
                                            i < review.rating
                                                ? "fill-amber-400 text-amber-400"
                                                : "fill-slate-200 text-slate-200"
                                        )}
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8 font-medium">
                                "{review.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center justify-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold">
                                    {review.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-900">{review.name}</p>
                                    <p className="text-sm text-slate-500">{review.location}</p>
                                </div>
                                {review.procedure && (
                                    <span className="ml-4 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                                        {review.procedure}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Dots */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {MOCK_REVIEWS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={cn(
                                    "h-2 rounded-full transition-all",
                                    i === currentIndex
                                        ? "w-6 bg-brand-primary"
                                        : "w-2 bg-slate-300 hover:bg-slate-400"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
