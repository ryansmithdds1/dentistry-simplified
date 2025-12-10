'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MouthMap } from "@/components/patient/MouthMap";
import { QuoteFeed } from "@/components/patient/QuoteFeed";
import { TreatmentTimeline } from "@/components/patient/TreatmentTimeline";
import { InsuranceWidget } from "@/components/patient/InsuranceWidget";
import { ActivityFeed } from "@/components/patient/ActivityFeed";
import { ReferralWidget } from "@/components/patient/ReferralWidget";
import { PriceEstimator } from "@/components/patient/PriceEstimator";
import { MyCasesWidget } from "@/components/patient/MyCasesWidget";
import { MobileNavDrawer } from "@/components/shared/MobileNavDrawer";
import { Sparkles, PlusCircle, FileText, Stethoscope, Upload, TrendingUp, DollarSign } from "lucide-react";
import { ImageViewer } from "@/components/dentist/ImageViewer";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MOCK_PATIENTS } from "@/lib/store";
import { FileUploadDialog } from "@/components/shared/FileUploadDialog";

export default function PatientDashboard() {
    // Simulate logged in user
    const me = MOCK_PATIENTS['p1'];

    return (
        <>
            {/* Mobile Navigation */}
            <MobileNavDrawer />

            <div className="grid lg:grid-cols-12 gap-6 pb-20">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Hero Banner */}
                    <div className="relative mb-2 rounded-3xl bg-gradient-to-r from-brand-secondary via-blue-500 to-brand-primary p-6 md:p-8 text-white shadow-2xl shadow-blue-500/20 overflow-hidden animate-gradient">
                        {/* Floating Icon */}
                        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none animate-float">
                            <Stethoscope className="w-48 h-48 md:w-64 md:h-64" />
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute -top-8 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                        <div className="relative z-10 max-w-2xl">
                            <h1 className="text-2xl md:text-4xl font-extrabold mb-2 tracking-tight">Your Mouth Map</h1>
                            <p className="text-blue-100 text-sm md:text-lg mb-4 md:mb-6 leading-relaxed">
                                An interactive view of your dental health. Click on any tooth to see detailed diagnostics and active treatment plans.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <FileUploadDialog
                                    trigger={
                                        <Button size="lg" className="bg-white text-brand-primary hover:bg-white/90 font-bold shadow-lg shadow-blue-900/20 border-0 group">
                                            <Upload className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" /> Upload Records
                                        </Button>
                                    }
                                />

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                                            <FileText className="mr-2 h-4 w-4" /> View My Images
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl bg-black border-slate-800 p-0 overflow-hidden">
                                        <DialogHeader className="p-6 bg-slate-900 border-b border-slate-800">
                                            <DialogTitle className="text-white flex items-center gap-2">
                                                <FileText className="h-5 w-5 text-brand-secondary" /> My Diagnostic Records
                                            </DialogTitle>
                                            <DialogDescription className="text-slate-400">
                                                Full resolution X-rays and intraoral photos.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="p-0 bg-black min-h-[500px] flex items-center justify-center">
                                            <ImageViewer
                                                src="https://images.unsplash.com/photo-1516069677934-cc33fa3e1f59?q=80&w=2600&auto=format&fit=crop"
                                                alt="My Dental X-Ray"
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>

                    {/* Mouth Map Card */}
                    <Card className="min-h-[500px] md:min-h-[600px] flex flex-col border-0 shadow-2xl shadow-slate-200/50 bg-white/80 backdrop-blur overflow-hidden rounded-3xl ring-1 ring-slate-100 card-hover" style={{ animationDelay: '100ms' }}>
                        <div className="h-2 bg-gradient-to-r from-brand-primary via-blue-400 to-brand-secondary animate-gradient" />
                        <CardContent className="w-full p-4 md:p-8 flex-1 bg-[url('/grid-pattern.svg')] bg-opacity-5">
                            <MouthMap teeth={me.teeth} />
                        </CardContent>
                    </Card>

                    {/* My Cases Widget */}
                    <div style={{ animationDelay: '200ms' }} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <MyCasesWidget />
                    </div>

                    {/* Treatment Timeline */}
                    <div style={{ animationDelay: '300ms' }} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <TreatmentTimeline />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                        <Card className="p-4 text-center card-hover group cursor-pointer" style={{ animationDelay: '100ms' }}>
                            <div className="mb-1 flex justify-center">
                                <div className="p-2 rounded-xl bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                                    <TrendingUp className="h-5 w-5 text-brand-primary" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-brand-primary">3</p>
                            <p className="text-xs text-slate-500">Active Cases</p>
                        </Card>
                        <Card className="p-4 text-center card-hover group cursor-pointer" style={{ animationDelay: '150ms' }}>
                            <div className="mb-1 flex justify-center">
                                <div className="p-2 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                                    <DollarSign className="h-5 w-5 text-emerald-500" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-emerald-500">$850</p>
                            <p className="text-xs text-slate-500">Saved So Far</p>
                        </Card>
                    </div>

                    {/* Incoming Bids Header */}
                    <div className="flex items-center gap-2" style={{ animationDelay: '200ms' }}>
                        <div className="p-1.5 bg-amber-100 rounded-lg animate-pulse-glow" style={{ '--tw-shadow-color': 'rgba(251, 191, 36, 0.4)' } as React.CSSProperties}>
                            <Sparkles className="h-4 w-4 text-amber-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Incoming Bids</h2>
                        <span className="ml-auto text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">3 new</span>
                    </div>

                    {/* Quote Feed */}
                    <div style={{ animationDelay: '250ms' }} className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <QuoteFeed />
                    </div>

                    {/* Price Estimator */}
                    <div style={{ animationDelay: '300ms' }} className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <PriceEstimator />
                    </div>

                    {/* Insurance Widget */}
                    <div style={{ animationDelay: '350ms' }} className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <InsuranceWidget />
                    </div>

                    {/* Activity Feed */}
                    <div style={{ animationDelay: '400ms' }} className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <ActivityFeed />
                    </div>

                    {/* Referral Widget */}
                    <div style={{ animationDelay: '450ms' }} className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <ReferralWidget />
                    </div>
                </div>
            </div>
        </>
    );
}

