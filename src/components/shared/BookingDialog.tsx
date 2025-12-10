'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CheckCircle, Calendar, MapPin, Clock, CreditCard, User } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { Bid } from '@/lib/store';

interface BookingDialogProps {
    trigger: React.ReactNode;
    bid: Bid;
}

export function BookingDialog({ trigger, bid }: BookingDialogProps) {
    const { addToast } = useToast();
    const [step, setStep] = React.useState<'confirm' | 'success'>('confirm');

    const handleConfirm = () => {
        setStep('success');
        addToast('success', `Booking confirmed with ${bid.dentistName}!`);
    };

    const handleClose = () => {
        setStep('confirm');
    };

    return (
        <Dialog onOpenChange={(open) => !open && handleClose()}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-md">
                {step === 'confirm' ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Confirm Your Appointment</DialogTitle>
                            <DialogDescription>
                                You&apos;re about to book with {bid.dentistName}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                            {/* Provider Card */}
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold">
                                    {bid.dentistName.split(' ').slice(-1)[0]?.[0] || 'D'}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{bid.dentistName}</p>
                                    <p className="text-sm text-slate-500">General Dentistry</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    <span className="text-slate-600">First available: <strong>Tomorrow, 2:00 PM</strong></span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="h-4 w-4 text-slate-400" />
                                    <span className="text-slate-600">123 Market St, San Francisco</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CreditCard className="h-4 w-4 text-slate-400" />
                                    <span className="text-slate-600">Total: <strong className="text-brand-primary">${bid.price}</strong></span>
                                </div>
                            </div>

                            {/* Procedures */}
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">Included Procedures</p>
                                <ul className="space-y-1">
                                    {bid.procedures.map((proc, i) => (
                                        <li key={i} className="text-sm text-emerald-700 flex items-center gap-2">
                                            <CheckCircle className="h-3 w-3" /> {proc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1">
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 bg-brand-primary hover:bg-brand-primary/90"
                                onClick={handleConfirm}
                            >
                                Confirm Booking
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
                        <p className="text-slate-500 mb-6">
                            You&apos;ll receive a confirmation email shortly with all the details.
                        </p>
                        <div className="p-4 bg-slate-50 rounded-xl text-left space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4 text-slate-400" />
                                <span>{bid.dentistName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-slate-400" />
                                <span>Tomorrow, 2:00 PM</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CreditCard className="h-4 w-4 text-slate-400" />
                                <span className="font-semibold text-brand-primary">${bid.price}</span>
                            </div>
                        </div>
                        <Button className="w-full">
                            View My Appointments
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
