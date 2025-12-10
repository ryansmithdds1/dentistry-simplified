'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    Link,
    Mail,
    Gift,
    Copy,
    CheckCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';

export function ReferralWidget() {
    return (
        <Card className="p-6 bg-gradient-to-br from-brand-primary to-brand-secondary text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                        <Gift className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Refer a Friend</h3>
                        <p className="text-sm text-white/70">Earn $25 credit</p>
                    </div>
                </div>

                <p className="text-sm text-white/80 mb-4">
                    Share your referral link and both you and your friend get $25 off your next treatment!
                </p>

                <ShareDialog
                    trigger={
                        <Button className="w-full bg-white text-brand-primary hover:bg-white/90 gap-2">
                            <Share2 className="h-4 w-4" /> Share Your Link
                        </Button>
                    }
                />
            </div>
        </Card>
    );
}

function ShareDialog({ trigger }: { trigger: React.ReactNode }) {
    const { addToast } = useToast();
    const [copied, setCopied] = React.useState(false);
    const referralLink = 'https://dentistry.app/refer/JOHN25';

    const copyLink = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        addToast('success', 'Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOptions = [
        { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, color: 'bg-[#1877F2] hover:bg-[#1864D9]' },
        { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, color: 'bg-[#1DA1F2] hover:bg-[#1A8CD8]' },
        { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, color: 'bg-[#0A66C2] hover:bg-[#0958A8]' },
        { name: 'Email', icon: <Mail className="h-5 w-5" />, color: 'bg-slate-600 hover:bg-slate-700' },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Gift className="h-5 w-5 text-brand-primary" />
                        Share & Earn $25
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Referral Link */}
                    <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Your Referral Link</label>
                        <div className="flex gap-2">
                            <div className="flex-1 px-3 py-2 bg-slate-100 rounded-lg text-sm text-slate-600 truncate">
                                {referralLink}
                            </div>
                            <Button onClick={copyLink} variant="outline" className="gap-2 shrink-0">
                                {copied ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'Copied!' : 'Copy'}
                            </Button>
                        </div>
                    </div>

                    {/* Social Share */}
                    <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Share via</label>
                        <div className="grid grid-cols-4 gap-2">
                            {shareOptions.map(option => (
                                <button
                                    key={option.name}
                                    className={cn(
                                        "flex flex-col items-center gap-2 p-3 rounded-xl text-white transition-colors",
                                        option.color
                                    )}
                                >
                                    {option.icon}
                                    <span className="text-[10px] font-medium">{option.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                        <p className="text-sm text-emerald-700">
                            <strong>3 friends</strong> have used your link. You've earned <strong>$75</strong> in credits!
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
