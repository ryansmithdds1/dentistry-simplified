'use client';

import { ChatInterface } from "@/components/shared/ChatInterface";
import { ChatThread } from "@/lib/chat-types";

// Mock Data for Dentist View
const MOCK_DENTIST_THREADS: ChatThread[] = [
    {
        id: "t1",
        participant: { id: "p1", name: "John Doe", role: "patient", avatar: "" },
        lastMessage: { id: "m3", senderId: "me", receiverId: "p1", content: "I have an opening this Thursday at 2 PM.", timestamp: new Date().toISOString(), read: true },
        unreadCount: 0
    },
    {
        id: "t5",
        participant: { id: "p5", name: "Alice Wonderland", role: "patient", avatar: "" },
        lastMessage: { id: "m9", senderId: "p5", receiverId: "me", content: "Do you accept Delta Dental?", timestamp: new Date(Date.now() - 7200000).toISOString(), read: false },
        unreadCount: 3
    }
];

export default function DentistMessagesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Patient Messages</h1>
            <ChatInterface initialThreads={MOCK_DENTIST_THREADS} currentUserRole="dentist" />
        </div>
    );
}
