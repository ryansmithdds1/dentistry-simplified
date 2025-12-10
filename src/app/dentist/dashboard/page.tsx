'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight, Activity, Filter, Clock, AlertCircle, FileText, Search } from "lucide-react";
import { getCases, getCaseById } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function DentistDashboard() {
    const cases = getCases();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLocation, setFilterLocation] = useState<'all' | 'near'>('all');

    const filteredCases = cases.filter(c => {
        // 1. Filter by Procedure (Search Title)
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());

        // 2. Filter by Location (Mock "Near Me" = San Francisco)
        const matchesLocation = filterLocation === 'all' || c.location.includes("San Francisco");

        return matchesSearch && matchesLocation;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-blue-50 text-brand-secondary text-xs font-bold uppercase tracking-wider mb-2">
                        <Activity className="h-3 w-3" /> Live Case Feed
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Available Cases</h1>
                    <p className="text-lg text-slate-500 max-w-2xl">
                        Patients in your area are looking for care right now.
                    </p>
                </div>
                {/* Filter Toolbar */}
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Filter by procedure..."
                            className="pl-9 w-full sm:w-[200px] bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button
                        variant={filterLocation === 'near' ? "default" : "outline"}
                        onClick={() => setFilterLocation(filterLocation === 'near' ? 'all' : 'near')}
                        className={cn(
                            "gap-2 transition-all",
                            filterLocation === 'near' ? "bg-brand-primary text-white shadow-brand-primary/25 shadow-lg" : "bg-white text-slate-700 hover:bg-slate-50"
                        )}
                    >
                        <MapPin className="h-4 w-4" /> Near Me
                    </Button>
                    <Button className="bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-200 hidden sm:flex">
                        View Map
                    </Button>
                </div>
            </div>

            {filteredCases.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <div className="bg-white p-4 rounded-full shadow-sm inline-flex mb-4">
                        <Filter className="h-8 w-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No cases found</h3>
                    <p className="text-slate-500">Try adjusting your filters or search terms.</p>
                    <Button
                        variant="link"
                        onClick={() => { setSearchTerm(""); setFilterLocation("all"); }}
                        className="mt-2 text-brand-primary"
                    >
                        Clear all filters
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCases.map((patientCase) => {
                        const fullData = getCaseById(patientCase.id); // Get patient details

                        return (
                            <Card key={patientCase.id} className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-sm ring-1 ring-slate-100 bg-white overflow-hidden rounded-2xl">
                                <div className="h-1.5 w-full bg-gradient-to-r from-brand-secondary to-teal-400 opacity-70 group-hover:opacity-100 transition-opacity" />
                                <CardHeader className="pb-3 pt-5 px-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm border-2 border-white shadow-sm">
                                                {fullData?.patient.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg font-bold text-slate-900 leading-tight">{fullData?.patient.name}</CardTitle>
                                                <p className="text-xs text-slate-400 font-medium">#{patientCase.id}</p>
                                            </div>
                                        </div>
                                        {patientCase.urgency === "High" && (
                                            <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full border border-rose-100">
                                                <AlertCircle className="h-3 w-3" /> High
                                            </span>
                                        )}
                                    </div>
                                    <CardDescription className="flex items-center justify-between text-slate-500 text-sm bg-slate-50/50 p-2 rounded-lg border border-slate-100/50 mt-2">
                                        <div className="flex items-center gap-1.5 truncate max-w-[140px]">
                                            <MapPin className="h-3.5 w-3.5 text-brand-secondary shrink-0" /> <span className="truncate">{patientCase.location}</span>
                                        </div>
                                        <Link href={`/dentist/case/${patientCase.id}`} className="text-xs font-semibold text-brand-primary hover:underline flex items-center gap-1 shrink-0">
                                            <FileText className="h-3 w-3" /> View Images
                                        </Link>
                                    </CardDescription>
                                </CardHeader>

                                <div className="px-6 py-2">
                                    <p className="text-sm font-medium text-slate-700 line-clamp-2 min-h-[40px]">
                                        {patientCase.title}
                                    </p>
                                    {/* We could show tags derived from mainComplaint or manual tags if added to store */}
                                </div>

                                <CardContent className="py-4 px-6 text-xs text-muted-foreground flex items-center gap-2">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>Posted {patientCase.postedDate}</span>
                                </CardContent>

                                <CardFooter className="pt-0 px-6 pb-6 mt-auto">
                                    <Link href={`/dentist/case/${patientCase.id}`} className="w-full">
                                        <Button className="w-full bg-slate-50 text-slate-900 border border-slate-200 hover:bg-brand-secondary hover:text-white hover:border-brand-secondary hover:shadow-lg hover:shadow-brand-secondary/20 transition-all duration-300 group-hover:bg-brand-secondary group-hover:text-white group-hover:border-brand-secondary">
                                            Review Case <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
