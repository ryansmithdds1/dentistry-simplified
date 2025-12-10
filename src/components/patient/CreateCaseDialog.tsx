'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import {
    PlusCircle,
    ArrowRight,
    ArrowLeft,
    Upload,
    MapPin,
    AlertCircle,
    CheckCircle,
    Camera,
    FileText,
    Loader2
} from 'lucide-react';

interface CaseFormData {
    title: string;
    description: string;
    urgency: 'Low' | 'Medium' | 'High';
    location: string;
    images: File[];
}

export function CreateCaseDialog({ trigger }: { trigger: React.ReactNode }) {
    const { addToast } = useToast();
    const [open, setOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formData, setFormData] = React.useState<CaseFormData>({
        title: '',
        description: '',
        urgency: 'Medium',
        location: '',
        images: []
    });

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setOpen(false);
        setStep(1);
        setFormData({ title: '', description: '', urgency: 'Medium', location: '', images: [] });
        addToast('success', 'Case created! Dentists in your area will start submitting bids shortly.');
    };

    const canProceed = () => {
        if (step === 1) return formData.title.trim().length > 0;
        if (step === 2) return formData.description.trim().length > 0;
        if (step === 3) return formData.location.trim().length > 0;
        return true;
    };

    return (
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setStep(1); }}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-lg p-0 overflow-hidden">
                {/* Progress bar */}
                <div className="h-1 bg-slate-100">
                    <div
                        className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-300"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>

                <div className="p-6">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="flex items-center gap-2">
                            <PlusCircle className="h-5 w-5 text-brand-primary" />
                            Create a New Case
                        </DialogTitle>
                        <DialogDescription>
                            Step {step} of 4 — {['Describe Issue', 'Add Details', 'Set Location', 'Review'][step - 1]}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Step 1: Title */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                                    What brings you in today?
                                </label>
                                <Input
                                    placeholder="e.g., Tooth pain in upper left molar"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="h-12"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Tooth Pain', 'Broken Tooth', 'Cleaning', 'Cosmetic', 'Other'].map(suggestion => (
                                    <button
                                        key={suggestion}
                                        onClick={() => setFormData(prev => ({ ...prev, title: suggestion }))}
                                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-600 transition-colors"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Description & Urgency */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                                    Tell us more about the issue
                                </label>
                                <Textarea
                                    placeholder="Describe your symptoms, when they started, any relevant medical history..."
                                    value={formData.description}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    className="min-h-[120px]"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                                    How urgent is this?
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['Low', 'Medium', 'High'] as const).map(level => (
                                        <button
                                            key={level}
                                            onClick={() => setFormData(prev => ({ ...prev, urgency: level }))}
                                            className={cn(
                                                "p-3 rounded-xl border-2 text-center transition-all",
                                                formData.urgency === level
                                                    ? level === 'High'
                                                        ? "border-red-500 bg-red-50 text-red-700"
                                                        : level === 'Medium'
                                                            ? "border-amber-500 bg-amber-50 text-amber-700"
                                                            : "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                    : "border-slate-200 hover:border-slate-300"
                                            )}
                                        >
                                            <AlertCircle className={cn(
                                                "h-5 w-5 mx-auto mb-1",
                                                formData.urgency === level ? "" : "text-slate-400"
                                            )} />
                                            <span className="text-sm font-medium">{level}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Location */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                                    Where are you located?
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                    <Input
                                        placeholder="City, State or ZIP code"
                                        value={formData.location}
                                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                        className="h-12 pl-10"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['San Francisco, CA', 'Oakland, CA', 'San Jose, CA'].map(loc => (
                                    <button
                                        key={loc}
                                        onClick={() => setFormData(prev => ({ ...prev, location: loc }))}
                                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-600 transition-colors flex items-center gap-1"
                                    >
                                        <MapPin className="h-3 w-3" /> {loc}
                                    </button>
                                ))}
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-sm text-blue-700 flex items-start gap-2">
                                    <Camera className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span>You can upload X-rays or photos after creating the case to get more accurate bids.</span>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {step === 4 && (
                        <div className="space-y-4">
                            <Card className="p-4 space-y-3">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Issue</span>
                                    <p className="font-semibold text-slate-900">{formData.title}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</span>
                                    <p className="text-slate-600 text-sm">{formData.description}</p>
                                </div>
                                <div className="flex gap-4">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Urgency</span>
                                        <p className={cn(
                                            "font-semibold",
                                            formData.urgency === 'High' ? "text-red-600" :
                                                formData.urgency === 'Medium' ? "text-amber-600" : "text-emerald-600"
                                        )}>{formData.urgency}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Location</span>
                                        <p className="text-slate-600">{formData.location}</p>
                                    </div>
                                </div>
                            </Card>
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-emerald-800">Ready to submit!</p>
                                    <p className="text-sm text-emerald-600">Local dentists will be able to see your case and submit competitive bids.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-3 mt-6">
                        {step > 1 && (
                            <Button
                                variant="outline"
                                onClick={() => setStep(s => s - 1)}
                                className="gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" /> Back
                            </Button>
                        )}
                        <div className="flex-1" />
                        {step < 4 ? (
                            <Button
                                onClick={() => setStep(s => s + 1)}
                                disabled={!canProceed()}
                                className="gap-2 bg-brand-primary hover:bg-brand-primary/90"
                            >
                                Continue <ArrowRight className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="gap-2 bg-brand-secondary hover:bg-brand-secondary/90"
                            >
                                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                                {isSubmitting ? 'Submitting...' : 'Create Case'}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
