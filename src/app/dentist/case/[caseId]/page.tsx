'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MouthMap } from "@/components/patient/MouthMap";
import { BidBuilder } from "@/components/dentist/BidBuilder";
import { ImageViewer } from "@/components/dentist/ImageViewer";
import { RequestInfoDialog } from "@/components/shared/RequestInfoDialog";
import { ArrowLeft, FileText, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getCaseById } from "@/lib/store";

export default function CaseDetailPage({ params }: { params: { caseId: string } }) {
    const [selectedTooth, setSelectedTooth] = useState<number | null>(null);

    const fullCase = getCaseById(params.caseId);

    if (!fullCase) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h2 className="text-xl font-bold">Case Not Found</h2>
                <Link href="/dentist/dashboard"><Button>Return to Dashboard</Button></Link>
            </div>
        );
    }

    const { patient } = fullCase;

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200/60">
                <div className="flex items-center gap-4">
                    <Link href="/dentist/dashboard">
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 -ml-2">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    </Link>
                    <div className="h-8 w-px bg-slate-200" />
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Case <span className="text-brand-secondary">#{fullCase.id}</span></h1>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">{fullCase.title}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right mr-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Patient Status</p>
                        <p className="text-sm font-semibold text-emerald-600">Active &amp; Ready</p>
                    </div>
                    <RequestInfoDialog
                        trigger={<Button variant="outline">Request Info</Button>}
                        patientName={patient.name}
                        caseId={fullCase.id}
                    />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 h-[calc(100vh-200px)]">
                {/* LEFT COLUMN: Diagnostics (Scrollable) */}
                <div className="lg:col-span-8 space-y-8 overflow-y-auto pr-2 pb-20 custom-scrollbar">
                    {/* Patient Info Card - Compact & Clean */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-start">
                        <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                            <User className="h-6 w-6 text-slate-400" />
                        </div>
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Patient Name</p>
                                <p className="font-semibold text-slate-900">{patient.name}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Demographics</p>
                                <p className="font-medium text-slate-700">{patient.age} / {patient.gender}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Main Complaint</p>
                                <p className="font-medium text-rose-600 bg-rose-50 inline-block px-2 py-0.5 rounded border border-rose-100">{patient.mainComplaint}</p>
                            </div>
                        </div>
                    </div>

                    {/* Diagnostic Images - Hero Feature */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-brand-secondary" /> Diagnostic Imaging
                            </h3>
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{patient.lastVisit}</span>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border-4 border-white bg-slate-900 ring-1 ring-slate-900/5">
                            {fullCase.images.length > 0 ? (
                                <ImageViewer
                                    src={fullCase.images[0]}
                                    alt="Dental X-Ray Mock"
                                />
                            ) : (
                                <div className="h-64 flex items-center justify-center text-slate-500">
                                    No images available for this case.
                                </div>
                            )}
                        </div>
                        {fullCase.images.length > 0 && <p className="text-xs text-center text-slate-400 italic">High-Resolution DICOM View • Scroll to Zoom</p>}
                    </div>

                    {/* Mouth Map */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-slate-800 px-1">Digital Odontogram</h3>
                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                            <CardContent className="p-8">
                                <MouthMap
                                    onToothSelect={setSelectedTooth}
                                    teeth={patient.teeth}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* RIGHT COLUMN: Bid Builder (Sticky) */}
                <div className="lg:col-span-4 h-full">
                    <div className="sticky top-6 flex flex-col gap-6">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <User className="h-32 w-32" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 relative z-10">Patient Notes</h4>
                            <p className="text-sm text-slate-300 leading-relaxed relative z-10 italic">
                                "I am very anxious about needles. Please recommend sedation if possible."
                            </p>
                        </div>

                        <BidBuilder toothId={selectedTooth} caseId={params.caseId} />
                    </div>
                </div>
            </div>
        </div>
    );
}
