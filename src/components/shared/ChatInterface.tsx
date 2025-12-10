'use client';

import * as React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, MoreVertical, Phone, Video, ArrowLeft, Menu } from "lucide-react";
import { ChatThread, Message, User } from "@/lib/chat-types";

const CURRENT_USER_ID = "me";

// Mobile-responsive chat sidebar
function ChatSidebar({
    threads,
    activeThreadId,
    onSelectThread,
    isOpen,
    onClose
}: {
    threads: ChatThread[],
    activeThreadId: string | null,
    onSelectThread: (id: string) => void,
    isOpen: boolean,
    onClose: () => void
}) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
            <div className={cn(
                "fixed lg:relative inset-y-0 left-0 z-50 w-80 border-r border-slate-100 bg-white flex flex-col h-full rounded-l-2xl transition-transform duration-300 lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-4 border-b border-slate-50 flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input placeholder="Search messages..." className="pl-9 bg-slate-50 border-0 focus-visible:ring-1 focus-visible:ring-brand-primary/20 transition-all rounded-xl" />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col p-2 gap-1">
                        {threads.map((thread) => (
                            <button
                                key={thread.id}
                                onClick={() => { onSelectThread(thread.id); onClose(); }}
                                className={cn(
                                    "flex items-start gap-3 p-3 text-left transition-all rounded-xl relative group hover:bg-slate-50",
                                    activeThreadId === thread.id ? "bg-brand-primary/5 shadow-sm" : "text-slate-600"
                                )}
                            >
                                <div className="relative">
                                    <Avatar className="border-2 border-white shadow-sm">
                                        <AvatarImage src={thread.participant.avatar} />
                                        <AvatarFallback className={cn("text-slate-500 bg-slate-100", activeThreadId === thread.id && "bg-brand-primary/10 text-brand-primary font-bold")}>{thread.participant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    {thread.unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-brand-warm rounded-full border-2 border-white" />
                                    )}
                                </div>
                                <div className="flex-1 overflow-hidden min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <span className={cn("font-semibold text-sm truncate", activeThreadId === thread.id ? "text-slate-900" : "text-slate-700")}>
                                            {thread.participant.name}
                                        </span>
                                        <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                                            {new Date(thread.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className={cn("text-xs truncate leading-snug", thread.unreadCount > 0 ? "font-medium text-slate-900" : "text-slate-500")}>
                                        {thread.lastMessage.senderId === CURRENT_USER_ID && "You: "}
                                        {thread.lastMessage.content}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </>
    );
}

function ChatWindow({
    thread,
    messages,
    onSendMessage,
    onOpenSidebar
}: {
    thread: ChatThread | undefined,
    messages: Message[],
    onSendMessage: (text: string) => void,
    onOpenSidebar: () => void
}) {
    const [inputText, setInputText] = React.useState("");
    const endRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        onSendMessage(inputText);
        setInputText("");
    };

    if (!thread) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/30 rounded-r-2xl">
                <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">Select a conversation to start messaging</p>
                <Button className="mt-4 lg:hidden" variant="outline" onClick={onOpenSidebar}>
                    <Menu className="h-4 w-4 mr-2" /> View Conversations
                </Button>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-white rounded-r-2xl relative overflow-hidden">
            {/* Header */}
            <div className="h-16 border-b border-slate-100 px-4 lg:px-6 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="lg:hidden -ml-2" onClick={onOpenSidebar}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-9 w-9 ring-2 ring-slate-50">
                        <AvatarImage src={thread.participant.avatar} />
                        <AvatarFallback>{thread.participant.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-sm text-slate-900 leading-none">{thread.participant.name}</h3>
                        <p className="text-[10px] text-slate-500 font-medium mt-1 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.4)]" /> Active Now
                        </p>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-full"><Phone className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-full"><Video className="h-4 w-4" /></Button>
                </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 lg:p-6 bg-slate-50/50">
                <div className="space-y-4 max-w-3xl mx-auto pb-4">
                    {messages.map((msg) => {
                        const isMe = msg.senderId === CURRENT_USER_ID;
                        return (
                            <div key={msg.id} className={cn("flex w-full group", isMe ? "justify-end" : "justify-start")}>
                                <div className={cn(
                                    "max-w-[85%] lg:max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-sm transition-all relative",
                                    isMe
                                        ? "bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-tr-sm"
                                        : "bg-white border border-slate-100 text-slate-700 rounded-tl-sm hover:shadow-md"
                                )}>
                                    {msg.content}
                                    <span className={cn("text-[9px] block text-right mt-1 opacity-70", isMe ? "text-blue-50" : "text-slate-400")}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={endRef} />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-3 lg:p-4 bg-white border-t border-slate-100">
                <form onSubmit={handleSend} className="max-w-3xl mx-auto flex items-center gap-2 lg:gap-3">
                    <Button type="button" size="icon" variant="ghost" className="text-slate-400 hover:text-brand-primary rounded-full shrink-0">
                        <MoreVertical className="h-5 w-5 rotate-90" />
                    </Button>
                    <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-50 border-0 focus-visible:ring-1 focus-visible:ring-brand-primary/30 h-11 px-4 rounded-xl shadow-inner transition-all"
                    />
                    <Button type="submit" size="icon" className="h-11 w-11 rounded-xl bg-slate-900 hover:bg-brand-primary text-white shadow-md hover:shadow-lg hover:shadow-brand-primary/30 transition-all shrink-0">
                        <Send className="h-5 w-5 ml-0.5" />
                    </Button>
                </form>
            </div>
        </div>
    );
}

export function ChatInterface({
    initialThreads,
    currentUserRole
}: {
    initialThreads: ChatThread[],
    currentUserRole: 'patient' | 'dentist'
}) {
    const [activeThreadId, setActiveThreadId] = React.useState<string | null>(initialThreads[0]?.id || null);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [messages, setMessages] = React.useState<Record<string, Message[]>>({
        't1': [
            { id: 'm1', senderId: 'other', receiverId: 'me', content: 'Hi there! I reviewed your case regarding Tooth #14.', timestamp: new Date(Date.now() - 86400000).toISOString(), read: true },
            { id: 'm2', senderId: 'me', receiverId: 'other', content: 'Thanks Dr. Smith. When can I come in?', timestamp: new Date(Date.now() - 80000000).toISOString(), read: true },
            { id: 'm3', senderId: 'other', receiverId: 'me', content: 'I have an opening this Thursday at 2 PM.', timestamp: new Date().toISOString(), read: false },
        ],
        't2': [
            { id: 'm4', senderId: 'other', receiverId: 'me', content: 'Is the pain still present?', timestamp: new Date().toISOString(), read: false },
        ]
    });

    const handleSendMessage = (text: string) => {
        if (!activeThreadId) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: CURRENT_USER_ID,
            receiverId: 'other',
            content: text,
            timestamp: new Date().toISOString(),
            read: true
        };

        setMessages(prev => ({
            ...prev,
            [activeThreadId]: [...(prev[activeThreadId] || []), newMessage]
        }));
    };

    const activeThread = initialThreads.find(t => t.id === activeThreadId);
    const activeMessages = activeThreadId ? messages[activeThreadId] || [] : [];

    return (
        <div className="flex h-[calc(100vh-140px)] border rounded-xl overflow-hidden shadow-sm bg-white">
            <ChatSidebar
                threads={initialThreads}
                activeThreadId={activeThreadId}
                onSelectThread={setActiveThreadId}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <ChatWindow
                thread={activeThread}
                messages={activeMessages}
                onSendMessage={handleSendMessage}
                onOpenSidebar={() => setSidebarOpen(true)}
            />
        </div>
    );
}
