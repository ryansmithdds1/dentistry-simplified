'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, ArrowRightLeft, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Comparator } from "@/components/shared/Comparator";
import { BookingDialog } from "@/components/shared/BookingDialog";
import { DentistProfileDialog } from "@/components/shared/DentistProfileDialog";
import { getBidsForCase, Bid } from "@/lib/store";

export function QuoteFeed() {
    // For MVP, we assume patient has one active case 'c101'
    const activeCaseId = 'c101';
    const bids = getBidsForCase(activeCaseId);

    return (
        <Card className="h-full border-0 shadow-xl shadow-slate-200/40 bg-white/60 backdrop-blur rounded-3xl ring-1 ring-slate-100 flex flex-col">
            <div className="p-6 border-b border-slate-100/50 flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-xl text-slate-800">Incoming Bids</h2>
                    <p className="text-sm text-slate-500 font-medium">Real-time proposals from top dentists</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="hidden lg:flex gap-2">
                            <ArrowRightLeft className="w-4 h-4" /> Compare All
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl">
                        <DialogHeader>
                            <DialogTitle>Compare Bids</DialogTitle>
                            <DialogDescription>
                                Detailed breakdown of all proposals for your case.
                            </DialogDescription>
                        </DialogHeader>
                        <Comparator bids={bids} />
                    </DialogContent>
                </Dialog>
            </div>

            <CardContent className="p-6 space-y-4 overflow-y-auto flex-1">
                {bids.length === 0 ? (
                    <div className="text-center py-10 text-slate-400">
                        <Clock className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        <p className="font-medium">No bids received yet</p>
                        <p className="text-sm">Check back soon!</p>
                    </div>
                ) : (
                    bids.map((quote) => (
                        <div
                            key={quote.id}
                            className="group relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-brand-primary/30 hover:-translate-y-0.5"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <DentistProfileDialog
                                    trigger={
                                        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm">
                                                {quote.dentistName.split(' ').slice(-1)[0]?.[0] || 'D'}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 leading-tight hover:text-brand-primary transition-colors">{quote.dentistName}</h3>
                                                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-0.5">
                                                    <Star className="w-3 h-3 fill-current" /> {quote.rating}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    dentist={{
                                        id: quote.dentistId,
                                        name: quote.dentistName,
                                        rating: quote.rating
                                    }}
                                />
                                <div className="text-right">
                                    <span className="block text-2xl font-black text-slate-900 tracking-tight">${quote.price}</span>
                                    <span className="text-xs font-medium text-slate-400">Total Estimate</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {quote.procedures.map((proc, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs font-medium border border-slate-100"
                                    >
                                        {proc}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
                                <BookingDialog
                                    trigger={
                                        <Button className="flex-1 bg-slate-900 text-white hover:bg-brand-primary shadow-lg shadow-slate-200 hover:shadow-brand-primary/25 transition-all h-9 rounded-xl font-semibold text-xs">
                                            Accept Proposal
                                        </Button>
                                    }
                                    bid={quote}
                                />
                                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10">
                                    <MessageCircle className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="absolute top-4 right-4 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                New Match
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
