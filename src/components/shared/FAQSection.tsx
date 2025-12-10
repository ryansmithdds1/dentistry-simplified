'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
    {
        question: 'How does Dentistry Simplified work?',
        answer: 'We separate the diagnosis from the treatment. You upload your dental records (X-rays, exam notes), and qualified dentists in your area submit competitive bids to provide treatment. You compare options and choose the best fit for your needs and budget.'
    },
    {
        question: 'Is my dental information secure?',
        answer: 'Absolutely. We use bank-level encryption to protect your data. Your records are only shared with dentists you choose to receive bids from, and you control who can access your information at all times.'
    },
    {
        question: 'How much can I save?',
        answer: 'Patients typically save 20-40% compared to their original quote by comparing bids. The exact savings depend on the procedure and your location, but transparency always works in your favor.'
    },
    {
        question: 'What if I need a diagnosis first?',
        answer: 'No problem! You can visit any dentist for a diagnostic exam only, then upload those records to get treatment bids. Some of our partner locations offer low-cost diagnostic exams specifically for this purpose.'
    },
    {
        question: 'Are the dentists verified?',
        answer: 'Yes, all dentists on our platform are licensed, insured, and have passed our verification process. We check credentials, malpractice history, and patient reviews before allowing them to submit bids.'
    },
    {
        question: 'What procedures are covered?',
        answer: 'Most non-emergency procedures including crowns, root canals, implants, orthodontics, cosmetic work, and more. Emergency procedures requiring immediate care are not suitable for our platform.'
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    return (
        <section className="py-16 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600">
                        Everything you need to know about Dentistry Simplified
                    </p>
                </div>

                <div className="space-y-3">
                    {FAQ_ITEMS.map((item, index) => (
                        <Card
                            key={index}
                            className={cn(
                                "overflow-hidden transition-all",
                                openIndex === index && "ring-2 ring-brand-primary/20"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-semibold text-slate-900 pr-4">{item.question}</span>
                                <ChevronDown className={cn(
                                    "h-5 w-5 text-slate-400 shrink-0 transition-transform",
                                    openIndex === index && "rotate-180 text-brand-primary"
                                )} />
                            </button>
                            <div className={cn(
                                "overflow-hidden transition-all duration-300",
                                openIndex === index ? "max-h-96" : "max-h-0"
                            )}>
                                <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                                    {item.answer}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
