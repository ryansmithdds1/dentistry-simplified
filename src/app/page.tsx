'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Activity, Stethoscope, ArrowRight, ShieldCheck, Sparkles, Heart, Zap } from "lucide-react";
import { LoginDialog } from "@/components/shared/LoginDialog";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse delay-700" />
      <div className="absolute top-1/3 right-1/4 w-[20%] h-[20%] bg-amber-50 rounded-full blur-3xl opacity-30 -z-10" />

      {/* Hero Section */}
      <header className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto z-10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-800">
          <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 animate-float" style={{ animationDuration: '4s' }}>
            <Stethoscope className="h-6 w-6 text-brand-primary" />
          </div>
          <span>Dentistry <span className="text-brand-primary">Simplified</span></span>
        </div>
        <div className="text-sm font-medium text-slate-600 flex items-center gap-2">
          Already have an account?
          <LoginDialog
            trigger={
              <button className="text-brand-primary hover:text-brand-secondary transition-colors font-semibold hover:underline underline-offset-2">
                Log in
              </button>
            }
          />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
        <div className="max-w-4xl space-y-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-slate-200 shadow-sm text-xs font-semibold text-slate-600 mb-4">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>The Modern Way to Find Dental Care</span>
            <Zap className="h-3 w-3 text-brand-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Diagnosis <span className="text-slate-400 font-light">&</span> Treatment. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-blue-400 to-brand-secondary animate-gradient">Decoupled & Fair.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We separate the diagnosis from the treatment, empowering you to shop for care with your own records. Transparent prices, competitive bids, zero anxiety.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full px-4">
          {/* Patient Card */}
          <Link href="/patient/dashboard" className="group animate-in fade-in slide-in-from-left-8 duration-700" style={{ animationDelay: '200ms' }}>
            <div className="h-full relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 backdrop-blur-lg p-8 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-brand-primary/40 transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="px-2 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-full">POPULAR</div>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">I&apos;m a Patient</h2>
                <p className="text-slate-600 mb-6 text-center leading-relaxed">
                  Upload your records, see your options, and find the best care at the best price.
                </p>
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Transparent Pricing
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold flex items-center gap-1">
                    <Heart className="h-3 w-3" /> Second Opinions
                  </span>
                </div>
                <Button className="gap-2 bg-slate-900 hover:bg-brand-primary shadow-lg shadow-slate-200 hover:shadow-brand-primary/25 transition-all group/btn" size="lg">
                  Find Care <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          </Link>

          {/* Dentist Card */}
          <Link href="/dentist/dashboard" className="group animate-in fade-in slide-in-from-right-8 duration-700" style={{ animationDelay: '300ms' }}>
            <div className="h-full relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 backdrop-blur-lg p-8 hover:shadow-2xl hover:shadow-teal-500/10 hover:border-brand-secondary/40 transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-6 shadow-lg shadow-teal-200 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <Activity className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">I&apos;m a Dentist</h2>
                <p className="text-slate-600 mb-6 text-center leading-relaxed">
                  Access pre-diagnosed cases, submit competitive bids, and grow your practice.
                </p>
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                  <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Qualified Leads
                  </span>
                  <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold flex items-center gap-1">
                    <Zap className="h-3 w-3" /> No Diagnosis Burden
                  </span>
                </div>
                <Button variant="outline" className="gap-2 border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-400 group/btn" size="lg">
                  Partner With Us <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </main>

      <footer className="p-6 text-center text-sm text-slate-500 z-10 animate-in fade-in duration-1000" style={{ animationDelay: '500ms' }}>
        © 2025 Dentistry Simplified. All rights reserved.
        <div className="mt-2 flex items-center justify-center gap-4">
          <LoginDialog
            trigger={
              <button className="hover:text-brand-primary transition-colors hover:underline underline-offset-2">Sign Up</button>
            }
          />
          <span>•</span>
          <Link href="#" className="hover:text-brand-primary transition-colors hover:underline underline-offset-2">Privacy</Link>
          <span>•</span>
          <Link href="#" className="hover:text-brand-primary transition-colors hover:underline underline-offset-2">Terms</Link>
        </div>
      </footer>
    </div>
  );
}

