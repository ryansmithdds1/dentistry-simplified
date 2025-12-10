'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface RequestInfoDialogProps {
    trigger: React.ReactNode;
    patientName: string;
    caseId: string;
}

export function RequestInfoDialog({ trigger, patientName, caseId }: RequestInfoDialogProps) {
    const { addToast } = useToast();
    const [message, setMessage] = React.useState('');
    const [isSending, setIsSending] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleSend = async () => {
        if (!message.trim()) return;

        setIsSending(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSending(false);
        setMessage('');
        setOpen(false);
        addToast('success', `Message sent to ${patientName}!`);
    };

    const quickMessages = [
        "Can you provide more details about when the pain started?",
        "Are you currently taking any medications?",
        "Have you had any previous dental work on this tooth?",
        "Would you prefer sedation options for this procedure?"
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Request Additional Information</DialogTitle>
                    <DialogDescription>
                        Send a message to {patientName} for Case #{caseId}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Quick Responses */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quick Messages</p>
                        <div className="flex flex-wrap gap-2">
                            {quickMessages.map((msg, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMessage(msg)}
                                    className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors text-left"
                                >
                                    {msg}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Message</p>
                        <Textarea
                            value={message}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                            placeholder="Type your question or request here..."
                            className="min-h-[120px] resize-none"
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 gap-2 bg-brand-secondary hover:bg-brand-secondary/90"
                        onClick={handleSend}
                        disabled={!message.trim() || isSending}
                    >
                        {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        Send Message
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
