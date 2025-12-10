import { DentistStats } from "@/components/dentist/DentistStats";

export default function DentistBidsPage() {
    return (
        <div className="space-y-6 pb-20">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
                <p className="text-slate-500 mt-1">Track your performance and manage your practice</p>
            </div>
            <DentistStats />
        </div>
    );
}
