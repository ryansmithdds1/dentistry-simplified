'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import {
    Shield,
    CheckCircle,
    AlertCircle,
    Loader2,
    Building2,
    User,
    Hash
} from 'lucide-react';

interface InsuranceInfo {
    provider: string;
    memberId: string;
    groupNumber: string;
    verified: boolean;
    coverage: {
        preventive: number;
        basic: number;
        major: number;
        annual: number;
        remaining: number;
    };
}

export function InsuranceWidget() {
    const { addToast } = useToast();
    const [insurance, setInsurance] = React.useState<InsuranceInfo | null>({
        provider: 'Delta Dental',
        memberId: 'DD123456789',
        groupNumber: 'GRP-001234',
        verified: true,
        coverage: {
            preventive: 100,
            basic: 80,
            major: 50,
            annual: 2000,
            remaining: 1450
        }
    });

    const remainingPercent = insurance ? (insurance.coverage.remaining / insurance.coverage.annual) * 100 : 0;

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-brand-primary" />
                    Insurance
                </h3>
                {insurance?.verified && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3" /> Verified
                    </span>
                )}
            </div>

            {insurance ? (
                <div className="space-y-4">
                    {/* Provider Info */}
                    <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                                <Building2 className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">{insurance.provider}</p>
                                <p className="text-xs text-slate-500">Member ID: {insurance.memberId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Coverage Bars */}
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-600">Annual Benefits Remaining</span>
                                <span className="font-semibold text-slate-900">${insurance.coverage.remaining} / ${insurance.coverage.annual}</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all",
                                        remainingPercent > 50 ? "bg-emerald-500" :
                                            remainingPercent > 25 ? "bg-amber-500" : "bg-red-500"
                                    )}
                                    style={{ width: `${remainingPercent}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Coverage Details */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-3 bg-emerald-50 rounded-xl">
                            <p className="text-lg font-bold text-emerald-700">{insurance.coverage.preventive}%</p>
                            <p className="text-[10px] text-emerald-600 font-medium">Preventive</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl">
                            <p className="text-lg font-bold text-blue-700">{insurance.coverage.basic}%</p>
                            <p className="text-[10px] text-blue-600 font-medium">Basic</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl">
                            <p className="text-lg font-bold text-purple-700">{insurance.coverage.major}%</p>
                            <p className="text-[10px] text-purple-600 font-medium">Major</p>
                        </div>
                    </div>

                    <AddInsuranceDialog
                        trigger={
                            <Button variant="outline" size="sm" className="w-full">
                                Update Insurance
                            </Button>
                        }
                    />
                </div>
            ) : (
                <div className="text-center py-6">
                    <Shield className="h-12 w-12 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-500 mb-4">No insurance on file</p>
                    <AddInsuranceDialog
                        trigger={
                            <Button className="gap-2 bg-brand-primary hover:bg-brand-primary/90">
                                <Shield className="h-4 w-4" /> Add Insurance
                            </Button>
                        }
                    />
                </div>
            )}
        </Card>
    );
}

function AddInsuranceDialog({ trigger }: { trigger: React.ReactNode }) {
    const { addToast } = useToast();
    const [isVerifying, setIsVerifying] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleVerify = async () => {
        setIsVerifying(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsVerifying(false);
        setOpen(false);
        addToast('success', 'Insurance verified successfully!');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-brand-primary" />
                        Add Insurance
                    </DialogTitle>
                    <DialogDescription>
                        Enter your insurance details for automatic coverage verification
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Insurance Provider</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="e.g., Delta Dental, Cigna" className="pl-9" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Member ID</label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="Your member ID number" className="pl-9" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Group Number</label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="Group or policy number" className="pl-9" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 gap-2 bg-brand-primary hover:bg-brand-primary/90"
                        onClick={handleVerify}
                        disabled={isVerifying}
                    >
                        {isVerifying ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="h-4 w-4" />
                                Verify & Save
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
