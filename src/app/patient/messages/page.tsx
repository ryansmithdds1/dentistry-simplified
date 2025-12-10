'use client';

import { ChatInterface } from "@/components/shared/ChatInterface";
import { ChatThread } from "@/lib/chat-types";

// Mock Data for Patient View
const MOCK_PATIENT_THREADS: ChatThread[] = [
    {
        id: "t1",
        participant: { id: "d1", name: "Dr. Sarah Smith", role: "dentist", avatar: "" },
        lastMessage: { id: "m3", senderId: "d1", receiverId: "me", content: "I have an opening this Thursday at 2 PM.", timestamp: new Date().toISOString(), read: false },
        unreadCount: 1
    },
    {
        id: "t2",
        participant: { id: "d2", name: "Dr. Michael Chen", role: "dentist", avatar: "" },
        lastMessage: { id: "m4", senderId: "d2", receiverId: "me", content: "Is the pain still present?", timestamp: new Date(Date.now() - 3600000).toISOString(), read: false },
        unreadCount: 1
    }
];

export default function PatientMessagesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Messages</h1>
            <ChatInterface initialThreads={MOCK_PATIENT_THREADS} currentUserRole="patient" />
        </div>
    );
}
