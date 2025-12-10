import { SettingsPanel } from "@/components/shared/SettingsPanel";

export default function PatientSettingsPage() {
    return (
        <div className="space-y-6 pb-20">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your account preferences</p>
            </div>
            <SettingsPanel />
        </div>
    );
}
