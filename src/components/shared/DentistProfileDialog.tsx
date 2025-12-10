'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Star, MapPin, Calendar, CheckCircle2, Award, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DentistProfileProps {
    trigger: React.ReactNode;
    dentist: {
        id: string;
        name: string;
        rating: number;
        specialty?: string;
        location?: string;
        yearsExperience?: number;
        education?: string;
        certifications?: string[];
        bio?: string;
        avatar?: string;
    };
}

export function DentistProfileDialog({ trigger, dentist }: DentistProfileProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-lg p-0 overflow-hidden">
                {/* Header with gradient */}
                <div className="relative h-24 bg-gradient-to-br from-brand-secondary to-teal-600">
                    <div className="absolute -bottom-10 left-6">
                        <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                            <AvatarImage src={dentist.avatar} />
                            <AvatarFallback className="text-xl font-bold bg-white text-brand-secondary">
                                {dentist.name.split(' ').slice(-1)[0]?.[0] || 'D'}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <div className="pt-14 px-6 pb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{dentist.name}</h2>
                            <p className="text-sm text-slate-500">{dentist.specialty || 'General Dentistry'}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-amber-700">{dentist.rating}</span>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                            <Award className="h-5 w-5 text-brand-secondary mx-auto mb-1" />
                            <p className="text-lg font-bold text-slate-900">{dentist.yearsExperience || 10}+</p>
                            <p className="text-xs text-slate-500">Years Exp.</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                            <p className="text-lg font-bold text-slate-900">247</p>
                            <p className="text-xs text-slate-500">Patients</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                            <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                            <p className="text-lg font-bold text-slate-900">24h</p>
                            <p className="text-xs text-slate-500">Response</p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">{dentist.location || '123 Market St, San Francisco'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">Next Available: <strong>Tomorrow, 2:00 PM</strong></span>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {dentist.bio || `${dentist.name} is a highly experienced dentist specializing in restorative and cosmetic procedures. With a patient-first approach, they focus on providing comfortable, anxiety-free dental care.`}
                        </p>
                    </div>

                    {/* Certifications */}
                    <div className="mb-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Certifications</h3>
                        <div className="flex flex-wrap gap-2">
                            {(dentist.certifications || ['ADA Member', 'Invisalign Certified', 'Implant Specialist']).map((cert, i) => (
                                <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100">
                                    {cert}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 gap-2">
                            <Phone className="h-4 w-4" /> Call Office
                        </Button>
                        <Button className="flex-1 bg-brand-secondary hover:bg-brand-secondary/90">
                            Book Appointment
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
