import { AppointmentsList } from "@/components/patient/AppointmentsList";

export default function PatientAppointmentsPage() {
    return (
        <div className="space-y-6 pb-20">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My Appointments</h1>
                <p className="text-slate-500 mt-1">View and manage your upcoming and past appointments</p>
            </div>
            <AppointmentsList />
        </div>
    );
}
